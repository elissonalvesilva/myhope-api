import * as nodemailer from "nodemailer";
import EmailService from "@/app/protocols/email";

export default class EmailServiceImpl implements EmailService {
  constructor(private readonly mailServiceConfig: any){}
  
  sendResetEmail(email: string, code: number): Promise<boolean | null> {
    let mailOptions = {
      from: this.mailServiceConfig.MAIL_FROM,
      to: email,
      subject: 'Reset Password',
      html: code.toString(),
  };

  const transporter = nodemailer.createTransport({
      host: this.mailServiceConfig.MAIL_HOST,
      port: this.mailServiceConfig.MAIL_PORT,
      secure: true,
      auth: {
          user: this.mailServiceConfig.MAIL_USER,
          pass: this.mailServiceConfig.MAIL_PASSWORD,
      },
      tls: { rejectUnauthorized: false }
  });


  console.log(mailOptions);

  return new Promise((resolve) => {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          resolve(false)
        } else {
          resolve(true);
        }
      });
    })
  }
}