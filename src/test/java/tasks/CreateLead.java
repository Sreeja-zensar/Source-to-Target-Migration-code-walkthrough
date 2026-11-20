package tasks;

import java.util.Map;
import java.util.function.Consumer;
import org.openqa.selenium.WebDriver;
import pages.LeadPage;

public class CreateLead {
    public static Consumer<WebDriver> perform(Map<String, Object> leadData) {
        return driver -> {
            LeadPage leadPage = new LeadPage(driver);

            leadPage.navigateToLeads();

            leadPage.clickNewLead();

            leadPage.selectSalutation();

            leadPage.createLead(leadData);

            leadPage.saveLead();
        };
    }
}
