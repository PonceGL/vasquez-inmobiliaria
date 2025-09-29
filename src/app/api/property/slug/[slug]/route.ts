import { NextRequest, NextResponse } from "next/server";

import { propertyService } from "@/app/api/property/property.service";
import { handleHttpError } from "@/lib/errorResponse";
import { getPropertyPopulateFields } from "@/lib/queryParams";
import { PROPERTY_POPULATE_FIELDS } from "@/types/property";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const populateFields = getPropertyPopulateFields(request);
    const { slug } = await params;
    const property = await propertyService.getBySlug(slug, populateFields as PROPERTY_POPULATE_FIELDS[]);
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