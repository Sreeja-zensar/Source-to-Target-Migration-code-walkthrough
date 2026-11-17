/**
 * Screenplay questions: what an actor can ask about the system's state.
 * Written by the migration agent.
 */
import { locate, type Target } from './abilities';
import type { Actor } from './actors';

/** Something an actor can ask about the system's state. */
export interface Question<T> {
  answeredBy(actor: Actor): Promise<T>;
  toString(): string;
}

/** A question from a description and how it is answered. */
export function question<T>(description: string, answer: (actor: Actor) => Promise<T>): Question<T> {
  return { answeredBy: answer, toString: () => description };
}

/** Questions every page uses. */
export const Text = {
  of: (target: Target): Question<string> => question('the text', async (actor) => (await locate(actor, target).textContent()) ?? ''),
};

export const Visibility = {
  of: (target: Target): Question<boolean> => question('whether it is visible', async (actor) => locate(actor, target).isVisible()),
};
