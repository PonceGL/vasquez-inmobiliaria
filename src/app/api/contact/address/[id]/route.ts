import { NextRequest, NextResponse } from "next/server";

import { addressService } from "@/app/api/contact/address/address.service";
import { isAuthenticated } from "@/lib/auth";
import { handleHttpError } from "@/lib/errorResponse";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    await isAuthenticated(request);
    const { id } = await params;
    const address = await addressService.getById(id);
    return NextResponse.json(
      {
        success: true,
        message: "Address successfully obtained",
        data: address,
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
    const address = await addressService.update(id, body);
    return NextResponse.json(
      {
        success: true,
        message: "Address successfully updated",
        data: address,
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
    const address = await addressService.delete(id);
    return NextResponse.json(
      {
        success: true,
        message: "Address successfully deleted",
        data: address,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}
