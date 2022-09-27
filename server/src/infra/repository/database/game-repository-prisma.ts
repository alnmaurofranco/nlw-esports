import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../database/prisma";
import Announcement from "../../../domain/entity/announcement";
import Game from "../../../domain/entity/game";
import GameRepository, {
  GameWithRelationAnnoucementResult,
} from "../../../domain/repository/game-repository";
import GameMapper from "../../mapper/game-mapper";

export default class GameRepositoryPrisma implements GameRepository {
  readonly #prisma: PrismaClient;

  constructor() {
    this.#prisma = prisma;
  }

  async findAll(): Promise<Game[] | undefined> {
    const games = await this.#prisma.game.findMany({
      include: {
        announcements: true,
        _count: true,
      },
    });
    if (!games.length) {
      return undefined;
    }
    return games.map(
      (game) =>
        new Game(
          {
            title: game.title,
            bannerURL: game.bannerURL,
          },
          game.id
        )
    );
  }

  async findAllGamesWithAnnoucementAndCount(): Promise<
    GameWithRelationAnnoucementResult[] | undefined
  > {
    const games = await this.#prisma.game.findMany({
      include: {
        announcements: true,
        _count: true,
      },
    });
    if (!games.length) {
      return undefined;
    }
    return games.map((game) => GameMapper.toDTO(game));
  }

  async findGameById(id: string): Promise<Game | undefined> {
    const isGameExisting = await this.#prisma.game.findUnique({
      where: {
        id,
      },
    });
    if (!isGameExisting) {
      return undefined;
    }
    const game = new Game(
      {
        title: isGameExisting.title,
        bannerURL: isGameExisting.bannerURL,
      },
      isGameExisting.id
    );
    return game;
  }

  async create(game: Game): Promise<void> {
    await this.#prisma.game.create({
      data: {
        title: game.title,
        bannerURL: game.bannerURL,
      },
    });
  }
}
