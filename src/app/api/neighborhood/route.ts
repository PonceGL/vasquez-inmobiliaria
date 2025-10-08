import { NextRequest, NextResponse } from "next/server";

import { neighborhoodService } from "@/app/api/neighborhood/neighborhood.service";
import { isAuthenticated } from "@/lib/auth";
import { handleHttpError } from "@/lib/errorResponse";
import { getPropertyPopulateFields } from "@/lib/queryParams";
import { NEIGHBORHOOD_POPULATE_FIELDS } from "@/types/neighborhood";

export async function GET(request: NextRequest) {
  try {
    const populateFields = getPropertyPopulateFields<NEIGHBORHOOD_POPULATE_FIELDS>("neighborhood", request);
    const neighborhoods = await neighborhoodService.getAll(populateFields);
    return NextResponse.json(
      {
        success: true,
        message: "Neighborhoods successfully obtained",
        data: neighborhoods,
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
    const newNeighborhood = await neighborhoodService.create(body);
    return NextResponse.json(
      {
        success: true,
        message: "Neighborhood successfully created",
        data: newNeighborhood,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}