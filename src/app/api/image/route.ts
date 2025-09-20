import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { imageService } from "./image.services";

export async function GET() {
  try {
    const images = await imageService.getAll();
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

    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const createdImage = await imageService.create(formData);

    return NextResponse.json(
      {
        success: true,
        message: "Imagen creada exitosamente",
        data: createdImage,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
