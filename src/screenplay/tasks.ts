/**
 * Screenplay tasks: business-level steps an actor performs, each made of
 * interactions and other tasks. Written by the migration agent.
 */
import type { Actor, Performable } from './actors';

/** A business-level step, composed of interactions and other tasks. */
export type Task = Performable;

/** A task from a description and what it does. */
export function task(description: string, perform: (actor: Actor) => Promise<void>): Task {
  return { performAs: perform, toString: () => description };
}
