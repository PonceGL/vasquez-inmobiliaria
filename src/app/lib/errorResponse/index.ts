import { JWSInvalid } from "jose/errors";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { IS_DEV } from "@/app/constants/enviroment";

import { HttpError } from "../httpErrors";

export function handleHttpError(error: unknown) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
          data: null,
        },
        { status: error.statusCode }
      );

    }
    if (error instanceof JWSInvalid) {
      return NextResponse.json(
        {
          success: false,
          message: IS_DEV ? error.message : "Invalid token",
          data: null,
        },
        { status: 401 }
      );
    }
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: IS_DEV ? (error.issues.map((issue) => issue.message).join(", ") ?? error.message) : "Datos invalidos",
          data: null,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message ?? "Error desconocido",
        data: null,
      },
      { status: 500 }
    );
  
}
