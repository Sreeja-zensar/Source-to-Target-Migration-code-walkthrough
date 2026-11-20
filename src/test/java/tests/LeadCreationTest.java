package tests;

import actors.Actor;
import fixtures.SalesforceFixture;
import java.io.File;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.Duration;
import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;
import pages.LeadPage;
import tasks.CreateEmptyLead;
import tasks.CreateLead;

public class LeadCreationTest extends SalesforceFixture {
    private static final String HOME_URL = "https://zensartechnologiesltd3.lightning.force.com/lightning/page/home";

    @Test(description = "S1 - Create Term Life Insurance Lead", timeOut = 120000)
    public void s1CreateTermLifeInsuranceLead() {
        WebDriver page = authenticatedPage();
        Actor actor = new Actor(page);
        LeadPage leadPage = new LeadPage(page);

        page.get(HOME_URL);
        waitForDocumentReady(page);

        // Debug screenshot of the home page (Selenium captures the visible window, not the full page).
        saveScreenshot(page, "home-page-debug.png");

        actor.attemptsTo(CreateLead.perform(leadData.get("termLifeLead")));

        waitFor(5000);

        attachScreenshot("Lead Created Screenshot", page);
    }

    // S2 Starts Here
    @Test(description = "S2 - Create Whole Life Insurance Lead with Monthly Premium", timeOut = 120000)
    public void s2CreateWholeLifeInsuranceLeadWithMonthlyPremium() {
        WebDriver page = authenticatedPage();
        LeadPage leadPage = new LeadPage(page);

        page.get(HOME_URL);
        waitForDocumentReady(page);

        Actor actor = new Actor(page);

        actor.attemptsTo(CreateLead.perform(leadData.get("wholeLifeLead")));

        waitFor(5000);

        // Evidence Screenshot
        attachScreenshot("S2 Whole Life Lead Screenshot", page);
    }

    // S3 Starts Here
    @Test(description = "S3 - Mandatory Field Validation", timeOut = 120000)
    public void s3MandatoryFieldValidation() {
        WebDriver page = authenticatedPage();
        LeadPage leadPage = new LeadPage(page);
        Actor actor = new Actor(page);

        page.get(HOME_URL);
        waitForDocumentReady(page);

        actor.attemptsTo(CreateEmptyLead.perform());

        waitFor(3000);

        By nameLink = By.xpath("//a[normalize-space()='Name']");
        Assert.assertTrue(new WebDriverWait(page, Duration.ofSeconds(30)).until(ExpectedConditions.visibilityOfElementLocated(nameLink)).isDisplayed(), "The mandatory field message is not shown");

        System.out.println("Mandatory field validation displayed successfully");

        attachScreenshot("S3 Validation Screenshot", page);
    }

    private static void saveScreenshot(WebDriver page, String path) {
        File shot = ((TakesScreenshot) page).getScreenshotAs(OutputType.FILE);
        try {
            Files.copy(shot.toPath(), Path.of(path), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }
}
