/**
 * @jest-environment node
 */

import {
  mockForgotPasswordData,
  mockGenericMessage,
  mockLoginData,
  mockResetPasswordData,
  mockSuccessMessage,
  mockTokenResponse,
  mockUser,
} from "@mocks/login";
import {
  mockForgotPasswordDto,
  mockInvalidPayload,
  mockLoginDto,
  mockResetPasswordDto,
  mockResetTokenVerifyResponse,
  mockZodForgotPasswordError,
  mockZodLoginError,
  mockZodResetPasswordError,
} from "@mocks/login/dtos";
import { JWTPayload, jwtVerify } from "jose";
import { MongooseError } from "mongoose";
import { ZodError } from "zod";

import {
  ForgotPasswordDto,
  forgotPasswordSchema,
} from "@/app/api/auth/dtos/forgotPassword.dto";
import { LogInDto, logInSchema } from "@/app/api/auth/dtos/login.dto";
import {
  ResetPasswordDto,
  resetPasswordSchema,
} from "@/app/api/auth/dtos/resetPassword.dto";
import { loginService } from "@/app/api/auth/login.service";
import { userService } from "@/app/api/user/user.service";
import { JWT_ALGORITHM } from "@/constants/auth";
import { comparePassword, hashPassword } from "@/lib/crypt";
import {
  AuthenticationError,
  InternalServerErrorException,
  NotFoundException,
} from "@/lib/httpErrors";
import { sendMailService } from "@/lib/sendMail";

jest.mock("@/app/api/user/user.service");
jest.mock("@/lib/sendMail");
jest.mock("@/lib/crypt");
jest.mock("@/lib/mongodb");
jest.mock("@/config/env", () => ({
  env: {
    SESSION_SECRET: "test-secret",
    NEXT_PUBLIC_APP_URL: "http://localhost:3000",
  },
}));
jest.mock("@/constants/auth", () => ({
  ACCESS_TOKEN_EXPIRATION: "1h",
  RESET_TOKEN_EXPIRATION: "15m",
  JWT_ALGORITHM: "HS256",
}));
jest.mock("jose", () => ({
  jwtVerify: jest.fn(),
  SignJWT: class MockSignJWT {
    constructor(public payload: JWTPayload) {}
    setProtectedHeader() {
      return this;
    }
    setExpirationTime() {
      return this;
    }
    setJti() {
      return this;
    }
    setIssuedAt() {
      return this;
    }
    sign() {
      return Promise.resolve("mocked.jwt.token");
    }
  },
  JWEProtectedHeader: {},
}));

jest.mock("@/app/api/auth/dtos/forgotPassword.dto", () => ({
  forgotPasswordSchema: {
    parse: jest.fn(),
  },
}));
jest.mock("@/app/api/auth/dtos/login.dto", () => ({
  logInSchema: {
    parse: jest.fn(),
  },
}));
jest.mock("@/app/api/auth/dtos/resetPassword.dto", () => ({
  resetPasswordSchema: {
    parse: jest.fn(),
  },
}));

const mockedUserService = jest.mocked(userService);
const mockedSendMailService = jest.mocked(sendMailService);
const mockedComparePassword = jest.mocked(comparePassword);
const mockedHashPassword = jest.mocked(hashPassword);
const mockedJwtVerify = jest.mocked(jwtVerify);
const mockedLoginSchema = jest.mocked(logInSchema);
const mockedForgotPasswordSchema = jest.mocked(forgotPasswordSchema);
const mockedResetPasswordSchema = jest.mocked(resetPasswordSchema);

