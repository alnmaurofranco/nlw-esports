import MailProvider, { MailMessage, MailMeta } from "./mail-provider";
import nodemailer, { SendMailOptions, Transporter } from "nodemailer";

import fs from "node:fs/promises";
import Handlebars from "handlebars";

export default class NodemailerMailProviderAdapter implements MailProvider {
  readonly #mailClient: Transporter;

  constructor(mailOptions?: SendMailOptions) {
    if (mailOptions) {
      this.#mailClient = nodemailer.createTransport(mailOptions);
    }
    this.#mailClient = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendMail(message: MailMessage, meta?: MailMeta): Promise<void> {
    const { to, from, subject, body, template } = message;
    let templateFile: string;
    const paramsData = {
      to: `${to.name} <${to.email}>`,
      from: `${from.name} <${from.email}>`,
      subject,
    };
    if (template) {
      try {
        templateFile = await fs.readFile(template.path, "utf-8");
      } catch (error) {
        throw new Error("Template not found");
      }
      const templateParse = Handlebars.compile(templateFile);
      const templateContent = templateParse(template.variables);
      await this.#mailClient.sendMail({
        ...paramsData,
        html: templateContent,
      });
    }
    await this.#mailClient.sendMail({
      ...paramsData,
      html: body,
    });
  }
}
