import { NextRequest, NextResponse } from "next/server";

import { neighborhoodService } from "@/app/api/neighborhood/neighborhood.service";
import { handleHttpError } from "@/lib/errorResponse";
import { getPropertyPopulateFields } from "@/lib/queryParams";
import { NEIGHBORHOOD_POPULATE_FIELDS } from "@/types/neighborhood";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const populateFields = getPropertyPopulateFields<NEIGHBORHOOD_POPULATE_FIELDS>(
      "neighborhood",
      request
    );
    const { slug } = await params;
    const neighborhood = await neighborhoodService.getBySlug(slug, populateFields);
    return NextResponse.json(
      {
        success: true,
        message: "Neighborhood successfully obtained",
        data: neighborhood,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}