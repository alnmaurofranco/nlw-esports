import AuthenticateEmailUseCase from "../../application/use-cases/authenticate-email/authenticate-email-use-case";
import AuthenticateEmailController from "../controller/authenticate-email-controller";
import NodemailerMailProviderAdapter from "../provider/mail-provider/nodemailer-mail-provider-adapter";

export default function AuthenticateEmailFactory(): AuthenticateEmailController {
  const mailProvider = new NodemailerMailProviderAdapter();
  const authenticateEmailUseCase = new AuthenticateEmailUseCase(mailProvider);
  return new AuthenticateEmailController(authenticateEmailUseCase);
}
