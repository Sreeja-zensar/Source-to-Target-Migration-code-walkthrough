# Migration report

- Job: `05511e09-73bd-4dcf-888f-d070e113550c`
- Migration: `selenium-java+testng->playwright-ts`
- Transformer version: `0.1.0+2ac06bb0a87c+sp4`
- Generated: 2026-11-18T10:10:15.408Z

## Summary

| Units | Migrated | Needs review | Failed | Skipped | Hand-off | From cache | Files (complete) | Assets copied |
|---|---|---|---|---|---|---|---|---|
| 12 | 11 | 0 | 1 | 0 | 0 | 11 | 23 (23) | 1 |

Validation: 1 feedback round(s), 1 unit(s) retried, 0 fixed by a retry, 0 written to the cache.

Design pattern: Screenplay (`screenplay`). 0 unit(s) it applies to: 0 follow it, 0 did not (not delivered as migrated). Added by the agent: src/screenplay/core.ts, src/screenplay/actors.ts, src/screenplay/abilities.ts, src/screenplay/tasks.ts, src/screenplay/interactions.ts, src/screenplay/questions.ts.

## Cost

- This run: 2 model call(s), 9402 input / 2747 output tokens, $0.1157
- Job budget: $0.1157 of $25 spent, 12149 of 2000000 tokens
- Cache (tenant): 15 hit(s), about 7071 tokens saved, 11 validated result(s) written
- How units were produced: rule 1, rule+llm 10, llm 1
- Test data and DB scripts moved into the target layout: 2
- Review queue: 0 unit(s) waiting, 0 approved

| Layer | Model calls | Cost (USD) | Note |
|---|---|---|---|
| 1 · Client input | 0 | 0.0000 | no model calls |
| 2 · Ingestion & static analysis | 0 | 0.0000 | no model calls (parsers) |
| 3 · Cache-first lookup | 0 | 0.0000 | 11 unit(s) answered from the cache, no model call |
| 4 · Retrieval & context | 0 | 0.0000 | no model calls (retrieval and budgeting) |
| 5 · Guardrails before the model | 0 | 0.0000 | no model calls |
| 6 · LLM orchestration | 1 | 0.0584 | first answers |
| 7 · Guardrails after the model | 0 | 0.0000 | no model calls |
| 8 · Transformation engine | 0 | 0.0000 | 1 unit(s) produced by rules, no model call |
| 9 · Validation & feedback | 1 | 0.0573 | feedback retries |
| 10 · Output | 0 | 0.0000 | no model calls |

## Grounding

- Platform multi-dimensional RAG: 0 of 1 model-generated unit(s) grounded in it; 10 cached unit(s) were.
  - configuration: 2 distinct item(s)
  - engineering: 1 distinct item(s)
  - framework: 5 distinct item(s)

## Project and type check

- Project files added (playwright-ts): package.json, playwright.config.ts, tsconfig.json, .env.example.
- npm packages added for the migrated code: pg.
- Type check: 15 error(s) over 30 file(s).
- Imports of files that were not delivered: 2.
  - src/pages/CartPage.ts:2 TS2307 Cannot find this module: no migrated file has that path (its unit may have failed or been skipped).
  - src/pages/cart-page/CartPageQuestions.ts:7 TS2345 Argument of type 'string' is not assignable to parameter of type 'AbilityType<object>'.
  - src/pages/cart-page/CartPageQuestions.ts:7 TS2339 Property 'getPage' does not exist on type 'object'.
  - src/pages/cart-page/CartPageQuestions.ts:8 TS2339 Property 'count' does not exist on type 'Target'.
  - src/pages/cart-page/CartPageQuestions.ts:12 TS2345 Argument of type 'string' is not assignable to parameter of type 'AbilityType<object>'.
  - src/pages/cart-page/CartPageQuestions.ts:12 TS2339 Property 'getPage' does not exist on type 'object'.
  - src/pages/cart-page/CartPageQuestions.ts:13 TS2339 Property 'all' does not exist on type 'Target'.
  - src/pages/cart-page/CartPageTasks.ts:7 TS2345 Argument of type 'string' is not assignable to parameter of type 'AbilityType<object>'.
  - src/pages/cart-page/CartPageTasks.ts:7 TS2339 Property 'getPage' does not exist on type 'object'.
  - src/pages/cart-page/CartPageTasks.ts:11 TS2345 Argument of type 'string' is not assignable to parameter of type 'AbilityType<object>'.
  - src/pages/cart-page/CartPageTasks.ts:11 TS2339 Property 'getPage' does not exist on type 'object'.
  - src/pages/inventory-page/InventoryPageTargets.ts:4 TS2322 Type '{ pageTitle: (page: Page) => any; cartLink: (page: Page) => any; cartBadge: (page: Page) => any; productNames: (page: Page) => any; productPrices: (page: Page) => any; sortDropdown: (page: Page) => any; ... 9 more ...; productNameByText: (productName: string) => (page: Page) => any; }' is not 
  - tests/CheckoutTest.spec.ts:3 TS2307 Cannot find this module: no migrated file has that path (its unit may have failed or been skipped).
  - tests/ProductTest.spec.ts:22 TS2551 Property 'includesAll' does not exist on type 'string[]'. Did you mean 'includes'?
  - tests/ProductTest.spec.ts:22 TS2551 Property 'includesAll' does not exist on type 'string[]'. Did you mean 'includes'?
