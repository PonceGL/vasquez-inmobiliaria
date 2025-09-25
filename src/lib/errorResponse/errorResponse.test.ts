import { NextResponse as MockNextResponse } from "@mocks/next-server"
import { z } from "zod";

import { IS_DEV } from "@/constants/enviroment";
import { HttpError } from "@/lib/httpErrors";

jest.mock("next/server", () => ({
  NextResponse: MockNextResponse,
}));

jest.mock("jose/errors", () => {
  class JWSInvalid extends Error {
    constructor(message: string) {
      super(message);
      this.name = "JWSInvalid";
      Object.setPrototypeOf(this, JWSInvalid.prototype);
    }
    static get [Symbol.hasInstance]() {
      return (instance: Error) => instance?.name === "JWSInvalid";
    }
  }
  class JWTExpired extends Error {
    constructor(message: string) {
      super(message);
      this.name = "JWTExpired";
      Object.setPrototypeOf(this, JWTExpired.prototype);
    }
    static get [Symbol.hasInstance]() {
      return (instance: Error) => instance?.name === "JWTExpired";
    }
  }
  return { JWSInvalid, JWTExpired };
});

import { handleHttpError } from "@/lib/errorResponse";

describe("handleHttpError", () => {
  it("should handle HttpError correctly", async () => {
    const httpError = new HttpError(404, "Not Found");
    const response = handleHttpError(httpError);

    expect(response).toBeInstanceOf(MockNextResponse);
    expect(response.status).toBe(404);

    const data = await response.json();
    expect(data).toEqual({
      success: false,
      message: "Not Found",
      data: null,
    });
  });

  it("should handle JWSInvalid error correctly in development mode", async () => {
    const { JWSInvalid } = jest.requireMock("jose/errors");
    const jwsError = new JWSInvalid("Invalid JWT");
    const response = handleHttpError(jwsError);

    expect(response).toBeInstanceOf(MockNextResponse);
    expect(response.status).toBe(401);

    const data = await response.json();
    expect(data).toEqual({
      success: false,
      message: IS_DEV ? "Invalid JWT" : "Invalid token",
      data: null,
    });
  });

  it("should handle ZodError correctly in development mode", async () => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    });

    try {
      schema.parse({ name: 123, age: "invalid" });
    } catch (error) {
      const response = handleHttpError(error);

      expect(response).toBeInstanceOf(MockNextResponse);
      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data).toEqual({
        success: false,
        message: IS_DEV ? expect.any(String) : "Datos invalidos",
        data: null,
      });

      if (IS_DEV) {
        expect(data.message).toContain("Expected string");
        expect(data.message).toContain("Expected number");
      }
    }
  });

  it("should handle unknown errors correctly", async () => {
    const error = new Error("Unknown error occurred");
    const response = handleHttpError(error);

    expect(response).toBeInstanceOf(MockNextResponse);
    expect(response.status).toBe(500);

    const data = await response.json();
    expect(data).toEqual({
      success: false,
      message: "Unknown error occurred",
      data: null,
    });
  });

  it("should handle error without message correctly", async () => {
    const error = new Error();
    const response = handleHttpError(error);

    expect(response).toBeInstanceOf(MockNextResponse);
    expect(response.status).toBe(500);

    const data = await response.json();
    expect(data).toEqual({
      success: false,
      message: "Error desconocido",
      data: null,
    });
  });
});
