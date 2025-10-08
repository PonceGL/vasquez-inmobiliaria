import { NextRequest, NextResponse } from "next/server";

import { loginService } from "@/app/api/auth/login.service";
import { isAuthenticated } from "@/lib/auth";
import { handleHttpError } from "@/lib/errorResponse";
import { AuthorizationError } from "@/lib/httpErrors";
import { USER_ROLES } from "@/types/users";

export async function POST(request: NextRequest) {
  try {
    const { payload } = await isAuthenticated(request);
    if (payload.role !== USER_ROLES.ADMIN) {
      throw new AuthorizationError("Unauthorized");
    }
    const body = await request.json();
    const token = await loginService.createSignIn(body);
    return NextResponse.json(
      {
        success: true,
        message: "Sign in successful",
        data: token,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}
