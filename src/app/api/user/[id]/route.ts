import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { userService } from "../user.services";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
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

export async function PATCH(request: Request, { params }: Params) {
  try {
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
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Datos inválidos para actualizar el usuario.",
          errors: error.issues,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: (error as Error).message, data: null },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
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
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Datos invalidos para eliminar el usuario",
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
