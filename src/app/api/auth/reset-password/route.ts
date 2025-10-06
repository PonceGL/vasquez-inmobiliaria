import { NextRequest, NextResponse } from 'next/server';

import { handleHttpError } from "@/lib/errorResponse";

import { loginService } from "../login.service";

export async function POST(request: NextRequest) {
   try {
      const body = await request.json();
       const { message } = await loginService.resetPassword(body);
      return NextResponse.json(
        {
          success: true,
          message: message,
          data: null,
        },
        { status: 200 }
      );
  
    } catch (error) {
      return handleHttpError(error);
    }
}