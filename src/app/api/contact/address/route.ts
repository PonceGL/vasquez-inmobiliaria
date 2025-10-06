import { NextRequest, NextResponse } from "next/server";

import { addressService } from "@/app/api/contact/address/address.service";
import { isAuthenticated } from "@/lib/auth";
import { handleHttpError } from "@/lib/errorResponse";

export async function GET() {
  try {
    const addresses = await addressService.getAll();
    return NextResponse.json(
      {
        success: true,
        message: "Addresses successfully obtained",
        data: addresses,
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
    const body = await request.json();
    const newAddress = await addressService.create(body);
    return NextResponse.json(
      {
        success: true,
        message: "Address successfully created",
        data: newAddress,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}