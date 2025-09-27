import { NextRequest } from "next/server";

import { PROPERTY_POPULATE_FIELDS } from "@/types/property";

const ALLOWED_POPULATE_FIELDS = Object.values(PROPERTY_POPULATE_FIELDS);

export function getPropertyPopulateFields(request: NextRequest): PROPERTY_POPULATE_FIELDS[] {
  const { searchParams } = new URL(request.url);
  const populateParam = searchParams.get('populate');
  if (!populateParam) return []

  const fields = populateParam.split(',');

  return fields.filter(
    (field): field is PROPERTY_POPULATE_FIELDS =>
      ALLOWED_POPULATE_FIELDS.includes(field as PROPERTY_POPULATE_FIELDS)
  );
}