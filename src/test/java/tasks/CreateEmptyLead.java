package tasks;

import java.util.function.Consumer;
import org.openqa.selenium.WebDriver;
import pages.LeadPage;

public class CreateEmptyLead {
    public static Consumer<WebDriver> perform() {
        return page -> {
            LeadPage leadPage = new LeadPage(page);

            leadPage.navigateToLeads();

            leadPage.clickNewLead();

            leadPage.saveLead();
        };
    }
}
