package framework;

/**
 * Centralized test configuration values migrated from Playwright's defineConfig.
 *
 * <p>These values are intended to be read by the Selenium/TestNG base test,
 * testng.xml, and Maven/Surefire configuration as appropriate.
 */
public final class TestConfig {
    public static final long TIMEOUT_MS = 120_000L;

    public static final int WORKERS = 2;

    public static final boolean HEADLESS = Boolean.parseBoolean(System.getProperty("headless", "true"));

    private TestConfig() {
        // Utility class
    }
}
