import { NextRequest, NextResponse } from "next/server";

import { contactNumberService } from "@/app/api/contact/number/number.service";
import { isAuthenticated } from "@/lib/auth";
import { handleHttpError } from "@/lib/errorResponse";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
      await isAuthenticated(request);
      const { id } = await params;
    const number = await contactNumberService.getById(id);
    return NextResponse.json(
      {
        success: true,
        message: "Number successfully obtained",
        data: number,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleHttpError(error);      
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
      await isAuthenticated(request);
      const { id } = await params;
    const body = await request.json();
    const number = await contactNumberService.update(id, body);
    return NextResponse.json(
      {
        success: true,
        message: "Number successfully updated",
        data: number,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
      await isAuthenticated(request);
      const { id } = await params;
    const number = await contactNumberService.delete(id);
    return NextResponse.json(
      {
        success: true,
        message: "Number successfully deleted",
        data: number,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}
