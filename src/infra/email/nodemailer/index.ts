import * as path from 'path';
import hbs from 'handlebars';

import * as nodemailer from "nodemailer";
import * as fs from 'fs';
import EmailService from '@/app/protocols/email';

export default class EmailServiceImpl implements EmailService {
  constructor(private readonly mailServiceConfig: any){}
  
  async sendResetEmail(email: string, code: number): Promise<boolean | null> {
  
    const template = hbs.compile(fs.readFileSync(path.join(__dirname, '../../template/email/email.hbs'), 'utf-8'));
  

    const transporter = nodemailer.createTransport({
      host: this.mailServiceConfig.MAIL_HOST,
      port: this.mailServiceConfig.MAIL_PORT,
      secure: false,
      auth: {
          user: this.mailServiceConfig.MAIL_USER,
          pass: this.mailServiceConfig.MAIL_PASSWORD,
      },
      tls: { rejectUnauthorized: false }
    });

    let mailOptions = {
      from: this.mailServiceConfig.MAIL_FROM,
      to: email,
      subject: 'Recuperação de Conta',
      html: template({
        reset: code.toString(),
      })
    };

    return new Promise((resolve) => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          resolve(false)
        } else {
          resolve(true);
        }
      });
    })
  }

  async sendWelcome(email: string, name: any): Promise<boolean | null> {
    const template = hbs.compile(fs.readFileSync(path.join(__dirname, '../../template/email/welcome.hbs'), 'utf-8'));
  

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

    let mailOptions = {
      from: this.mailServiceConfig.MAIL_FROM,
      to: email,
      subject: 'Boas vindas ao MyHope',
      html: template({
        name,
      })
    };

    return new Promise((resolve) => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          resolve(false)
        } else {
          resolve(true);
        }
      });
    })
  }
}