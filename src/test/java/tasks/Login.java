package tasks;

import java.util.function.Consumer;
import org.openqa.selenium.WebDriver;
import pages.LoginPage;

public class Login {
    static Consumer<WebDriver> login() {
        return driver -> {
            LoginPage loginPage = new LoginPage(driver);

            loginPage.login(
                System.getenv("SF_USERNAME"),
                System.getenv("SF_PASSWORD")
            );
        };
    }
}
