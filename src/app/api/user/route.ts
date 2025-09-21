import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { userService } from "./user.services";

export async function GET() {
  try {
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
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Datos invalidos para obtener los usuarios",
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

export async function POST(request: Request) {
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
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Datos inválidos para crear el usuario.",
          errors: error.issues,
        },
        { status: 400 }
      );
    }
    if (error instanceof Error && error.message.includes("ya está en uso")) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, message: (error as Error).message, data: null },
      { status: 500 }
    );
  }
}
