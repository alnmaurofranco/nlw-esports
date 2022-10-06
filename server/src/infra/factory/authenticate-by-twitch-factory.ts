import AuthenticateByTwitchUseCase from "../../application/use-cases/authenticate-by-twitch/authenticate-by-twitch-use-case";
import AxiosHttpClientAdapter from "../adapter/http-client/axios-http-client-adapter";
import AuthenticateByTwitchController from "../controller/authenticate-by-twitch-controller";
import JwtTokenManager from "../manager/jwt-token-manager";
import TwitchOAuthStrategy from "../strategy/twitch-oauth-strategy";

export default function AuthenticateByTwitchFactory(): AuthenticateByTwitchController {
  const httpClient = new AxiosHttpClientAdapter();
  const oauthStrategy = new TwitchOAuthStrategy(httpClient);
  const tokenManager = new JwtTokenManager();
  const authenticateByTwitchUseCase = new AuthenticateByTwitchUseCase(
    oauthStrategy,
    tokenManager
  );
  return new AuthenticateByTwitchController(authenticateByTwitchUseCase);
}
