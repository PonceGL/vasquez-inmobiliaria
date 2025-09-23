/**
 * @jest-environment node
 */
import { jwtVerify } from "jose";

import { comparePassword, hashPassword } from "@/app/lib/crypt";
import { AuthenticationError } from "@/app/lib/httpErrors";
import { sendMailService } from "@/app/lib/sendMail";

import { userService } from "../user/user.services";
import { loginService } from "./login.services";

jest.mock("../user/user.services");
jest.mock("../../lib/sendMail");
jest.mock("../../lib/crypt");
jest.mock("../../lib/mongodb", () => ({
  dbConnect: jest.fn().mockResolvedValue(true),
}));

const mockUser = {
  id: "mockUserId",
  _id: "mockUserId",
  name: "Test User",
  email: "test@example.com",
  password: "hashedPassword123",
  role: "dev",
  verified: true,
};

describe("LoginService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createLogin", () => {
    it("should return a token for valid credentials", async () => {
      (userService.getForLogin as jest.Mock).mockResolvedValue(mockUser);
      (comparePassword as jest.Mock).mockResolvedValue(true);
      const result = await loginService.createLogin({
        email: "test@example.com",
        password: "password123",
      });
      expect(result.token).toBe("mocked.jwt.token");
    });

    it("should throw AuthenticationError for invalid password", async () => {
      (userService.getForLogin as jest.Mock).mockResolvedValue(mockUser);
      (comparePassword as jest.Mock).mockResolvedValue(false);
      await expect(
        loginService.createLogin({
          email: "test@example.com",
          password: "wrongPassword",
        })
      ).rejects.toThrow(AuthenticationError);
    });
  });

  describe("forgotPassword", () => {
    it("should send a password reset email if user exists", async () => {
      (userService.getByEmail as jest.Mock).mockResolvedValue(mockUser);
      await loginService.forgotPassword({ email: "test@example.com" });
      expect(sendMailService.send).toHaveBeenCalled();
    });

    it("should not reveal if the user does not exist and should return the generic message", async () => {
      const originalError = new Error("Usuario no encontrado");
      (userService.getByEmail as jest.Mock).mockRejectedValue(originalError);
      const result = await loginService.forgotPassword({
        email: "nouser@example.com",
      });
      expect(result).toEqual({
        message:
          "Si existe una cuenta con este correo, se ha enviado un enlace para restablecer la contraseña.",
      });
      expect(sendMailService.send).not.toHaveBeenCalled();
    });
  });

  describe("resetPassword", () => {
    it("should update the user password with a valid token", async () => {
      const token = "any.fake.token";
      const newPassword = "newPassword123";
      const hashedNewPassword = "hashedNewPassword123";

      (jwtVerify as jest.Mock).mockResolvedValue({
        payload: { sub: mockUser.id },
      });
      (hashPassword as jest.Mock).mockResolvedValue(hashedNewPassword);
      (userService.update as jest.Mock).mockResolvedValue(undefined);

      await loginService.resetPassword({
        token,
        password: newPassword,
        confirmPassword: newPassword,
      });

      expect(hashPassword).toHaveBeenCalledWith(newPassword);
      expect(userService.update).toHaveBeenCalledWith(mockUser.id, {
        password: hashedNewPassword,
      });
    });

    it("should throw an error for an expired or invalid token", async () => {
      const verificationError = new Error("Token verification failed");
      verificationError.name = "JOSEError";

      (jwtVerify as jest.Mock).mockRejectedValue(verificationError);

      await expect(
        loginService.resetPassword({
          token: "any.token",
          password: "newPassword123",
          confirmPassword: "newPassword123",
        })
      ).rejects.toThrow(AuthenticationError);

      expect(userService.update).not.toHaveBeenCalled();
    });

    it("should throw an error for a token without a subject (sub)", async () => {
      (jwtVerify as jest.Mock).mockResolvedValue({
        payload: { email: mockUser.email },
      });

      await expect(
        loginService.resetPassword({
          token: "any.token",
          password: "newPassword123",
          confirmPassword: "newPassword123",
        })
      ).rejects.toThrow("Token inválido.");

      expect(userService.update).not.toHaveBeenCalled();
    });
  });
});
