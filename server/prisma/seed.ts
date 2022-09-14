import { Game } from "@prisma/client";
import { prisma } from "../src/database/prisma";

type SeedCreateGameProps = Omit<Game, "id">;

const deleteAllGames = prisma.$executeRaw`DELETE FROM games`;
const createGame = async ({ title, bannerURL }: SeedCreateGameProps) => {
  return await prisma.game.create({
    data: {
      title,
      bannerURL,
    },
  });
};

async function main() {
  await deleteAllGames;
  await createGame({
    title: "League of Legends",
    bannerURL: "https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg",
  });
  await createGame({
    title: "DOTA 2",
    bannerURL: "https://static-cdn.jtvnw.net/ttv-boxart/29595-285x380.jpg",
  });
  await createGame({
    title: "Counter Strike",
    bannerURL: "https://static-cdn.jtvnw.net/ttv-boxart/32399_IGDB-285x380.jpg",
  });
  await createGame({
    title: "Apex Legends",
    bannerURL: "https://static-cdn.jtvnw.net/ttv-boxart/511224-285x380.jpg",
  });
  await createGame({
    title: "Fortnite",
    bannerURL: "https://static-cdn.jtvnw.net/ttv-boxart/33214-285x380.jpg",
  });
  await createGame({
    title: "World of Warcraft",
    bannerURL: "https://static-cdn.jtvnw.net/ttv-boxart/18122-285x380.jpg",
  });
  await createGame({
    title: "Teamfight Tactics",
    bannerURL: "https://static-cdn.jtvnw.net/ttv-boxart/513143-285x380.jpg",
  });
  await createGame({
    title: "VALORANT",
    bannerURL: "https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg",
  });
}

main();
