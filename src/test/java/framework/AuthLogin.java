package framework;

import io.github.cdimascio.dotenv.Dotenv;
import java.time.Duration;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import utils.AuthUtils;

/**
 * One-off login: opens a visible browser, signs in to Salesforce, waits while the person
 * completes MFA, then saves the session (auth/storageState.json) for the tests to reuse.
 * Run it with: mvn -q exec:java -Dexec.mainClass=framework.AuthLogin -Dexec.classpathScope=test
 */
public final class AuthLogin {
  private static final By USERNAME = By.xpath("//input[@id=//label[normalize-space()='Username']/@for or @aria-label='Username' or @name='username']");

  private static final By PASSWORD = By.xpath("//input[@id=//label[normalize-space()='Password']/@for or @aria-label='Password' or @name='pw' or @name='password']");

  private static final By LOG_IN = By.xpath("//*[(self::button or self::input[@type='submit']) and (normalize-space()='Log In' or @value='Log In')]");

  private AuthLogin() {
  }

  public static void main(String[] args) {
    Dotenv env = Dotenv.configure().ignoreIfMissing().load();

    // headless: false
    WebDriver driver = new ChromeDriver(new ChromeOptions());
    try {
      driver.get("https://login.salesforce.com/");
      WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

      WebElement username = wait.until(ExpectedConditions.visibilityOfElementLocated(USERNAME));
      username.clear();
      username.sendKeys(env.get("SF_USERNAME"));
      wait.until(ExpectedConditions.elementToBeClickable(LOG_IN)).click();

      WebElement password = wait.until(ExpectedConditions.visibilityOfElementLocated(PASSWORD));
      password.clear();
      password.sendKeys(env.get("SF_PASSWORD"));
      wait.until(ExpectedConditions.elementToBeClickable(LOG_IN)).click();

      System.out.println("Complete MFA manually");

      new WebDriverWait(driver, Duration.ofMillis(300000)).until(ExpectedConditions.urlContains("lightning"));

      AuthUtils.saveSession(driver);

      System.out.println("Storage State Saved");
    } finally {
      driver.quit();
    }
  }
}
