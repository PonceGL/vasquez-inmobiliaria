import { NextRequest, NextResponse } from "next/server";

import { userService } from "@/app/api/user/user.service";
import { isAuthenticated } from "@/lib/auth";
import { handleHttpError } from "@/lib/errorResponse";
import { AuthorizationError } from "@/lib/httpErrors";
import { USER_ROLES } from "@/types/users";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { payload } = await isAuthenticated(request);
    if (payload.role !== USER_ROLES.ADMIN) {
      throw new AuthorizationError("Unauthorized");
    }
    const { id } = await params;
    const users = await userService.getById(id);
    return NextResponse.json(
      {
        success: true,
        message: "User successfully obtained",
        data: users,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { payload } = await isAuthenticated(request);
    if (payload.role !== USER_ROLES.ADMIN) {
      throw new AuthorizationError("Unauthorized");
    }
    const { id } = await params;
    const body = await request.json();
    const user = await userService.update(id, body);
    return NextResponse.json(
      {
        success: true,
        message: "User successfully updated",
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { payload } = await isAuthenticated(request);
    if (payload.role !== USER_ROLES.ADMIN) {
      throw new AuthorizationError("Unauthorized");
    }
    const { id } = await params;
    const users = await userService.delete(id);
    return NextResponse.json(
      {
        success: true,
        message: "User successfully deleted",
        data: users,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}
