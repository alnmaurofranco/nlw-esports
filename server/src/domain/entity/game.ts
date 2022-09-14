import { randomUUID as uuid } from "node:crypto";

export type GameProps = {
  title: string;
  bannerURL: string;
};

export default class Game {
  #id: string;
  #props: GameProps;

  get id() {
    return this.#id;
  }

  get title() {
    return this.#props.title;
  }

  get bannerURL() {
    return this.#props.bannerURL;
  }

  getJSON() {
    return this.#props;
  }

  constructor(props: Required<GameProps>, id?: string) {
    if (!props.title && !props.title.trim().length) {
      throw new Error("Title cannot be empty");
    }
    if (!props.bannerURL && !props.bannerURL.trim().length) {
      throw new Error("Banner URL cannot be empty");
    }
    this.#id = id ?? uuid();
    this.#props = props;
  }
}
