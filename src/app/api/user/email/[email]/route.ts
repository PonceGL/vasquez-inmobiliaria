import { NextRequest, NextResponse } from "next/server";

import { userService } from "@/app/api/user/user.service";
import { isAuthenticated } from "@/lib/auth";
import { handleHttpError } from "@/lib/errorResponse";

export async function POST(request: NextRequest) {
  try {
    await isAuthenticated(request);
    const body = await request.json();
    const user = await userService.getByEmail(body);
    return NextResponse.json(
      {
        success: true,
        message: "User successfully obtained",
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}
