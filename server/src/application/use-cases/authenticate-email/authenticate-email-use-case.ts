import MailProvider from "../../../infra/provider/mail-provider/mail-provider";
import createTokenByEmail from "../../../utils/create-token-by-email";
import {
  AuthenticateEmailInput,
  AuthenticateEmailOutput,
} from "./authenticate-email-dto";

export default class AuthenticateEmailUseCase {
  readonly #mailProvider: MailProvider;

  constructor(mailProvider: MailProvider) {
    this.#mailProvider = mailProvider;
  }

  async execute(
    input: AuthenticateEmailInput
  ): Promise<AuthenticateEmailOutput> {
    if (!input.email) {
      throw new Error("E-mail is required");
    }
    const token = createTokenByEmail(input.email);
    const magicLink = `http://localhost:3333/auth/v1/account/email?token=${token}`;
    const mailOptions = {
      to: {
        email: input.email,
      },
      from: {
        name: "NLW Esports",
        email: "noreply@nlwesports.vercel.com",
      },
      subject: "Invitation",
      body: `
      <p><b>Olá John Doe</b></p>
      <a href="${magicLink}">Clique aqui para fazer login com seu e-mail mágico</a>
      <br />
      <p>Caso o link não esteja funcionando copie o link e cole no seu navegador</p>
      <br />
      <p>${magicLink}</p>
      <br />
      <p>Se você não solicitou este e-mail, ignore-o.</p>
      <p>Atenciosamente, <br /> NLW Esports</p>
      `,
    };
    try {
      await this.#mailProvider.sendMail(mailOptions);
    } catch (error: unknown) {
      const err = error as Error;
      return {
        success: false,
        message: err.message,
      };
    }
    return {
      success: true,
      message: "E-mail has been sent",
    };
  }
}
