import { NextRequest, NextResponse } from 'next/server';

import { loginService } from "@/app/api/auth/login.service";
import { handleHttpError } from "@/lib/errorResponse";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = await loginService.createLogin(body);
    return NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        data: token,
      },
      { status: 200 }
    );

  } catch (error) {
    return handleHttpError(error);
  }
}