import { NextRequest, NextResponse } from "next/server";

import { propertyService } from "@/app/api/property/property.service";
import { isAuthenticated } from "@/lib/auth";
import { handleHttpError } from "@/lib/errorResponse";
import { getPropertyPopulateFields } from "@/lib/queryParams";
import { PROPERTY_POPULATE_FIELDS } from "@/types/property";

export async function GET(request: NextRequest) {
  try {
    const populateFields = getPropertyPopulateFields(request);
    const properties = await propertyService.getAll(populateFields as PROPERTY_POPULATE_FIELDS[]);
    return NextResponse.json(
      {
        success: true,
        message: "Properties successfully obtained",
        data: properties,
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
    const newProperty = await propertyService.create(body);
    return NextResponse.json(
      {
        success: true,
        message: "Property successfully created",
        data: newProperty,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}