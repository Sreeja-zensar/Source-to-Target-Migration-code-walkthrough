package fixtures;

import org.openqa.selenium.WebDriver;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import framework.TestConfig;
import io.qameta.allure.Allure;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Duration;
import java.util.Map;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import utils.AuthUtils;

public abstract class SalesforceFixture {
  /** The browser of the running test (one per thread, so parallel tests stay apart). */
  private static final ThreadLocal<WebDriver> AUTHENTICATED_PAGE = new ThreadLocal<>();

  /** The authenticatedPage fixture: a browser already logged in to Salesforce. */
  protected WebDriver authenticatedPage() {
    return AUTHENTICATED_PAGE.get();
  }

  /** data/leadData.json (import leadData from '../data/leadData.json'): each entry's fields by name. */
  protected static final Map<String, Map<String, Object>> leadData = loadTestData("data/leadData.json");

  @BeforeMethod(alwaysRun = true)
  public void openAuthenticatedPage() {
    ChromeOptions options = new ChromeOptions();
    if (TestConfig.HEADLESS) {
      options.addArguments("--headless=new");
    }
    WebDriver browser = new ChromeDriver(options);
    AUTHENTICATED_PAGE.set(AuthUtils.getAuthenticatedContext(browser));
  }

  @AfterMethod(alwaysRun = true)
  public void closeAuthenticatedPage() {
    WebDriver page = AUTHENTICATED_PAGE.get();
    if (page != null) {
      page.quit();
    }
    AUTHENTICATED_PAGE.remove();
  }

  /** page.waitForLoadState('domcontentloaded'): waits until the document has loaded. */
  protected void waitForDocumentReady(WebDriver page) {
    new WebDriverWait(page, Duration.ofSeconds(60)).until(d -> "complete".equals(((JavascriptExecutor) d).executeScript("return document.readyState")));
  }

  /** page.waitForTimeout(ms): a fixed pause (kept as the source has it). */
  protected void waitFor(long millis) {
    try {
      Thread.sleep(millis);
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
    }
  }

  /** test.info().attach(name, { body: await page.screenshot(), contentType: 'image/png' }). */
  protected void attachScreenshot(String name, WebDriver page) {
    byte[] png = ((TakesScreenshot) page).getScreenshotAs(OutputType.BYTES);
    Allure.addAttachment(name, "image/png", new ByteArrayInputStream(png), "png");
  }

  /** A JSON test data file: from the classpath (src/test/resources), else from the project folder. */
  private static Map<String, Map<String, Object>> loadTestData(String path) {
    TypeReference<Map<String, Map<String, Object>>> type = new TypeReference<>() {
    };
    ObjectMapper json = new ObjectMapper();
    try (InputStream resource = SalesforceFixture.class.getClassLoader().getResourceAsStream(path)) {
      if (resource != null) {
        return json.readValue(resource, type);
      }
      return json.readValue(Files.readString(Path.of(path)), type);
    } catch (IOException e) {
      throw new UncheckedIOException("Test data " + path + " was not found on the classpath or in the project folder", e);
    }
  }
}
