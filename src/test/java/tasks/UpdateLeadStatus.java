package tasks;

import java.util.function.Consumer;
import org.openqa.selenium.WebDriver;
import pages.LeadPage;

public class UpdateLeadStatus {
    public static Consumer<WebDriver> perform(String status) {
        return driver -> {
            LeadPage leadPage = new LeadPage(driver);

            leadPage.updateLeadStatus(status);

            leadPage.verifyLeadStatus(status);
        };
    }
}
