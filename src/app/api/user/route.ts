import { NextRequest, NextResponse } from "next/server";

import { userService } from "@/app/api/user/user.service";
import { isAuthenticated } from "@/lib/auth";
import { handleHttpError } from "@/lib/errorResponse";
import { AuthorizationError } from "@/lib/httpErrors";
import { USER_ROLES } from "@/types/users";

export async function GET(request: NextRequest) {
  try {
    const { payload } = await isAuthenticated(request);
    if (payload.role !== USER_ROLES.ADMIN) {
      throw new AuthorizationError("Unauthorized");
    }

    const users = await userService.getAll();
    return NextResponse.json(
      {
        success: true,
        message: "Users successfully obtained",
        data: users,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { payload } = await isAuthenticated(request);
    if (payload.role !== USER_ROLES.ADMIN) {
      throw new AuthorizationError("Unauthorized");
    }
    const body = await request.json();
    const newUser = await userService.create(body);
    return NextResponse.json(
      {
        success: true,
        message: "User successfully created",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}
