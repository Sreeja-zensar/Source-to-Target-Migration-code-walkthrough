package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;

public class OpportunityPage {
    private final WebDriver driver;

    private final Actions actions;

    private final By appLauncherButton = By.xpath("//*[(@role='button' or self::button) and normalize-space()='App Launcher']");

    private final By appSearchInput = By.xpath("//*[(@role='combobox' or self::input or self::textarea or self::searchbox) and @aria-label='Search apps and items...']");

    private final By opportunitiesOption = By.xpath("//*[(@role='option' or self::button or self::a) and normalize-space()='Opportunities']");

    private final By newButton = By.xpath("//*[(@role='button' or self::button) and normalize-space()='New']");

    private final By opportunityNameInput = By.xpath("//*[(@role='textbox' or self::input or self::textarea) and @aria-label='Opportunity Name']");

    private final By closeDateInput = By.xpath("//*[(@role='textbox' or self::input or self::textarea) and @aria-label='Close Date']");

    private final By accountNameCombobox = By.xpath("//*[(@role='combobox' or self::input or self::textarea) and @aria-label='Account Name']");

    private final By newAccountText = By.xpath("//*[normalize-space()='New Account']");

    private final By accountNameInput = By.xpath("//*[(@role='textbox' or self::input or self::textarea) and @aria-label='Account Name']");

    private final By saveButton = By.xpath("//*[(@role='button' or self::button) and normalize-space()='Save']");

    private final By insuranceTypeCombobox = By.xpath("//*[(@role='combobox' or self::input or self::textarea) and @aria-label='Insurance Type']");

    private final By stageCombobox = By.xpath("//*[(@role='combobox' or self::input or self::textarea) and @aria-label='Stage']");

    private final By probabilityInput = By.xpath("//*[(@role='spinbutton' or self::input or self::textarea) and @aria-label='Probability (%)']");

    private final By amountInput = By.xpath("//*[(@role='spinbutton' or self::input or self::textarea) and @aria-label='Amount']");

    private final By leadSourceCombobox = By.xpath("//*[(@role='combobox' or self::input or self::textarea) and @aria-label='Lead Source']");

    private final By descriptionTextArea = By.xpath("//*[(@role='textbox' or self::input or self::textarea) and @aria-label='Description']");

    private final By showActionsButton = By.xpath("//*[(@role='button' or self::button) and normalize-space()='Show Actions']");

    private final By editMenuItem = By.xpath("//*[(@role='menuitem' or self::button or self::a) and normalize-space()='Edit']");

    private final By selectedRowCheckbox = By.cssSelector(".slds-checkbox_faux");

    private final By conversionMessage = By.xpath("//*[normalize-space()='Your lead has been converted']");

    private final By goToLeadsButton = By.xpath("//*[(@role='button' or self::button or self::a) and normalize-space()='Go to Leads']");

    private final By opportunitiesLink = By.xpath("//*[(@role='link' or self::a) and normalize-space()='Opportunities']");

    public OpportunityPage(WebDriver driver) {
        this.driver = driver;
        this.actions = new Actions(driver);
    }

    public void navigateToOpportunities() {
        driver.findElement(appLauncherButton).click();
        driver.findElement(appSearchInput).sendKeys("opportunities");
        driver.findElement(opportunitiesOption).click();
    }

    public void clickNewOpportunity() {
        driver.findElement(newButton).click();
    }

    public void fillOpportunityName(String opportunityName) {
        driver.findElement(opportunityNameInput).sendKeys(opportunityName);
    }

    public void fillCloseDate(String closeDate) {
        driver.findElement(closeDateInput).click();
        WebElement el = driver.findElement(closeDateInput);
        el.clear();
        el.sendKeys(closeDate);
        actions.sendKeys(org.openqa.selenium.Keys.TAB).perform();
        waitForTimeout(2000);
    }

    public void createAccount(String accountName) {
        driver.findElement(accountNameCombobox).click();
        driver.findElement(newAccountText).click();
        waitForTimeout(1000);
        driver.findElement(accountNameInput).sendKeys(accountName);
        driver.findElement(saveButton).click();
        waitForTimeout(3000);
    }

    public void fillOpportunityDetails(Object data) {
        @SuppressWarnings("unchecked")
        java.util.Map<String, Object> map = (java.util.Map<String, Object>) data;

        driver.findElement(insuranceTypeCombobox).click();
        driver.findElement(By.xpath("//*[normalize-space()='" + map.get("insuranceType") + "']")).click();

        driver.findElement(stageCombobox).click();
        driver.findElement(By.xpath("//*[(@role='option' or self::button or self::a) and normalize-space()='" + map.get("stage") + "']")).click();

        WebElement probabilityField = driver.findElement(probabilityInput);
        probabilityField.clear();
        probabilityField.sendKeys(String.valueOf(map.get("probability")));

        driver.findElement(amountInput).sendKeys(String.valueOf(map.get("amount")));

        driver.findElement(leadSourceCombobox).click();
        driver.findElement(By.xpath("//*[normalize-space()='" + map.get("leadSource") + "']")).click();

        driver.findElement(descriptionTextArea).sendKeys(String.valueOf(map.get("description")));
    }

    public void saveOpportunity() {
        driver.findElement(saveButton).click();
        waitForTimeout(5000);
    }

    public void createOpportunity(Object data) {
        clickNewOpportunity();
        @SuppressWarnings("unchecked")
        java.util.Map<String, Object> map = (java.util.Map<String, Object>) data;
        fillOpportunityName(String.valueOf(map.get("opportunityName")));
        fillCloseDate(String.valueOf(map.get("closeDate")));
        createAccount(String.valueOf(map.get("accountName")));
        fillOpportunityDetails(data);
        saveOpportunity();
    }

    public void updateOpportunity(String closeDate, String stage, String amount) {
        driver.findElement(selectedRowCheckbox).click();
        driver.findElement(showActionsButton).click();
        driver.findElement(editMenuItem).click();

        WebElement el = driver.findElement(closeDateInput);
        el.clear();
        el.sendKeys(closeDate);

        driver.findElement(stageCombobox).click();
        driver.findElement(By.xpath("//*[normalize-space()='" + stage + "']")).click();

        WebElement amountField = driver.findElement(amountInput);
        amountField.clear();
        amountField.sendKeys(amount);

        driver.findElement(saveButton).click();
    }

    public void navigateToConvertedOpportunity() {
        waitForVisible(conversionMessage);
        System.out.println("Conversion popup displayed");
        driver.findElement(goToLeadsButton).click();
        System.out.println("Clicked Go to Leads");
        driver.findElement(opportunitiesLink).click();
    }

    private void waitForTimeout(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    private void waitForVisible(By locator) {
        for (int i = 0; i < 100; i++) {
            try {
                if (driver.findElement(locator).isDisplayed()) {
                    return;
                }
            } catch (RuntimeException ignored) {
            }
            waitForTimeout(100);
        }
        driver.findElement(locator).isDisplayed();
    }
}
