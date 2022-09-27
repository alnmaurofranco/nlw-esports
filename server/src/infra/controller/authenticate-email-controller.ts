import { Request, Response } from "express";
import { AuthenticateEmailSchema } from "../../application/use-cases/authenticate-email/authenticate-email-schema";
import AuthenticateEmailUseCase from "../../application/use-cases/authenticate-email/authenticate-email-use-case";

export default class AuthenticateEmailController {
  readonly #authenticateEmailUseCase: AuthenticateEmailUseCase;

  constructor(authenticateEmailUseCase: AuthenticateEmailUseCase) {
    this.#authenticateEmailUseCase = authenticateEmailUseCase;
  }

  async handle(request: Request, response: Response) {
    const { email } = request.body as AuthenticateEmailSchema;
    const output = await this.#authenticateEmailUseCase.execute({ email });
    return response.json(output);
  }
}
