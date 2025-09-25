import { NextRequest, NextResponse } from 'next/server';

import { handleHttpError } from '@/app/lib/errorResponse';

import { loginService } from '../login.services';

export async function POST(request: NextRequest) {
   try {
      const body = await request.json();
      const { message } = await loginService.forgotPassword(body);
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