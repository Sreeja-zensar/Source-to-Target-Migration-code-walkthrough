/**
 * Screenplay interactions: one low-level action on the system (click, fill…).
 * Written by the migration agent.
 */
import { locate, type Target } from './abilities';
import type { Actor, Performable } from './actors';

/** One low-level action on the system (click, fill, select…). */
export type Interaction = Performable;

/** An interaction from a description and what it does. */
export function interaction(description: string, perform: (actor: Actor) => Promise<void>): Interaction {
  return { performAs: perform, toString: () => description };
}

/** Interactions every page uses. */
export const Click = {
  on: (target: Target): Interaction => interaction('click', async (actor) => locate(actor, target).click()),
};

export const Enter = {
  theValue: (value: string) => ({
    into: (target: Target): Interaction => interaction('enter a value', async (actor) => locate(actor, target).fill(value)),
  }),
};
