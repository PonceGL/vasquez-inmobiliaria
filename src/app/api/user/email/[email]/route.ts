import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { userService } from "../../user.services";

interface Params {
  params: { email: string };
}

export async function POST(request: Request, { params }: Params) {
  try {
    const body = await request.json();
    const user = await userService.getByEmail(params.email, body);
    return NextResponse.json(
      {
        success: true,
        message: "User successfully obtained",
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Datos invalidos para obtener el usuario",
          data: null,
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { success: false, message: (error as Error).message, data: null },
      { status: 500 }
    );
  }
}
