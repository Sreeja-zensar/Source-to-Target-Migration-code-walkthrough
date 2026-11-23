package framework;

import io.cucumber.testng.AbstractTestNGCucumberTests;
import io.cucumber.testng.CucumberOptions;

@CucumberOptions(
    features = "src/test/resources/features",
    glue = {"features.stepdefinitions", "features.support"},
    plugin = {"pretty", "html:target/cucumber-report.html"}
)
public class CucumberRunnerTest extends AbstractTestNGCucumberTests {
}
