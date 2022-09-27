import AuthenticateByDiscordUseCase from "../../application/use-cases/authenticate-by-discord/authenticate-by-discord-use-case";
import AxiosHttpClientAdapter from "../adapter/http-client/axios-http-client-adapter";
import AuthenticateByDiscordController from "../controller/authenticate-by-discord-controller";
import DiscordOAuthStrategy from "../strategy/discord-oauth-strategy";

export default function AuthenticateByDiscordFactory(): AuthenticateByDiscordController {
  const httpClient = new AxiosHttpClientAdapter();
  const oauthStrategy = new DiscordOAuthStrategy(httpClient);
  const authenticateByDiscordUseCase = new AuthenticateByDiscordUseCase(
    oauthStrategy
  );
  return new AuthenticateByDiscordController(authenticateByDiscordUseCase);
}
