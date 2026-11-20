package utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Duration;
import java.util.List;
import java.util.Map;
import org.openqa.selenium.Cookie;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chromium.ChromiumDriver;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import io.github.cdimascio.dotenv.Dotenv;

public final class AuthUtils {
  private static final ObjectMapper JSON = new ObjectMapper();

  /**
   * The logged-in browser: the saved session when it is still valid, else a new login
   * (Playwright's browser.newContext({ storageState }) → one WebDriver with the cookies restored).
   */
  public static WebDriver getAuthenticatedContext(WebDriver driver) {
    Path file = Path.of(STORAGE_FILE);
    boolean fileExists = Files.exists(file); // checks storageState.json already exists.

    // First Run
    if (!fileExists) {
      System.out.println("No storage state found. Login required.");
      return performLogin(driver);
    }

    // Use Existing Session
    restoreSession(driver);
    driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(120));
    driver.get(HOME_URL);

    String currentTitle = driver.getTitle();

    if (!"Login | Salesforce".equals(currentTitle)) {
      System.out.println("Using existing session.");
      return driver;
    }

    // Session Expired
    System.out.println("Session expired. Generating new authentication state.");

    driver.manage().deleteAllCookies();
    try {
      Files.deleteIfExists(file);
    } catch (IOException e) {
      throw new UncheckedIOException(e);
    }

    return performLogin(driver);
  }

  /** Puts the saved cookies back into the browser (all domains at once in Chrome). */
  private static void restoreSession(WebDriver driver) {
    List<Map<String, Object>> cookies;
    try {
      cookies = JSON.readValue(Path.of(STORAGE_FILE).toFile(), new TypeReference<List<Map<String, Object>>>() {
      });
    } catch (IOException e) {
      throw new UncheckedIOException(e);
    }
    if (driver instanceof ChromiumDriver chrome) {
      chrome.executeCdpCommand("Network.setCookies", Map.of("cookies", cookies));
      return;
    }
    // Another browser takes cookies for the page it shows: open the home page's site first.
    driver.get(HOME_URL);
    for (Map<String, Object> c : cookies) {
      Cookie.Builder cookie = new Cookie.Builder(String.valueOf(c.get("name")), String.valueOf(c.get("value")));
      if (c.get("domain") != null) {
        cookie.domain(String.valueOf(c.get("domain")));
      }
      cookie.path(c.get("path") != null ? String.valueOf(c.get("path")) : "/");
      try {
        driver.manage().addCookie(cookie.build());
      } catch (RuntimeException e) {
        // A cookie of another site cannot be set from this page; the rest still restore the session.
      }
    }
  }

  private static final By USERNAME = By.xpath("//input[@id=//label[normalize-space()='Username']/@for or @aria-label='Username' or @name='username']");

  private static final By PASSWORD = By.xpath("//input[@id=//label[normalize-space()='Password']/@for or @aria-label='Password' or @name='pw' or @name='password']");

  private static final By LOG_IN = By.xpath("//*[(self::button or self::input[@type='submit']) and (normalize-space()='Log In' or @value='Log In')]");

  /** The cookie fields Chrome accepts back (Network.setCookies). */
  private static final List<String> COOKIE_FIELDS = List.of("name", "value", "domain", "path", "secure", "httpOnly", "sameSite", "expires");

  /** Logs in (the person completes MFA in the browser), then saves the session for the next runs. */
  private static WebDriver performLogin(WebDriver driver) {
    driver.get(LOGIN_URL);
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

    WebElement username = wait.until(ExpectedConditions.visibilityOfElementLocated(USERNAME));
    username.clear();
    username.sendKeys(ENV.get("SF_USERNAME"));
    wait.until(ExpectedConditions.elementToBeClickable(LOG_IN)).click();

    WebElement password = wait.until(ExpectedConditions.visibilityOfElementLocated(PASSWORD));
    password.clear();
    password.sendKeys(ENV.get("SF_PASSWORD"));
    wait.until(ExpectedConditions.elementToBeClickable(LOG_IN)).click();

    System.out.println("Complete MFA manually");

    new WebDriverWait(driver, Duration.ofMinutes(5)).until(ExpectedConditions.urlMatches("lightning/page/home"));

    saveSession(driver);

    System.out.println("New storageState.json created.");

    return driver;
  }

  /**
   * Saves every cookie of the browser to STORAGE_FILE. In Chrome they come from all of the session's
   * domains (the login page's and Lightning's), as Playwright's storageState keeps them; another
   * browser only gives the current page's cookies.
   */
  public static void saveSession(WebDriver driver) {
    List<Map<String, Object>> cookies = new ArrayList<>();
    if (driver instanceof ChromiumDriver chrome) {
      @SuppressWarnings("unchecked")
      List<Map<String, Object>> all = (List<Map<String, Object>>) chrome.executeCdpCommand("Network.getAllCookies", Map.of()).get("cookies");
      for (Map<String, Object> c : all) {
        Map<String, Object> kept = new LinkedHashMap<>();
        for (String field : COOKIE_FIELDS) {
          if (c.containsKey(field)) {
            kept.put(field, c.get(field));
          }
        }
        if (Boolean.TRUE.equals(c.get("session"))) {
          kept.remove("expires");
        }
        cookies.add(kept);
      }
    } else {
      for (Cookie c : driver.manage().getCookies()) {
        Map<String, Object> kept = new LinkedHashMap<>();
        kept.put("name", c.getName());
        kept.put("value", c.getValue());
        kept.put("domain", c.getDomain());
        kept.put("path", c.getPath());
        cookies.add(kept);
      }
    }
    try {
      Path file = Path.of(STORAGE_FILE);
      if (file.getParent() != null) {
        Files.createDirectories(file.getParent());
      }
      JSON.writerWithDefaultPrettyPrinter().writeValue(file.toFile(), cookies);
    } catch (IOException e) {
      throw new UncheckedIOException(e);
    }
  }

  /** The saved login (every browser cookie, as JSON): Selenium's counterpart of Playwright's storageState file. */
  static final String STORAGE_FILE = "auth/storageState.json";

  static final String HOME_URL = "https://zensartechnologiesltd3.lightning.force.com/lightning/page/home";

  static final String LOGIN_URL = "https://login.salesforce.com";

  /** Values from a local .env file (dotenv.config()); variables set in the environment take precedence. */
  static final Dotenv ENV = Dotenv.configure().ignoreIfMissing().load();

  private AuthUtils() {
  }
}
