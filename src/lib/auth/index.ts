import { JWTPayload, jwtVerify } from "jose";
import { JWTExpired } from "jose/errors";
import { NextRequest } from "next/server";

import { env } from "@/config/env";
import { JWT_ALGORITHM } from "@/constants/auth";
import { IS_DEV } from "@/constants/enviroment";
import { AuthenticationError } from "@/lib/httpErrors";

export async function isAuthenticated(
  request: NextRequest
): Promise<{ payload: JWTPayload }> {
  try {
    const authHeader = request.headers.get("authorization");

    const token = authHeader?.split(" ")[1];
    if (!token) {
      throw new AuthenticationError("Authorization token is missing");
    }
    const secret = new TextEncoder().encode(env.SESSION_SECRET);
    const { payload } = await jwtVerify(token, secret, {
      algorithms: [JWT_ALGORITHM],
    });

    return { payload };
  } catch (error) {
    throw new AuthenticationError(
      `Invalid authorization token${
        IS_DEV ? `: ${(error as JWTExpired)?.code}` : "."
      }`
    );
  }
}
