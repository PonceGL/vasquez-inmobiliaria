import { JWTPayload, jwtVerify } from "jose";
import { NextRequest } from "next/server";

import { env } from "@/config/env";
import { AuthenticationError } from "@/lib/httpErrors";

export async function isAuthenticated(
  request: NextRequest
): Promise<{ payload: JWTPayload }> {
  const authHeader = request.headers.get("authorization");

  const token = authHeader?.split(" ")[1];
  if (!token) {
    throw new AuthenticationError("Authorization token is missing");
  }
  const secret = new TextEncoder().encode(env.SESSION_SECRET);
  const { payload } = await jwtVerify(token, secret);

  return { payload };
}
