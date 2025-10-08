import { NextRequest } from "next/server";

import { NEIGHBORHOOD_POPULATE_FIELDS } from "@/types/neighborhood";
import { PROPERTY_POPULATE_FIELDS } from "@/types/property";

type ForPopulate = "property" | "neighborhood";

export function getPropertyPopulateFields<T>(
  forPopulate: ForPopulate,
  request: NextRequest
): T[] {
  const ALLOWED_POPULATE_FIELDS =
    Object.values(
      forPopulate === "property"
        ? PROPERTY_POPULATE_FIELDS
        : NEIGHBORHOOD_POPULATE_FIELDS
    ) || [];

  const { searchParams } = new URL(request.url);
  const populateParam = searchParams.get("populate");
  if (!populateParam) return [];

  const fields = populateParam.split(",");

  return fields.filter((field) =>
    ALLOWED_POPULATE_FIELDS.includes(field as T)
  ) as T[];
}
