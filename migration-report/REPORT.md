# Migration report

- Job: `d5e0671b-df9c-46fc-ad5c-285395584fd8`
- Migration: `playwright->selenium-java`
- Transformer version: `0.1.0+76e527ad0e68+pom`
- Generated: 2026-11-23T09:51:37.787Z

## Summary

| Units | Migrated | Needs review | Failed | Skipped | Hand-off | From cache | Files (complete) | Assets copied |
|---|---|---|---|---|---|---|---|---|
| 24 | 24 | 0 | 0 | 0 | 0 | 24 | 21 (21) | 2 |

Validation: 0 feedback round(s), 0 unit(s) retried, 0 fixed by a retry, 0 written to the cache.

Design pattern: Page Object Model (`page-object-model`). 0 unit(s) it applies to: 0 follow it, 0 did not (not delivered as migrated).

Learned from people's corrections: 0 correction(s) usable, 0 of them applied by rule; 0 unit(s) guided by them, 0 fixed by them.

## Cost

- This run: 0 model call(s), 0 input / 0 output tokens, $0.0000
- Job budget: $0.0000 of $25 spent, 0 of 2000000 tokens
- Cache (tenant): 105 hit(s), about 25136 tokens saved, 0 validated result(s) written
- How units were produced: manual 8, llm 16
- Review queue: 0 unit(s) waiting, 0 approved

| Layer | Model calls | Cost (USD) | Note |
|---|---|---|---|
| 1 · Client input | 0 | 0.0000 | no model calls |
| 2 · Ingestion & static analysis | 0 | 0.0000 | no model calls (parsers) |
| 3 · Cache-first lookup | 0 | 0.0000 | 24 unit(s) answered from the cache, no model call |
| 4 · Retrieval & context | 0 | 0.0000 | no model calls (retrieval and budgeting) |
| 5 · Guardrails before the model | 0 | 0.0000 | no model calls |
| 6 · LLM orchestration | 0 | 0.0000 | first answers |
| 7 · Guardrails after the model | 0 | 0.0000 | no model calls |
| 8 · Transformation engine | 0 | 0.0000 | 0 unit(s) produced by rules, no model call |
| 9 · Validation & feedback | 0 | 0.0000 | feedback retries |
| 10 · Output | 0 | 0.0000 | no model calls |

## Grounding

- Platform multi-dimensional RAG: 0 of 0 model-generated unit(s) grounded in it; 0 cached unit(s) were.

## Project and type check

- Project files added (selenium-java): pom.xml.
- npm packages added for the migrated code: none.
- Type check: not run (no_scaffold).
- No type check: the target has no project scaffold.

## Units

| Source | Unit | Outcome | Target | Attempts | Grounding (RAG / all) | Notes |
|---|---|---|---|---|---|---|
| auth-login.ts | auth-login.ts | migrated (cache) | src/test/java/framework/AuthLogin.java | 0 | 0 / 0 |  |
| cucumber.js | cucumber.js | migrated (cache) | src/test/java/framework/CucumberRunnerTest.java | 0 | 0 / 2 |  |
| features/step-definitions/lead.steps.ts | lead.steps.ts | migrated (cache) | src/test/java/features/stepdefinitions/LeadSteps.java | 0 | 0 / 2 |  |
| features/support/world.ts | CustomWorld | migrated (cache) | src/test/java/features/support/CustomWorld.java | 0 | 0 / 2 |  |
| features/support/world.ts | world.ts | migrated (cache) | src/test/java/features/support/World.java | 0 | 0 / 2 |  |
| playwright.config.ts | playwright.config.ts | migrated (cache) | src/test/java/framework/TestConfig.java | 0 | 0 / 2 |  |
| src/actors/Actor.ts | Actor | migrated (cache) | src/test/java/actors/Actor.java | 0 | 0 / 2 |  |
| src/fixtures/salesforce.fixture.ts | SalesforceFixtures | migrated (cache) | src/test/java/fixtures/SalesforceFixture.java | 0 | 0 / 0 |  |
| src/fixtures/salesforce.fixture.ts | salesforce.fixture.ts | migrated (cache) | src/test/java/fixtures/SalesforceFixture.java | 0 | 0 / 0 |  |
| src/pages/LeadPage.ts | LeadPage | migrated (cache) | src/test/java/pages/LeadPage.java | 0 | 0 / 0 |  |
| src/pages/LoginPage.ts | LoginPage | migrated (cache) | src/test/java/pages/LoginPage.java | 0 | 0 / 2 |  |
| src/pages/OpportunityPage.ts | OpportunityPage | migrated (cache) | src/test/java/pages/OpportunityPage.java | 0 | 0 / 2 |  |
| src/tasks/ConvertLead.ts | ConvertLead | migrated (cache) | src/test/java/tasks/ConvertLead.java | 0 | 0 / 2 |  |
| src/tasks/CreateEmptyLead.ts | CreateEmptyLead | migrated (cache) | src/test/java/tasks/CreateEmptyLead.java | 0 | 0 / 2 |  |
| src/tasks/CreateLead.ts | CreateLead | migrated (cache) | src/test/java/tasks/CreateLead.java | 0 | 0 / 2 |  |
| src/tasks/CreateOpportunity.ts | CreateOpportunity | migrated (cache) | src/test/java/tasks/CreateOpportunity.java | 0 | 0 / 2 |  |
| src/tasks/Login.ts | Login | migrated (cache) | src/test/java/tasks/Login.java | 0 | 0 / 2 |  |
| src/tasks/UpdateLeadStatus.ts | UpdateLeadStatus | migrated (cache) | src/test/java/tasks/UpdateLeadStatus.java | 0 | 0 / 2 |  |
| src/utils/auth-utils.ts | getAuthenticatedContext | migrated (cache) | src/test/java/utils/AuthUtils.java | 0 | 0 / 0 |  |
| src/utils/auth-utils.ts | performLogin | migrated (cache) | src/test/java/utils/AuthUtils.java | 0 | 0 / 0 |  |
| src/utils/auth-utils.ts | auth-utils.ts | migrated (cache) | src/test/java/utils/AuthUtils.java | 0 | 0 / 0 |  |
| tests/lead.creation.spec.ts | lead.creation.spec.ts | migrated (cache) | src/test/java/tests/LeadCreationTest.java | 0 | 0 / 0 |  |
| tests/lead.workflow.spec.ts | lead.workflow.spec.ts | migrated (cache) | src/test/java/tests/LeadWorkflowTest.java | 0 | 0 / 2 |  |
| tests/opportunity.creation.spec.ts | opportunity.creation.spec.ts | migrated (cache) | src/test/java/tests/OpportunityCreationTest.java | 0 | 0 / 2 |  |

## Assets

Copied: 2.

| Asset | Action | Not copied because |
|---|---|---|
| data/leadData.json | migrate | migration_not_automated |
| package-lock.json | migrate | migration_not_automated |
| package.json | copy | replaced_by_scaffold |
| tsconfig.json | copy | replaced_by_scaffold |

## Warnings

- PARSE_ERROR: Syntax error near line(s) 1; file not chunked (features/createLead.feature)