describe("LoginService createLogin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a token for valid credentials", async () => {
    mockedLoginSchema.parse.mockReturnValue(mockLoginDto as never);

    mockedUserService.getForLogin.mockResolvedValue(mockUser as never);
    mockedComparePassword.mockResolvedValue(true);

    const result = await loginService.createLogin(mockLoginData);

    expect(result).toEqual(mockTokenResponse);
    expect(mockedUserService.getForLogin).toHaveBeenCalledWith(mockLoginDto);
    expect(mockedComparePassword).toHaveBeenCalledWith(
      mockLoginDto.password,
      mockUser.password
    );
  });

  it("should throw AuthenticationError for invalid password", async () => {
    mockedLoginSchema.parse.mockReturnValue(mockLoginDto as never);

    mockedUserService.getForLogin.mockResolvedValue(mockUser as never);
    mockedComparePassword.mockResolvedValue(false);

    await expect(loginService.createLogin(mockLoginData)).rejects.toThrow(
      AuthenticationError
    );
  });

  it("should re-throw ZodError on invalid login data", async () => {
    mockedLoginSchema.parse.mockImplementation(() => {
      throw new ZodError(mockZodLoginError);
    });

    try {
      await loginService.createLogin({
        email: "",
        password: "",
      } as LogInDto);
      fail("Expected function to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });

  it("should throw InternalServerErrorException on database error", async () => {
    mockedLoginSchema.parse.mockReturnValue(mockLoginDto as never);

    const mongooseError = new MongooseError("Database connection error");
    mockedUserService.getForLogin.mockRejectedValue(mongooseError);

    await expect(loginService.createLogin(mockLoginData)).rejects.toThrow(
      InternalServerErrorException
    );
  });
});

describe("LoginService forgotPassword", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should send a password reset email if user exists", async () => {
    mockedForgotPasswordSchema.parse.mockReturnValue(
      mockForgotPasswordDto as never
    );

    mockedUserService.getByEmail.mockResolvedValue(mockUser as never);
    mockedSendMailService.send.mockResolvedValue(undefined);

    const result = await loginService.forgotPassword(mockForgotPasswordData);

    expect(result).toEqual(mockGenericMessage);
    expect(mockedUserService.getByEmail).toHaveBeenCalledWith({
      email: mockForgotPasswordDto.email,
    });
    expect(mockedSendMailService.send).toHaveBeenCalledWith({
      email: mockForgotPasswordDto.email,
      subject: "Restablece tu contraseña",
      html: expect.any(String),
    });
  });

  it("should return generic message if user does not exist", async () => {
    mockedForgotPasswordSchema.parse.mockReturnValue(
      mockForgotPasswordDto as never
    );

    const notFoundError = new NotFoundException("Usuario no encontrado");
    mockedUserService.getByEmail.mockRejectedValue(notFoundError);

    const result = await loginService.forgotPassword({
      email: "nouser@example.com",
    });

    expect(result).toEqual(mockGenericMessage);
    expect(mockedSendMailService.send).not.toHaveBeenCalled();
  });

  it("should re-throw ZodError on invalid email data", async () => {
    mockedForgotPasswordSchema.parse.mockImplementation(() => {
      throw new ZodError(mockZodForgotPasswordError);
    });

    try {
      await loginService.forgotPassword({
        email: "",
      } as ForgotPasswordDto);
      fail("Expected function to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });

  it("should throw InternalServerErrorException on mail service error", async () => {
    mockedForgotPasswordSchema.parse.mockReturnValue(
      mockForgotPasswordDto as never
    );

    mockedUserService.getByEmail.mockResolvedValue(mockUser as never);
    mockedSendMailService.send.mockRejectedValue(
      new Error("Mail service error")
    );

    await expect(
      loginService.forgotPassword(mockForgotPasswordData)
    ).rejects.toThrow(InternalServerErrorException);
  });

  it("should throw InternalServerErrorException on database error", async () => {
    mockedForgotPasswordSchema.parse.mockReturnValue(
      mockForgotPasswordDto as never
    );

    const mongooseError = new MongooseError("Database error");
    mockedUserService.getByEmail.mockRejectedValue(mongooseError);

    await expect(
      loginService.forgotPassword(mockForgotPasswordData)
    ).rejects.toThrow(InternalServerErrorException);
  });
});

describe("LoginService resetPassword", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update the user password with a valid token", async () => {
    mockedResetPasswordSchema.parse.mockReturnValue(
      mockResetPasswordDto as never
    );

    mockedJwtVerify.mockResolvedValue(mockResetTokenVerifyResponse as never);
    mockedHashPassword.mockResolvedValue("hashedNewPassword123");
    mockedUserService.update.mockResolvedValue(mockUser as never);

    const result = await loginService.resetPassword(mockResetPasswordData);

    expect(result).toEqual(mockSuccessMessage);
    expect(mockedJwtVerify).toHaveBeenCalledWith(
      mockResetPasswordDto.token,
      expect.any(Uint8Array),
      { algorithms: [JWT_ALGORITHM] }
    );
    expect(mockedHashPassword).toHaveBeenCalledWith(
      mockResetPasswordDto.password
    );
    expect(mockedUserService.update).toHaveBeenCalledWith(
      mockResetTokenVerifyResponse.payload.sub,
      { password: "hashedNewPassword123" }
    );
  });

  it("should throw AuthenticationError for an expired or invalid token", async () => {
    mockedResetPasswordSchema.parse.mockReturnValue(
      mockResetPasswordDto as never
    );

    const verificationError = new Error("Token verification failed");
    verificationError.name = "JOSEError";
    mockedJwtVerify.mockRejectedValue(verificationError);

    await expect(
      loginService.resetPassword(mockResetPasswordData)
    ).rejects.toThrow(AuthenticationError);

    expect(mockedUserService.update).not.toHaveBeenCalled();
  });

  it("should throw AuthenticationError for a token without subject", async () => {
    mockedResetPasswordSchema.parse.mockReturnValue(
      mockResetPasswordDto as never
    );

    mockedJwtVerify.mockResolvedValue(mockInvalidPayload as never);

    await expect(
      loginService.resetPassword(mockResetPasswordData)
    ).rejects.toThrow(AuthenticationError);

    expect(mockedUserService.update).not.toHaveBeenCalled();
  });

  it("should re-throw ZodError on invalid reset password data", async () => {
    mockedResetPasswordSchema.parse.mockImplementation(() => {
      throw new ZodError(mockZodResetPasswordError);
    });

    try {
      await loginService.resetPassword({
        token: "",
        password: "",
        confirmPassword: "",
      } as ResetPasswordDto);
      fail("Expected function to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });

  it("should throw InternalServerErrorException on database error", async () => {
    mockedResetPasswordSchema.parse.mockReturnValue(
      mockResetPasswordDto as never
    );

    mockedJwtVerify.mockResolvedValue(mockResetTokenVerifyResponse as never);
    mockedHashPassword.mockResolvedValue("hashedNewPassword123");

    const mongooseError = new MongooseError("Database update error");
    mockedUserService.update.mockRejectedValue(mongooseError);

    await expect(
      loginService.resetPassword(mockResetPasswordData)
    ).rejects.toThrow(InternalServerErrorException);
  });

  it("should throw InternalServerErrorException on password hashing error", async () => {
    mockedResetPasswordSchema.parse.mockReturnValue(
      mockResetPasswordDto as never
    );

    mockedJwtVerify.mockResolvedValue(mockResetTokenVerifyResponse as never);
    mockedHashPassword.mockRejectedValue(new Error("Hashing error"));

    await expect(
      loginService.resetPassword(mockResetPasswordData)
    ).rejects.toThrow(InternalServerErrorException);
  });
});
