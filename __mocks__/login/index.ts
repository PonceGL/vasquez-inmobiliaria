export const mockUser = {
  _id: "60d0fe4f5311236168a109cb",
  id: "60d0fe4f5311236168a109cb",
  name: "Test User",
  email: "test@example.com",
  password: "hashedPassword123",
  role: "dev",
  verified: true,
  createdAt: "2025-01-15T10:30:00.000Z",
  updatedAt: "2025-01-15T10:30:00.000Z",
};

export const mockLoginData = {
  email: "test@example.com",
  password: "password123",
};

export const mockForgotPasswordData = {
  email: "test@example.com",
};

export const mockResetPasswordData = {
  token: "mock.jwt.token",
  password: "newPassword123",
  confirmPassword: "newPassword123",
};

export const mockTokenResponse = {
  token: "mocked.jwt.token",
};

export const mockSuccessMessage = {
  message: "Contraseña restablecida con éxito.",
};

export const mockGenericMessage = {
  message:
    "Si existe una cuenta con este correo, se ha enviado un enlace para restablecer la contraseña.",
};
