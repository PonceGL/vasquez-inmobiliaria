import { NextResponse } from "next/server";

import { contactService } from "@/app/api/contact/contact.service";
import { handleHttpError } from "@/lib/errorResponse";

export async function GET() {
  try {
    const data = await contactService.getAll();
    return NextResponse.json(
      {
        success: true,
        message: "Contact info successfully obtained",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}