- Type-checked only: the files parse, their relative imports resolve and their types check. npm packages are not installed for the check, so calls into them are not type-checked, and no test was run.

## Units

| Source | Unit | Outcome | Target | Attempts | Grounding (RAG / all) | Notes |
|---|---|---|---|---|---|---|
| src/test/java/com/demo/base/BaseTest.java | BaseTest | migrated (cache) | src/base/BaseTest.ts | 0 | 0 / 0 |  |
| src/test/java/com/demo/pages/BasePage.java | BasePage | migrated (cache) | src/pages/BasePage.ts | 0 | 3 / 7 |  |
| src/test/java/com/demo/pages/CartPage.java | CartPage | migrated (cache) | src/pages/CartPage.ts | 0 | 2 / 7 |  |
| src/test/java/com/demo/pages/CheckoutPage.java | CheckoutPage | failed |  | 2 | 0 / 2 | unparseable; Your answer did not follow the reply format: put the complete code between <code> and </code>. |
| src/test/java/com/demo/pages/InventoryPage.java | InventoryPage | migrated (cache) | src/pages/InventoryPage.ts | 0 | 2 / 4 |  |
| src/test/java/com/demo/pages/LoginPage.java | LoginPage | migrated (cache) | src/pages/LoginPage.ts | 0 | 2 / 6 |  |
| src/test/java/com/demo/tests/CheckoutTest.java | CheckoutTest | migrated (cache) | tests/CheckoutTest.spec.ts | 0 | 3 / 5 |  |
| src/test/java/com/demo/tests/LoginTest.java | LoginTest | migrated (cache) | tests/LoginTest.spec.ts | 0 | 4 / 6 |  |
| src/test/java/com/demo/tests/ProductTest.java | ProductTest | migrated (cache) | tests/ProductTest.spec.ts | 0 | 3 / 5 |  |
| src/test/java/com/demo/utils/ConfigReader.java | ConfigReader | migrated (cache) | src/utils/ConfigReader.ts | 0 | 1 / 2 |  |
| src/test/java/com/demo/utils/DBUtil.java | DBUtil | migrated (cache) | src/utils/DBUtil.ts | 0 | 1 / 3 |  |
| src/test/java/com/demo/utils/WaitUtils.java | WaitUtils | migrated (cache) | src/utils/WaitUtils.ts | 0 | 3 / 4 |  |

## Assets

Copied: 1.

| Asset | Action | Not copied because |
|---|---|---|
| pom.xml | copy | replaced_by_scaffold |
| src/test/resources/config.properties | migrate | migration_not_automated |
| src/test/resources/db/data.sql | migrate | relocated |
| src/test/resources/db/schema.sql | migrate | relocated |
| testng.xml | migrate | migration_not_automated |

## Warnings

- OUTPUT_COMPILE_ERRORS: The type check found 15 error(s) in the migrated project, 2 of them imports of files that were not delivered: see report.compile.
- SECRET_SUSPECTED: Possible secret (credential-assignment); the value is not stored (src/test/resources/config.properties:11)
- SECRET_SUSPECTED: Possible secret (credential-assignment); the value is not stored (src/test/resources/config.properties:14)
- DATASTORE_INFERRED: A sql data store seems to be used (from profile:jdbc, src/test/resources/db/data.sql, src/test/resources/db/schema.sql); attach a backend connection to migrate its data
