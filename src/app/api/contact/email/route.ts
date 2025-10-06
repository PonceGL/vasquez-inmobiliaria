import { NextRequest, NextResponse } from "next/server";

import { contactEmailService } from "@/app/api/contact/email/email.service";
import { isAuthenticated } from "@/lib/auth";
import { handleHttpError } from "@/lib/errorResponse";

export async function GET() {
  try {
    const emails = await contactEmailService.getAll();
    return NextResponse.json(
      {
        success: true,
        message: "Email successfully obtained",
        data: emails,
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
    const newEmail = await contactEmailService.create(body);
    return NextResponse.json(
      {
        success: true,
        message: "Email successfully created",
        data: newEmail,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}