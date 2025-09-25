import nodemailer, { Transporter } from "nodemailer";

import { env } from "@/config/env";
import { IS_DEV } from "@/constants/enviroment";
import { MailAdapter, SendMail } from "@/types/mailer";

class SendMailService implements MailAdapter {
  private transporter: Transporter;
  private host: string = env.SMTP_HOST;
  private user: string = env.SMTP_USER;
  private pass: string = env.SMTP_PASSWORD;
  private port: number = 465;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: this.host,
        port: this.port,
        secure: true,
        auth: {
          user: this.user,
          pass: this.pass,
        },
    });
  }

  public async send({email, subject, html}: SendMail): Promise<void> {
    try {

      await this.transporter.sendMail({
        from: `Inmobiliaria <${this.user}>`, // TODO: change this for each environment
        to: email,
        subject: subject,
        html: html,
      });
    } catch (error) {
      throw new Error(
        IS_DEV
          ? (error as Error)?.message ?? "Error al enviar el correo"
          : "Error interno."
      );
    }
  }
}


const sendMailService = new SendMailService();
export { SendMailService, sendMailService };
