import z from "zod";

import { basePropertyDto, updateBasePropertyDto } from "./base.dto";

export const houseDto = basePropertyDto.extend({
  propertyType: z.literal('Casa'),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  garageSpaces: z.number().int().min(0).default(0),
  constructionSqMeters: z.number().positive(),
  landSqMeters: z.number().positive().optional(),
}).strict();

export const updateHouseDto = updateBasePropertyDto.extend({
  propertyType: z.literal('Casa'),
  bedrooms: z.number().int().min(0).optional(),
  bathrooms: z.number().int().min(0).optional(),
  garageSpaces: z.number().int().min(0).default(0).optional(),
  constructionSqMeters: z.number().positive().optional(),
  landSqMeters: z.number().positive().optional(),
}).strict();