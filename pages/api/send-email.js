import nodemailer from "nodemailer";

export default async function sentEmail(req, res) {
  if (req.method !== "POST") {
    res
      .status(500)
      .json({ message: "Lo sentimos, sólo aceptamos solicitudes POST" });
  }

  const messageSubject = req.body.subject;
  const messageHtml = req.body.html;

  const transporter = nodemailer.createTransport({
    host: process.env.NEXT_PUBLIC_MAIL_HOST,
    port: 465,
    secure: true, // true para 465, false para otros puertos
    auth: {
      user: process.env.NEXT_PUBLIC_MAIL_SMTP, // generated ethereal user
      pass: process.env.NEXT_PUBLIC_MAIL_PASSWORD, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.NEXT_PUBLIC_MAIL_SMTP, // dirección del remitente
    to: "ginformatica@grupovasquez.com.mx, poncianogl@hotmail.com", // lista de receivers
    subject: messageSubject, // Asunto
    html: messageHtml, // html body
  });

  transporter
    .verify()
    .then(() => {
      console.log("Message sent: ", info.messageId);
    })
    .catch((err) => console.log("Error sending message: ", err));

  res.status(200).json({
    ok: "Send Email",
    message: info.messageId,
    status: true,
  });
}
