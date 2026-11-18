/**
 * BaseTest (from src/test/java/com/demo/base/BaseTest.java) is not needed in this project: the test runner
 * launches, configures and closes the browser itself (playwright.config.ts: browser,
 * headless mode, baseURL, timeouts), and every test receives a ready `page` fixture.
 * Move any browser options the original set (window size, arguments) into
 * playwright.config.ts under `use`.
 */
export {};
