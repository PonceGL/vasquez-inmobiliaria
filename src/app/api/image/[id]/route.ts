import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { isAuthenticated } from "@/app/lib/auth";

import { imageService } from "../image.services";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const images = await imageService.getById(id);
    return NextResponse.json(
      {
        success: true,
        message: "Images successfully obtained",
        data: images,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Datos invalidos para obtener las imagenes",
          errors: error?.issues,
        },
        { status: 400 }
      );
    }

    const errorMessage = (error as Error).message;
    const status = errorMessage === "Imagen no encontrada." ? 404 : 400;
    return NextResponse.json({ message: errorMessage }, { status });
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    await isAuthenticated(request);
    const body = await request.json();
    const updatedProperty = await imageService.update(id, body);
    return NextResponse.json(
      {
        success: true,
        message: "Images successfully updated",
        data: updatedProperty,
      },
      { status: 202 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Datos invalidos para actualizar la imagen",
          errors: error?.issues,
        },
        { status: 304 }
      );
    }

    const errorMessage = (error as Error).message;
    const status = errorMessage === "Imagen no encontrada." ? 404 : 400;
    return NextResponse.json({ message: errorMessage }, { status });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    await isAuthenticated(request);
    const updatedProperty = await imageService.delete(id);
    return NextResponse.json(
      {
        success: true,
        message: "Images successfully deleted",
        data: updatedProperty,
      },
      { status: 202 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Datos invalidos para eliminar la imagen",
          errors: error?.issues,
        },
        { status: 400 }
      );
    }

    const errorMessage = (error as Error).message;
    const status = errorMessage === "Imagen no encontrada." ? 404 : 400;
    return NextResponse.json({ message: errorMessage }, { status });
  }
}
