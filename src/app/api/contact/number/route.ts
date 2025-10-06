import { NextRequest, NextResponse } from "next/server";

import { contactNumberService } from "@/app/api/contact/number/number.service";
import { isAuthenticated } from "@/lib/auth";
import { handleHttpError } from "@/lib/errorResponse";

export async function GET() {
  try {
    const numbers = await contactNumberService.getAll();
    return NextResponse.json(
      {
        success: true,
        message: "Contact info successfully obtained",
        data: numbers,
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
    const newNumber = await contactNumberService.create(body);
    return NextResponse.json(
      {
        success: true,
        message: "Number successfully created",
        data: newNumber,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}