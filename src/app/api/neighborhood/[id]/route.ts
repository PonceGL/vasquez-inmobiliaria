import { NextRequest, NextResponse } from "next/server";

import { neighborhoodService } from "@/app/api/neighborhood/neighborhood.service";
import { isAuthenticated } from "@/lib/auth";
import { handleHttpError } from "@/lib/errorResponse";
import { getPropertyPopulateFields } from "@/lib/queryParams";
import { NEIGHBORHOOD_POPULATE_FIELDS } from "@/types/neighborhood";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const populateFields =
      getPropertyPopulateFields<NEIGHBORHOOD_POPULATE_FIELDS>(
        "neighborhood",
        request
      );
    const { id } = await params;
    const neighborhood = await neighborhoodService.getById(id, populateFields);
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

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    await isAuthenticated(request);
    const { id } = await params;
    const body = await request.json();
    const neighborhood = await neighborhoodService.update(id, body);
    return NextResponse.json(
      {
        success: true,
        message: "Neighborhood successfully updated",
        data: neighborhood,
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
    const neighborhood = await neighborhoodService.delete(id);
    return NextResponse.json(
      {
        success: true,
        message: "Neighborhood successfully deleted",
        data: neighborhood,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}
