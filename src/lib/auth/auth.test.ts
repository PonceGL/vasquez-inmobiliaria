import { mockEnv } from "@mocks/env";
import { NextRequest as MockNextRequest } from "@mocks/next-server"
import { jwtVerify } from "jose";
import { NextRequest } from "next/server";
import { TextEncoder } from "util";

import { JWT_ALGORITHM } from "@/constants/auth";
import { isAuthenticated } from "@/lib/auth";
import { AuthenticationError } from "@/lib/httpErrors";

jest.mock("next/server", () => ({
  __esModule: true,
  NextRequest: MockNextRequest,
}));

jest.mock("jose");
const mockedJwtVerify = jwtVerify as jest.Mock;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.TextEncoder = TextEncoder as any;

describe("Función isAuthenticated", () => {
  const originalEnv = process.env;

  beforeAll(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("debería lanzar el error de jwtVerify si el token es inválido", async () => {
    const headers = new Headers();
    headers.set("authorization", "Bearer token-invalido");
    const request = new MockNextRequest("https://test.com", {
      headers,
    }) as NextRequest;

    const verificationError = new AuthenticationError(
      "Invalid authorization token."
    );
    mockedJwtVerify.mockRejectedValue(verificationError);

    await expect(isAuthenticated(request)).rejects.toThrow(verificationError);
  });

  it("debería devolver el payload si el token es válido y está presente", async () => {
    const headers = new Headers();
    const validToken = "un-jwt-valido";
    headers.set("authorization", `Bearer ${validToken}`);
    const request = new MockNextRequest("https://test.com", {
      headers,
    }) as NextRequest;

    const mockPayload = { sub: "user-123", name: "John Doe" };
    mockedJwtVerify.mockResolvedValue({ payload: mockPayload });

    const result = await isAuthenticated(request);

    expect(result).toEqual({ payload: mockPayload });

    const expectedSecret = new TextEncoder().encode(mockEnv.SESSION_SECRET);
    expect(mockedJwtVerify).toHaveBeenCalledWith(validToken, expectedSecret, {
      algorithms: [JWT_ALGORITHM],
    });
  });
});
