import { NextRequest, NextResponse } from "next/server";

import { isAuthenticated } from "@/app/lib/auth";
import { handleHttpError } from "@/app/lib/errorResponse";

import { userService } from "../user.services";

interface Params {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    await isAuthenticated(request);
    const users = await userService.getById(params.id);
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
    await isAuthenticated(request);
    const body = await request.json();
    const user = await userService.update(params.id, body);
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
    await isAuthenticated(request);
    const users = await userService.delete(params.id);
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
