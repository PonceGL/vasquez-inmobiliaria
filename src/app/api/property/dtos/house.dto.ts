import z from "zod";

import { basePropertyDto, updateBasePropertyDto } from "./base.dto";

export const houseDto = basePropertyDto
  .extend({
    propertyType: z.literal("casa"),
    constructionSqMeters: z.number().positive(),
    floors: z.number().int().min(0).positive(),
    bedrooms: z.number().int().min(0),
    bathrooms: z.number().int().min(0),
    garageSpaces: z.number().int().min(0).default(0),
    features: z.array(z.string()).default([]),
    preservation: z
      .string()
      .min(1, "El estado de conservación es obligatorio."),
    age: z.number().min(0).default(0),
    plotSize: z
      .number()
      .min(0, "El tamaño del terreno no puede ser negativo.")
      .default(0),
  })
  .strict();

export const updateHouseDto = updateBasePropertyDto
  .extend({
    propertyType: z.literal("casa"),
    constructionSqMeters: z.number().positive().optional(),
    floors: z.number().positive().optional(),
    bedrooms: z.number().int().min(0).optional(),
    bathrooms: z.number().int().min(0).optional(),
    garageSpaces: z.number().int().min(0).default(0).optional(),
    features: z.array(z.string()).optional(),
    preservation: z
      .string()
      .min(1, "El estado de conservación es obligatorio.")
      .optional(),
    age: z.number().min(0).optional(),
    plotSize: z
      .number()
      .min(0, "El tamaño del terreno no puede ser negativo.")
      .default(0)
      .optional(),
  })
  .strict();