import Entity from "../../core/domain/entity";

export type GameProps = Required<{
  title: string;
  bannerURL: string;
}>;

export default class Game extends Entity<GameProps> {
  get title() {
    return this.props.title;
  }

  get bannerURL() {
    return this.props.bannerURL;
  }

  getJSON() {
    return this.props;
  }

  private constructor(props: Required<GameProps>, id?: string) {
    super(props, id);
  }

  static create(props: GameProps, id?: string) {
    if (!props.title && !props.title.trim().length) {
      throw new Error("Title cannot be empty");
    }
    if (!props.bannerURL && !props.bannerURL.trim().length) {
      throw new Error("Banner URL cannot be empty");
    }
    return new Game(props, id);
  }
}
