import { randomUUID as uuid } from "node:crypto";

export default abstract class Entity<T> {
  readonly #id: string;
  #props: T;

  get id() {
    return this.#id;
  }

  get props() {
    return this.#props;
  }

  constructor(props: Required<T>, id?: string) {
    this.#id = id ?? uuid();
    this.#props = props;
  }
}
