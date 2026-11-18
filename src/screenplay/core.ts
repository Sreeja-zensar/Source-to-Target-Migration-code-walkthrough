/**
 * Screenplay core for Playwright Test, written once per project by the
 * migration agent (never by the model): every migrated page and test imports
 * its actors, abilities, tasks, interactions and questions from here, so the
 * building blocks exist once and behave the same everywhere.
 *
 *   actors.ts        Actor, and the cast (actorCalled) that gives each actor its abilities
 *   abilities.ts     BrowseTheWeb (the actor's browser page) and Target (an element on a screen)
 *   tasks.ts         task(…): a business-level step made of interactions
 *   interactions.ts  Click, Enter, interaction(…): one low-level action
 *   questions.ts     Text, Visibility, question(…): what an actor can read from the screen
 *
 *   const actor = actorCalled('buyer', page);
 *   await actor.attemptsTo(LoginTasks.logInAs(user, password));
 *   expect(await actor.asks(CartQuestions.total())).toBe('$10');
 */
export * from './actors';
export * from './abilities';
export * from './tasks';
export * from './interactions';
export * from './questions';
