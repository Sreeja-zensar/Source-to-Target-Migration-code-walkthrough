package tasks;

import java.util.function.Consumer;
import org.openqa.selenium.WebDriver;
import pages.LeadPage;

public class ConvertLead {
    public static Consumer<WebDriver> perform(String opportunityName) {
        return driver -> {
            LeadPage leadPage = new LeadPage(driver);

            leadPage.convertLead();

            leadPage.createOpportunity(
                opportunityName
            );
        };
    }
}
