/**
 * @jest-environment node
 */

import nodemailer from "nodemailer";

import { SendMailService } from "@/lib/sendMail";

jest.mock("nodemailer");

describe("SendMailService", () => {
  let sendMailService: SendMailService;
  let mockSendMail: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockSendMail = jest.fn();

    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: mockSendMail,
    });

    sendMailService = new SendMailService();
  });

  it("debería llamar a sendMail de nodemailer con los parámetros correctos", async () => {
    const mailData = {
      email: "test@example.com",
      subject: "Hola Jest",
      html: "<p>Este es un test con Jest</p>",
    };

    mockSendMail.mockResolvedValue({ messageId: "123-jest" });

    await sendMailService.send(mailData);

    expect(nodemailer.createTransport).toHaveBeenCalledTimes(1);

    expect(mockSendMail).toHaveBeenCalledWith({
      from: expect.stringContaining("Inmobiliaria"),
      to: "test@example.com",
      subject: "Hola Jest",
      html: "<p>Este es un test con Jest</p>",
    });
  });

  it("debería lanzar un error si sendMail de nodemailer falla", async () => {
    const mailData = {
      email: "test@example.com",
      subject: "Test de fallo",
      html: "<p>Esto fallará</p>",
    };

    const smtpError = new Error("Invalid credentials");
    mockSendMail.mockRejectedValue(smtpError);

    await expect(sendMailService.send(mailData)).rejects.toThrow();
  });
});
