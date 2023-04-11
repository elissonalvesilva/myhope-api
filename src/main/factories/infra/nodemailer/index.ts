import EmailServiceImpl from "@/infra/email/nodemailer";
import env from "@/main/config/environment";

export const makeNodeMailer = (): EmailServiceImpl => {
  return new EmailServiceImpl(env);
}