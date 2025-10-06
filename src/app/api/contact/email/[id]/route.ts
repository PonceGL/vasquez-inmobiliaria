import { NextRequest, NextResponse } from "next/server";

import { contactEmailService } from "@/app/api/contact/email/email.service";
import { isAuthenticated } from "@/lib/auth";
import { handleHttpError } from "@/lib/errorResponse";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    await isAuthenticated(request);
    const { id } = await params;
    const email = await contactEmailService.getById(id);
    return NextResponse.json(
      {
        success: true,
        message: "Email successfully obtained",
        data: email,
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
    const email = await contactEmailService.update(id, body);
    return NextResponse.json(
      {
        success: true,
        message: "Email successfully updated",
        data: email,
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
    const email = await contactEmailService.delete(id);
    return NextResponse.json(
      {
        success: true,
        message: "Email successfully deleted",
        data: email,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}
