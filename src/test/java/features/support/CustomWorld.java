package features.support;

import org.openqa.selenium.WebDriver;

public class CustomWorld {
    private WebDriver driver;

    public WebDriver getDriver() {
        return driver;
    }

    public void setDriver(WebDriver driver) {
        this.driver = driver;
    }
}
