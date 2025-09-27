import { JWSInvalid, JWTExpired } from "jose/errors";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { IS_DEV } from "@/constants/enviroment";
import { HttpError } from "@/lib/httpErrors";

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
  if (error instanceof JWSInvalid || error instanceof JWTExpired) {
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
    const issues = error.issues.map((issue) => ({
      [issue.path.map((p) => p.toString()).join(".")]: issue.message,
    }));

    return NextResponse.json(
      {
        success: false,
        message: "Datos invalidos",
        data: IS_DEV ? issues : null,
      },
      { status: 400 }
    );
  }
  return NextResponse.json(
    {
      success: false,
      message: (error as Error).message || "Error desconocido",
      data: null,
    },
    { status: 500 }
  );
}
