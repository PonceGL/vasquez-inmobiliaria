import { NextRequest, NextResponse } from "next/server";

import { imageService } from "@/app/api/image/image.service";
import { isAuthenticated } from "@/lib/auth";
import { handleHttpError } from "@/lib/errorResponse";

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
    return handleHttpError(error);
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
    return handleHttpError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await isAuthenticated(request);
    const { id } = await params;
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
    return handleHttpError(error);
  }
}
