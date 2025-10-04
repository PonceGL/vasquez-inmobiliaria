import { ZodError } from "zod";

export const mockLoginDto = {
  email: "test@example.com",
  password: "password123",
};

export const mockForgotPasswordDto = {
  email: "test@example.com",
};

export const mockResetPasswordDto = {
  token: "mock.jwt.token",
  password: "newPassword123",
  confirmPassword: "newPassword123",
};

export const mockJwtPayload = {
  sub: "60d0fe4f5311236168a109cb",
  email: "test@example.com",
  role: "dev",
  verified: true,
};

export const mockResetTokenPayload = {
  sub: "60d0fe4f5311236168a109cb",
  email: "test@example.com",
};

export const mockJwtVerifyResponse = {
  payload: mockJwtPayload,
};

export const mockResetTokenVerifyResponse = {
  payload: mockResetTokenPayload,
};

export const mockInvalidPayload = {
  payload: {
    email: "test@example.com",
  },
};

export const mockZodLoginError: ZodError["issues"] = [
  {
    code: "invalid_type" as const,
    expected: "string",
    path: ["email"],
    message: "El email es requerido.",
  },
  {
    code: "too_small" as const,
    origin: "password",
    minimum: 6,
    path: ["password"],
    message: "La contraseña debe tener al menos 6 caracteres.",
  },
];

export const mockZodForgotPasswordError: ZodError["issues"] = [
  {
    code: "invalid_type" as const,
    expected: "string",
    path: ["email"],
    message: "El email es requerido.",
  },
];

export const mockZodResetPasswordError: ZodError["issues"] = [
  {
    code: "invalid_type" as const,
    expected: "string",
    path: ["token"],
    message: "El token es requerido.",
  },
  {
    code: "too_small" as const,
    origin: "password",
    minimum: 6,
    path: ["password"],
    message: "La contraseña debe tener al menos 6 caracteres.",
  },
  {
    code: "custom" as const,
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden.",
  },
];
