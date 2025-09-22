import { JWTPayload, jwtVerify } from "jose";
import { NextRequest } from "next/server";

import { IS_DEV } from "@/app/constants/enviroment";

import {
  AuthenticationError,
  InternalServerErrorException,
} from "../httpErrors";

export async function isAuthenticated(
  request: NextRequest
): Promise<{ payload: JWTPayload }> {
  const apiToken = process.env.API_TOKEN;
  if (!apiToken)
    throw new InternalServerErrorException(
      IS_DEV ? "API_TOKEN is not defined in environment variables" : "Internal server error"
    );
  const jwtSecretKey = process.env.SESSION_SECRET;
  if (!jwtSecretKey) {
    throw new InternalServerErrorException(
      IS_DEV
        ? "SESSION_SECRET is not defined in environment variables"
        : "Internal server error"
    );
  }
  const secret = new TextEncoder().encode(jwtSecretKey);
  const authHeader = request.headers.get("authorization");

  const token = authHeader?.split(" ")[1];
  if (!token) {
    throw new AuthenticationError("Authorization token is missing");
  }
  const { payload } = await jwtVerify(token, secret);

  return { payload };
}
