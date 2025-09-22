import { NextRequest, NextResponse } from "next/server";

import { isAuthenticated } from "@/app/lib/auth";
import { handleHttpError } from "@/app/lib/errorResponse";
import { AuthorizationError } from "@/app/lib/httpErrors";
import { USER_ROLES } from "@/app/types/users";

import { userService } from "./user.services";

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
