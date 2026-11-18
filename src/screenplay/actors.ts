/**
 * Screenplay actors: who performs tasks and asks questions. Written by the
 * migration agent; every migrated page facade and test gets its actor from the
 * cast (actorCalled), so each actor starts with the abilities it needs.
 */
import type { Page } from '@playwright/test';
import { BrowseTheWeb, type Ability } from './abilities';
import type { Question } from './questions';

/** Anything an actor can perform: a task or an interaction. */
export interface Performable {
  performAs(actor: Actor): Promise<void>;
  toString(): string;
}

type AbilityType<A extends Ability> = abstract new (...args: never[]) => A;

export class Actor {
  private readonly abilities = new Map<AbilityType<Ability>, Ability>();

  private constructor(readonly name: string) {}

  static named(name: string): Actor {
    return new Actor(name);
  }

  whoCan(...abilities: Ability[]): this {
    for (const ability of abilities) this.abilities.set(ability.constructor as AbilityType<Ability>, ability);
    return this;
  }

  abilityTo<A extends Ability>(type: AbilityType<A>): A {
    const ability = this.abilities.get(type);
    if (!ability) throw new Error(`${this.name} cannot ${type.name}: give the actor that ability with whoCan(…)`);
    return ability as A;
  }

  async attemptsTo(...activities: Performable[]): Promise<void> {
    for (const activity of activities) await activity.performAs(this);
  }

  asks<T>(question: Question<T>): Promise<T> {
    return question.answeredBy(this);
  }

  toString(): string {
    return this.name;
  }
}

/** The cast: an actor with the given name who can browse the web with the given page. */
export function actorCalled(name: string, page: Page): Actor {
  return Actor.named(name).whoCan(BrowseTheWeb.using(page));
}
