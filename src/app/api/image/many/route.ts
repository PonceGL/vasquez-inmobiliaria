import { NextRequest, NextResponse } from "next/server";

import { imageService } from "@/app/api/image/image.service";
import { isAuthenticated } from "@/lib/auth";
import { handleHttpError } from "@/lib/errorResponse";

export async function POST(request: NextRequest) {
  try {
    await isAuthenticated(request);
    const formData = await request.formData();
    const createdImage = await imageService.createMany(formData);

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