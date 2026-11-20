package tests;

import actors.Actor;
import fixtures.SalesforceFixture;
import java.util.function.Consumer;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.Test;
import tasks.CreateOpportunity;

public class OpportunityCreationTest extends SalesforceFixture {
    @Test(description = "S6 - Create High Value ULIP Opportunity", timeOut = 120000)
    public void s6CreateHighValueULIPOpportunity() {
        WebDriver page = authenticatedPage();
        Actor actor = new Actor(page);
        Object opportunity = leadData.get("highValueOpportunity");

        page.get("https://zensartechnologiesltd3.lightning.force.com/lightning/page/home");
        waitForDocumentReady(page);
        actor.attemptsTo(CreateOpportunity.perform(opportunity));
        attachScreenshot("S6 High Value ULIP Opportunity", page);
    }
}
