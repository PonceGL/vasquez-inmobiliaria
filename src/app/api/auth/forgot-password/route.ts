import { NextRequest, NextResponse } from 'next/server';

import { handleHttpError } from '@/app/lib/errorResponse';

import { loginService } from '../login.services';

export async function POST(request: NextRequest) {
   try {
      const body = await request.json();
      await loginService.forgotPassword(body);
      return NextResponse.json(
        {
          success: true,
          message: 'Si existe una cuenta con este correo, se ha enviado un enlace para restablecer la contraseña.',
          data: null,
        },
        { status: 200 }
      );
  
    } catch (error) {
      return handleHttpError(error);
    }
}