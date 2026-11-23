package tasks;

import java.util.Map;
import java.util.function.Consumer;
import org.openqa.selenium.WebDriver;
import pages.OpportunityPage;

public class CreateOpportunity {
    public static Consumer<WebDriver> perform(Map<String, Object> opportunityData) {
        return driver -> {
            OpportunityPage opportunityPage = new OpportunityPage(driver);

            opportunityPage.navigateToOpportunities();

            opportunityPage.createOpportunity(
                opportunityData
            );
        };
    }
}
