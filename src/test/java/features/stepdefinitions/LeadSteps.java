package features.stepdefinitions;

import features.support.CustomWorld;
import features.support.World;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class LeadSteps {
    @SuppressWarnings("unused")
    private final CustomWorld world;

    public LeadSteps(CustomWorld world) {
        this.world = world;
    }

    @Given("I am logged into Salesforce as a sales agent")
    public void iAmLoggedIntoSalesforceAsASalesAgent() {
        System.out.println("Already authenticated using storageState");
    }

    @Given("I navigate to the Leads module")
    public void iNavigateToTheLeadsModule() {
        System.out.println("Navigate to Leads");
    }

    @When("I click on New Lead")
    public void iClickOnNewLead() {
        System.out.println("Click New Lead");
    }

    @When("I create a lead using test data")
    public void iCreateALeadUsingTestData() {
        System.out.println("Create Lead using JSON data");
    }

    @When("I save the lead")
    public void iSaveTheLead() {
        System.out.println("Save Lead");
    }

    @Then("the lead should be created successfully")
    public void theLeadShouldBeCreatedSuccessfully() {
        System.out.println("Lead Created Successfully");
    }

    @Then("I should see the lead first name")
    public void iShouldSeeTheLeadFirstName() {
        System.out.println("Verify First Name");
    }

    @Then("I should see the insurance type")
    public void iShouldSeeTheInsuranceType() {
        System.out.println("Verify Insurance Type");
    }
}
