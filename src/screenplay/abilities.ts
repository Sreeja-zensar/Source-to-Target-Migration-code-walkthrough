/**
 * Screenplay abilities: what an actor can use to work with the system under
 * test. Written by the migration agent.
 */
import type { Locator, Page } from '@playwright/test';
import type { Actor } from './actors';

/** Something an actor can do with the system under test (a browser page, an API client…). */
export type Ability = object;

/** An element on a screen, found from the actor's page. */
export type Target = (page: Page) => Locator;

/** The ability to drive a browser page. */
export class BrowseTheWeb {
  constructor(readonly page: Page) {}

  static using(page: Page): BrowseTheWeb {
    return new BrowseTheWeb(page);
  }

  /** The actor's page. */
  static as(actor: Actor): Page {
    return actor.abilityTo(BrowseTheWeb).page;
  }
}

/** The element a target finds on the actor's page. */
export const locate = (actor: Actor, target: Target): Locator => target(BrowseTheWeb.as(actor));
