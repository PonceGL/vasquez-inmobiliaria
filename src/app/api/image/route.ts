import { NextRequest, NextResponse } from "next/server";

import { isAuthenticated } from "@/app/lib/auth";
import { handleHttpError } from "@/app/lib/errorResponse";

import { imageService } from "./image.services";

export async function GET(request: NextRequest) {
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
    return handleHttpError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await isAuthenticated(request);
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
    return handleHttpError(error);
  }
}
