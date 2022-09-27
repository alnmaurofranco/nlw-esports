import { Request, Response } from "express";
import { AuthenticateByDiscordSchema } from "../../application/use-cases/authenticate-by-discord/authenticate-by-discord-schema";
import AuthenticateByDiscordUseCase from "../../application/use-cases/authenticate-by-discord/authenticate-by-discord-use-case";

export default class AuthenticateByDiscordController {
  readonly #authenticateByDiscordUseCase: AuthenticateByDiscordUseCase;

  constructor(authenticateByDiscordUseCase: AuthenticateByDiscordUseCase) {
    this.#authenticateByDiscordUseCase = authenticateByDiscordUseCase;
  }

  async handle(request: Request, response: Response) {
    const paramsData = {
      ...request.query,
      ...request.params,
      ...request.body,
    } as AuthenticateByDiscordSchema;
    const output = await this.#authenticateByDiscordUseCase.execute(paramsData);
    return response.json(output);
  }
}
