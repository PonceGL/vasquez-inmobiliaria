import { jwtVerify } from "jose";
import { NextRequest } from "next/server";
import { TextEncoder } from "util";

import { NextRequest as MockNextRequest } from "../../../../__mocks__/next-server";
import {
  AuthenticationError,
  InternalServerErrorException,
} from "../httpErrors";
import { isAuthenticated } from ".";

jest.mock("next/server", () => ({
  __esModule: true,
  NextRequest: MockNextRequest,
}));

jest.mock("jose");
const mockedJwtVerify = jwtVerify as jest.Mock;

let isDevValue = true;
jest.mock("@/app/constants/enviroment", () => ({
  __esModule: true,
  get IS_DEV() {
    return isDevValue;
  },
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.TextEncoder = TextEncoder as any;

describe("Función isAuthenticated", () => {
  const originalEnv = process.env;

  beforeAll(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
    isDevValue = true;
  });

  it("debería lanzar InternalServerErrorException si API_TOKEN no está definido (en modo desarrollo)", async () => {
    isDevValue = true;
    delete process.env.API_TOKEN;

    const request = new MockNextRequest("https://test.com") as NextRequest;

    await expect(isAuthenticated(request)).rejects.toThrow(
      InternalServerErrorException
    );
    await expect(isAuthenticated(request)).rejects.toThrow(
      "API_TOKEN is not defined in environment variables"
    );
  });

  it("debería lanzar InternalServerErrorException si API_TOKEN no está definido (en modo producción)", async () => {
    isDevValue = false;
    delete process.env.API_TOKEN;

    const request = new MockNextRequest("https://test.com") as NextRequest;

    await expect(isAuthenticated(request)).rejects.toThrow(
      InternalServerErrorException
    );
    await expect(isAuthenticated(request)).rejects.toThrow(
      "Internal server error"
    );
  });

  it('debería lanzar AuthenticationError si el encabezado "authorization" está ausente', async () => {
    process.env.API_TOKEN = "mi-api-token-secreto";

    const request = new MockNextRequest("https://test.com") as NextRequest;

    await expect(isAuthenticated(request)).rejects.toThrow(AuthenticationError);
    await expect(isAuthenticated(request)).rejects.toThrow(
      "Authorization token is missing"
    );
  });

  it("debería lanzar AuthenticationError si el token no está en el encabezado (formato incorrecto)", async () => {
    process.env.API_TOKEN = "mi-api-token-secreto";

    const headers = new Headers();
    headers.set("authorization", "Bearer ");
    const request = new MockNextRequest("https://test.com", {
      headers,
    }) as NextRequest;

    await expect(isAuthenticated(request)).rejects.toThrow(AuthenticationError);
    await expect(isAuthenticated(request)).rejects.toThrow(
      "Authorization token is missing"
    );
  });

  it("debería lanzar el error de jwtVerify si el token es inválido", async () => {
    process.env.API_TOKEN = "mi-api-token-secreto";

    const headers = new Headers();
    headers.set("authorization", "Bearer token-invalido");
    const request = new MockNextRequest("https://test.com", {
      headers,
    }) as NextRequest;

    const verificationError = new Error("JWTExpired");
    mockedJwtVerify.mockRejectedValue(verificationError);

    await expect(isAuthenticated(request)).rejects.toThrow(verificationError);
  });

  it("debería devolver el payload si el token es válido y está presente", async () => {
    process.env.API_TOKEN = "mi-api-token-secreto";

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

    const expectedSecret = new TextEncoder().encode();
    expect(mockedJwtVerify).toHaveBeenCalledWith(validToken, expectedSecret);
  });
});
