import { randomUUID as uuid } from "node:crypto";
import { convertMinutesAmountToHourString } from "../../utils/convert-minutes-to-hour-string";

export type AnnouncementProps = {
  gameId: string;
  name: string;
  yearPlaying: number;
  discord: string;
  weekDays: unknown;
  hourStart: number;
  hourEnd: number;
  useVoiceChannel: boolean;
  createdAt?: Date;
};

export default class Announcement {
  #id: string;
  #props: AnnouncementProps;

  get id() {
    return this.#id;
  }

  get name() {
    return this.#props.name;
  }

  get yearPlaying() {
    return this.#props.yearPlaying;
  }

  get discord() {
    return this.#props.discord;
  }

  get weekDays() {
    return this.#props.weekDays;
  }

  get hourStart() {
    return this.#props.hourStart;
  }

  private set hourStart(value: number) {
    this.#props.hourStart = value * 60;
  }

  get hourEnd() {
    return this.#props.hourEnd;
  }

  private set hourEnd(value: number) {
    this.#props.hourEnd = value * 60;
  }

  get useVoiceChannel() {
    return this.#props.useVoiceChannel;
  }

  private set useVoiceChannel(value: boolean) {
    this.#props.useVoiceChannel = value;
  }

  get createdAt() {
    return this.#props.createdAt;
  }

  voiceChannelDefault(useVoiceChannel: boolean): boolean {
    return useVoiceChannel ?? false;
  }

  createdAtDefault(): Date {
    return new Date();
  }

  getJSON() {
    return {
      ...this.#props,
      hourStart: convertMinutesAmountToHourString(this.hourStart),
      hourEnd: convertMinutesAmountToHourString(this.hourEnd),
    };
  }

  constructor(props: AnnouncementProps, id?: string) {
    this.#id = id ?? uuid();
    this.#props = {
      ...props,
      useVoiceChannel: this.voiceChannelDefault(props.useVoiceChannel),
      createdAt: props.createdAt ?? this.createdAtDefault(),
    };
  }

  activeVoiceChannel(): void {
    this.useVoiceChannel = true;
  }
}
