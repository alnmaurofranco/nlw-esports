import Announcement from "../../../domain/entity/announcement";
import AnnouncementRepository from "../../../domain/repository/announcement-repository";
import GameRepository from "../../../domain/repository/game-repository";
import { convertHourStringToMinutes } from "../../../utils/convert-hour-string-to-minutes";
import {
  CreateAnnouncementInput,
  CreateAnnouncementOutput,
} from "./create-announcement-dto";

export default class CreateAnnouncementUseCase {
  readonly #announcementRepository: AnnouncementRepository;
  readonly #gameRepository: GameRepository;

  constructor(
    announcementRepository: AnnouncementRepository,
    gameRepository: GameRepository
  ) {
    this.#announcementRepository = announcementRepository;
    this.#gameRepository = gameRepository;
  }

  async execute(
    input: CreateAnnouncementInput
  ): Promise<CreateAnnouncementOutput> {
    const game = await this.#gameRepository.findGameById(input.gameId);
    if (!game) {
      throw new Error("Game does not exists");
    }
    const announcement = new Announcement({
      gameId: game.id,
      discord: input.discord,
      name: input.name,
      useVoiceChannel: input.useVoiceChannel,
      hourEnd: convertHourStringToMinutes(input.hourEnd),
      hourStart: convertHourStringToMinutes(input.hourStart),
      weekDays: input.weekDays,
      yearPlaying: input.yearPlaying,
    });
    await this.#announcementRepository.create(announcement);
  }
}
