package pages;

import java.time.Duration;
import java.util.Map;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

public class LeadPage {
    private final WebDriver page;

    private final WebDriverWait wait;

    private final By appLauncherButton = button("App Launcher", false);

    private final By appSearchInput = field("combobox", "Search apps and items...", true);

    private final By leadsOption = option("Leads", false);

    private final By newButton = button("New", false);

    private final By firstNameInput = field("textbox", "First Name", false);

    private final By lastNameInput = field("textbox", "Last Name", false);

    private final By companyInput = field("textbox", "Company", false);

    private final By emailInput = field("textbox", "Email", false);

    private final By phoneInput = field("textbox", "Phone", false);

    private final By leadSourceCombobox = field("combobox", "Lead Source", false);

    private final By insuranceTypeCombobox = field("combobox", "Insurance Type", false);

    private final By coverageAmountInput = field("spinbutton", "Coverage Amount", false);

    private final By premiumFrequencyCombobox = field("combobox", "Premium Frequency", false);

    private final By leadStatusCombobox = field("combobox", "Lead Status", false);

    private final By editButton = button("Edit", true);

    private final By saveButton = button("Save", true);

    private final By convertButton = button("Convert", true);

    private final By opportunityButton = button("Opportunity", false);

    private final By opportunityNameInput = field("textbox", "Opportunity Name", false);

    private final By convertLeadDialogConvertButton = By.xpath("//*[@aria-label='Convert Lead']//*[(self::button or @role='button') and normalize-space()='Convert']");

    private final By salutationCombobox = field("combobox", "Salutation", false);

    private final By mrOption = By.xpath("(//span[contains(normalize-space(.), 'Mr.')])[1]");

    public LeadPage(WebDriver page) {
        this.page = page;
        this.wait = new WebDriverWait(page, Duration.ofSeconds(30));
    }

    public void navigateToLeads() {
        click(appLauncherButton);
        fill(appSearchInput, "leads");
        click(leadsOption);
    }

    public void clickNewLead() {
        click(newButton);
    }

    public void createLead(Map<String, Object> data) {
        fill(firstNameInput, text(data, "firstName"));
        fill(lastNameInput, text(data, "lastName"));
        fill(companyInput, text(data, "company"));
        fill(emailInput, text(data, "email"));
        fill(phoneInput, text(data, "phone"));

        // Lead Source
        choose(leadSourceCombobox, text(data, "leadSource"), false);

        // Insurance Type
        choose(insuranceTypeCombobox, text(data, "insuranceType"), false);

        // Coverage
        fill(coverageAmountInput, text(data, "coverage"));

        // Premium Frequency
        String premiumFrequency = text(data, "premiumFrequency");
        if (!premiumFrequency.isEmpty()) {
            choose(premiumFrequencyCombobox, premiumFrequency, false);
        }

        // Lead Status
        String leadStatus = text(data, "leadStatus");
        if (!leadStatus.isEmpty() && !"New".equals(leadStatus)) {
            choose(leadStatusCombobox, leadStatus, true);
        }
    }

    public void updateLeadStatus(String status) {
        click(editButton);
        choose(leadStatusCombobox, status, true);
        click(saveButton);
    }

    public void verifyLeadStatus(String status) {
        By pathStep = By.xpath("//*[@aria-label='Path Options']//*[@title=" + xpathLiteral(status) + "]");
        Assert.assertTrue(wait.until(ExpectedConditions.visibilityOfElementLocated(pathStep)).isDisplayed(), "Lead status " + status + " is not shown");
    }

    // s5
    public void convertLead() {
        click(convertButton);
    }

    public void createOpportunity(String opportunityName) {
        click(opportunityButton);
        fill(opportunityNameInput, opportunityName);
        click(convertLeadDialogConvertButton);
    }

    public void saveLead() {
        click(saveButton);
    }

    public void selectSalutation() {
        click(salutationCombobox);
        click(mrOption);
    }

    /** A combobox: open it, then pick the option with that name. */
    private void choose(By combobox, String optionName, boolean exact) {
        click(combobox);
        click(option(optionName, exact));
    }

    private void click(By locator) {
        wait.until(ExpectedConditions.elementToBeClickable(locator)).click();
    }

    private void fill(By locator, String value) {
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
        element.clear();
        element.sendKeys(value);
    }

    private static String text(Map<String, Object> data, String key) {
        Object value = data.get(key);
        return value == null ? "" : String.valueOf(value);
    }

    /** Playwright's getByRole('button', { name }): the name matches part of the text unless exact. */
    private static By button(String name, boolean exact) {
        String match = exact ? "normalize-space()=" + xpathLiteral(name) : "contains(normalize-space(), " + xpathLiteral(name) + ")";
        return By.xpath("//*[(self::button or @role='button') and (" + match + " or @title=" + xpathLiteral(name) + ")]");
    }

    /** getByRole('option', { name }): Lightning option items carry the name as text or title. */
    private static By option(String name, boolean exact) {
        String match = exact ? "normalize-space()=" + xpathLiteral(name) : "contains(normalize-space(), " + xpathLiteral(name) + ")";
        return By.xpath("//*[@role='option' and (" + match + " or .//*[@title=" + xpathLiteral(name) + "])]");
    }

    /** getByRole(role, { name }) for a form field: its aria-label, or the label pointing at it. */
    private static By field(String role, String name, boolean exact) {
        String label = exact ? "normalize-space()=" + xpathLiteral(name) : "contains(normalize-space(), " + xpathLiteral(name) + ")";
        String aria = exact ? "@aria-label=" + xpathLiteral(name) : "contains(@aria-label, " + xpathLiteral(name) + ")";
        String tag = "combobox".equals(role) ? "(self::input or self::button or @role='combobox')" : "(self::input or self::textarea)";
        return By.xpath("//*[" + tag + " and (" + aria + " or @id=//label[" + label + "]/@for)]");
    }

    private static String xpathLiteral(String value) {
        if (!value.contains("'")) {
            return "'" + value + "'";
        }
        return "concat('" + value.replace("'", "', \"'\", '") + "')";
    }
}
