package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class LoginPage {
    private final WebDriver driver;

    private final By usernameField = By.cssSelector("label:contains('Username')");

    private final By passwordField = By.cssSelector("label:contains('Password')");

    private final By loginButton = By.xpath("//button[normalize-space()='Log In']");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }

    public void login(String username, String password) {
        driver.get(System.getenv("SF_URL"));

        driver.findElement(usernameField).sendKeys(username);

        driver.findElement(passwordField).sendKeys(password);

        driver.findElement(loginButton).click();
    }
}
