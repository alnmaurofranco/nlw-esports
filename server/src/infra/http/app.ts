import "express-async-errors";
import cors from "cors";
import express, { Application } from "express";
import {
  createAnnouncementSchema,
  CreateAnnouncementSchema,
} from "../../application/use-cases/create-announcement/create-announcement-schema";
import {
  ListAnnouncementsByGameSchema,
  listAnnouncementsByGameSchema,
} from "../../application/use-cases/list-announcements-by-game/list-announcements-by-game-schema";
import CreateAnnouncementFactory from "../factory/create-announcement-factory";
import GetAnnouncementByDiscordFactory from "../factory/get-announcement-by-discord-factory";
import ListAllAnnouncementsFactory from "../factory/list-all-announcements-factory";
import ListAllGamesFactory from "../factory/list-all-games-factory";
import ListAnnouncementsByGameFactory from "../factory/list-announcements-by-game-factory";
import zodErrorMiddleware from "./middleware/zod-error-middleware";
import zodMiddlewareAdapter from "./middleware/zod-middleware-adapter";
import { z } from "zod";
import AxiosHttpClientAdapter from "../adapter/http-client/axios-http-client-adapter";
import { stringify } from "query-string";
import { AxiosResponse } from "axios";
import GotHttpClientAdapter from "../adapter/http-client/got-http-client-adapter";
import { GotReturn } from "got";
import {
  authenticateEmailSchema,
  AuthenticateEmailSchema,
} from "../../application/use-cases/authenticate-email/authenticate-email-schema";
import AuthenticateEmailFactory from "../factory/authenticate-email-factory";
import isAuthorized from "./middleware/authorized-middleware";
import {
  authenticateByDiscordSchema,
  AuthenticateByDiscordSchema,
} from "../../application/use-cases/authenticate-by-discord/authenticate-by-discord-schema";
import AuthenticateByDiscordFactory from "../factory/authenticate-by-discord-factory";
import AuthenticateByTwitchFactory from "../factory/authenticate-by-twitch-factory";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/auth/v1/twitch", async (req, res) => {
  const options = {
    redirect_uri: process.env.TWITCH_CALLBACK,
    client_id: process.env.TWITCH_CLIENT_ID,
    response_type: "code",
    scope: ["user:edit", "user:read:email"].join(" "),
  };
  return res.redirect(
    `https://id.twitch.tv/oauth2/authorize?${stringify(options)}`
  );
});
app.post(
  "/auth/v1/account",
  zodMiddlewareAdapter<AuthenticateEmailSchema>(authenticateEmailSchema),
  async (request, response) => {
    return AuthenticateEmailFactory().handle(request, response);
  }
);
app.get("/auth/v1/account/email", isAuthorized, async (request, response) => {
  const paramsData = {
    ...request.params,
    ...request.query,
  };
  console.log(paramsData);
});
app.get(
  "/auth/discord/callback",
  zodMiddlewareAdapter<AuthenticateByDiscordSchema>(
    authenticateByDiscordSchema
  ),
  async (request, response) => {
    return AuthenticateByDiscordFactory().handle(request, response);
  }
);
app.get("/auth/v1/twitch/callback", async (request, response) => {
  return AuthenticateByTwitchFactory().handle(request, response);
});
app.get("/games", async (request, response) => {
  return ListAllGamesFactory().handle(request, response);
});
app.post(
  "/games/:gameId/ads",
  zodMiddlewareAdapter<CreateAnnouncementSchema>(createAnnouncementSchema),
  async (request, response) => {
    return CreateAnnouncementFactory().handle(request, response);
  }
);
app.get(
  "/games/:gameId/ads",
  zodMiddlewareAdapter<ListAnnouncementsByGameSchema>(
    listAnnouncementsByGameSchema
  ),
  async (request, response) => {
    return ListAnnouncementsByGameFactory().handle(request, response);
  }
);
app.get("/ads/:announcementId/discord", async (request, response) => {
  return GetAnnouncementByDiscordFactory().handle(request, response);
});
app.get("/ads", async (request, response) => {
  return ListAllAnnouncementsFactory().handle(request, response);
});
app.use(zodErrorMiddleware());
export default app;
