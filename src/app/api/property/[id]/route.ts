import { NextRequest, NextResponse } from "next/server";

import { propertyService } from "@/app/api/property/property.service";
import { isAuthenticated } from "@/lib/auth";
import { handleHttpError } from "@/lib/errorResponse";
import { getPropertyPopulateFields } from "@/lib/queryParams";
import { PROPERTY_POPULATE_FIELDS } from "@/types/property";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const populateFields = getPropertyPopulateFields(request);
    const { id } = await params;
    const property = await propertyService.getById(id, populateFields as PROPERTY_POPULATE_FIELDS[]);
    return NextResponse.json(
      {
        success: true,
        message: "Property successfully obtained",
        data: property,
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
    const property = await propertyService.update(id, body);
    return NextResponse.json(
      {
        success: true,
        message: "Property successfully updated",
        data: property,
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
    const property = await propertyService.delete(id);
    return NextResponse.json(
      {
        success: true,
        message: "Property successfully deleted",
        data: property,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}
