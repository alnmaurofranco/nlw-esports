export type MailAddress = {
  name?: string;
  email: string;
};
export type MailTemplate = {
  path: string;
  variables: any;
};
export type MailMessage = {
  from: MailAddress;
  to: MailAddress;
  subject: string;
  body: string;
  template?: MailTemplate;
};
export type MailMeta = Record<string, unknown>;

export default interface MailProvider {
  sendMail(message: MailMessage, meta?: MailMeta): Promise<void>;
}
