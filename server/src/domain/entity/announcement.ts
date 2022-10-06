import Entity from "../../core/domain/entity";
import { convertMinutesAmountToHourString } from "../../utils/convert-minutes-to-hour-string";

export type AnnouncementProps = {
  gameId: string;
  name: string;
  yearPlaying: number;
  discord: string;
  weekDays: {
    days: number[];
  };
  hourStart: number;
  hourEnd: number;
  useVoiceChannel: boolean;
  createdAt?: Date;
};

export default class Announcement extends Entity<AnnouncementProps> {
  get name() {
    return this.props.name;
  }

  get yearPlaying() {
    return this.props.yearPlaying;
  }

  get discord() {
    return this.props.discord;
  }

  get weekDays() {
    return this.props.weekDays;
  }

  get hourStart() {
    return this.props.hourStart;
  }

  private set hourStart(value: number) {
    this.props.hourStart = value * 60;
  }

  get hourEnd() {
    return this.props.hourEnd;
  }

  private set hourEnd(value: number) {
    this.props.hourEnd = value * 60;
  }

  get useVoiceChannel() {
    return this.props.useVoiceChannel;
  }

  private set useVoiceChannel(value: boolean) {
    this.props.useVoiceChannel = value;
  }

  get gameId() {
    return this.props.gameId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  getJSON() {
    return {
      ...this.props,
      hourStart: convertMinutesAmountToHourString(this.hourStart),
      hourEnd: convertMinutesAmountToHourString(this.hourEnd),
    };
  }

  private constructor(props: AnnouncementProps, id?: string) {
    super(
      {
        ...props,
        useVoiceChannel: props.useVoiceChannel ?? false,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
  }

  static create(props: AnnouncementProps, id?: string) {
    return new Announcement(props, id);
  }

  activeVoiceChannel(): void {
    this.useVoiceChannel = true;
  }
}
