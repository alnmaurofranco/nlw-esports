import { Request, Response } from "express";
import { AuthenticateByTwitchSchema } from "../../application/use-cases/authenticate-by-twitch/authenticate-by-twitch-schema";
import AuthenticateByTwitchUseCase from "../../application/use-cases/authenticate-by-twitch/authenticate-by-twitch-use-case";

export default class AuthenticateByTwitchController {
  readonly #authenticateByTwitchUseCase: AuthenticateByTwitchUseCase;

  constructor(authenticateByTwitchUseCase: AuthenticateByTwitchUseCase) {
    this.#authenticateByTwitchUseCase = authenticateByTwitchUseCase;
  }

  async handle(request: Request, response: Response) {
    const paramsData = {
      ...request.query,
      ...request.params,
    } as AuthenticateByTwitchSchema;
    const output = await this.#authenticateByTwitchUseCase.execute(paramsData);
    response.json(output);
  }
}
