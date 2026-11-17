# Selenium Legacy Demo Suite (SauceDemo)

A sample **Selenium + Java + TestNG** test suite, written in a typical "legacy" style.
It is the **input (Layer 1)** for the Selenium → Playwright migration platform demo.

Application under test: https://www.saucedemo.com (public demo shop)

## Tech stack

| Item | Version |
|---|---|
| Java | 11 or newer |
| Selenium | 4.27.0 (Selenium Manager downloads the browser driver automatically) |
| TestNG | 7.10.2 |
| H2 (in-memory DB for test data) | 2.3.232 |
| Build tool | Maven |

## Project structure

```
selenium-legacy-demo/
├── pom.xml                          Maven dependencies
├── testng.xml                       Which test classes to run
└── src/test/
    ├── java/com/demo/
    │   ├── base/BaseTest.java       Opens/closes the browser, sets up the DB
    │   ├── pages/                   Page Object Model
    │   │   ├── BasePage.java        Common click/type/getText helpers
    │   │   ├── LoginPage.java
    │   │   ├── InventoryPage.java   ⚠ bloated "god class" (on purpose)
    │   │   ├── CartPage.java
    │   │   └── CheckoutPage.java    ⚠ one class for 3 screens (on purpose)
    │   ├── tests/
    │   │   ├── LoginTest.java       valid, locked, invalid, empty, logout
    │   │   ├── ProductTest.java     list vs DB, sorting, cart badge, details
    │   │   └── CheckoutTest.java    end-to-end order + DB write/verify
    │   └── utils/
    │       ├── ConfigReader.java    reads config.properties
    │       ├── DBUtil.java          JDBC test-data layer (H2)
    │       └── WaitUtils.java       explicit waits + Thread.sleep
    └── resources/
        ├── config.properties        URL, browser, DB settings, FAKE secrets
        └── db/
            ├── schema.sql           test_users, products, orders tables
            └── data.sql             seed test data
```

## How to run

```bash
mvn clean test
```

- Change the browser in `config.properties` (`chrome`, `edge`, `firefox`).
- Set `headless=true` to run without opening a browser window.

## Test cases (14 runs in total)

| Class | Test | What it checks |
|---|---|---|
| LoginTest | validLoginTest | Valid user reaches Products page |
| LoginTest | invalidLoginTest (x2, data from DB) | Locked & invalid users see the right error |
| LoginTest | emptyUsernameTest | "Username is required" message |
| LoginTest | logoutTest | Logout returns to login page |
| ProductTest | productListMatchesDatabaseTest | UI products = DB products |
| ProductTest | sortByNameDescendingTest | Z → A sorting |
| ProductTest | sortByPriceLowToHighTest | Low → high price sorting |
| ProductTest | addAndRemoveFromCartTest | Cart badge count |
| ProductTest | productDetailsPriceTest | Details price = DB price |
| CheckoutTest | completeCheckoutTest | End-to-end order, saved and verified in DB |
| CheckoutTest | checkoutMissingFirstNameTest | "First Name is required" message |

## Legacy patterns included on purpose (for the migration demo)

| Pattern | Where | Migration layer that handles it |
|---|---|---|
| Bloated "god class" page object | `InventoryPage`, `CheckoutPage` | Layer 8 – Pattern Refactor Engine (→ Screenplay) |
| Explicit `WebDriverWait` + implicit wait | `WaitUtils`, `BaseTest` | Layer 8 – Hybrid Transformer (Playwright auto-waits) |
| Hard-coded `Thread.sleep` | `WaitUtils.hardWait` | Layer 8 – removed |
| Text-based XPath locators | `InventoryPage` | Layer 8 – user-facing locators (`getByRole`, `getByText`) |
| JavaScript click workaround | `InventoryPage.logout` | Layer 7/8 – replaced with a normal click |
| JDBC test-data layer + SQL seed files | `DBUtil`, `db/*.sql` | Layer 8 – DB Migration Handler |
| Similar form patterns (login form / checkout form) | `LoginPage`, `CheckoutPage` | Layer 2 – Dedup & Pattern Clustering |
| FAKE API key, DB password, email in config | `config.properties` | Layer 5 – Secrets & PII Redaction |

> All secrets in this project are **fake demo values**. The SauceDemo users
> (`standard_user` / `secret_sauce`) are the public demo accounts shown on the site's login page.
