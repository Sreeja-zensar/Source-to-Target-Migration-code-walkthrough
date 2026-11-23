package tests;

import actors.Actor;
import fixtures.SalesforceFixture;
import pages.LeadPage;
import pages.OpportunityPage;
import tasks.ConvertLead;
import tasks.CreateLead;
import tasks.UpdateLeadStatus;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.Test;

public class LeadWorkflowTest extends SalesforceFixture {
    @Test(description = "S4 - Update Lead Status New to Qualified", timeOut = 120000)
    public void s4UpdateLeadStatusNewToQualified() {
        WebDriver page = authenticatedPage();
        LeadPage leadPage = new LeadPage(page);
        Actor actor = new Actor(page);

        Object workflowLead = leadData.get("statusWorkflowLead");

        // Reuse S2 lead creation flow here
        page.get("https://zensartechnologiesltd3.lightning.force.com/lightning/page/home");

        waitForDocumentReady(page);

        actor.attemptsTo(CreateLead.perform(workflowLead));

        System.out.println("Lead created successfully");

        actor.attemptsTo(UpdateLeadStatus.perform("Working"));

        actor.attemptsTo(UpdateLeadStatus.perform("Qualified"));

        System.out.println("Status updated to Qualified");

        attachScreenshot("S4 Lead Status Updated", page);
    }

    @Test(description = "S5 - Create Life Insurance Opportunity from Qualified Lead", timeOut = 120000)
    public void s5CreateLifeInsuranceOpportunityFromQualifiedLead() {
        WebDriver page = authenticatedPage();
        LeadPage leadPage = new LeadPage(page);
        OpportunityPage opportunityPage = new OpportunityPage(page);
        Actor actor = new Actor(page);

        Object qualifiedLead = leadData.get("qualifiedLead");
        Object opportunityData = leadData.get("opportunityData");

        page.get("https://zensartechnologiesltd3.lightning.force.com/lightning/page/home");

        waitForDocumentReady(page);

        actor.attemptsTo(CreateLead.perform(qualifiedLead));

        System.out.println("Qualified Lead created successfully");

        actor.attemptsTo(ConvertLead.perform(
            ((java.util.Map<String, Object>) opportunityData).get("opportunityName")
        ));

        System.out.println("Lead converted successfully");

        opportunityPage.navigateToConvertedOpportunity();

        java.util.Map<String, Object> opportunityMap = (java.util.Map<String, Object>) opportunityData;
        opportunityPage.updateOpportunity(
            opportunityMap.get("closeDate"),
            opportunityMap.get("stage"),
            opportunityMap.get("amount")
        );

        waitFor(5000);

        attachScreenshot("S5 Opportunity Created", page);

        System.out.println("Opportunity updated successfully");
    }
}
