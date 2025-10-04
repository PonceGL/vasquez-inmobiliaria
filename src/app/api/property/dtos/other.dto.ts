import z from "zod";

import { basePropertyDto, updateBasePropertyDto } from "./base.dto";

export const otherPropertyDto = basePropertyDto
  .extend({
    propertyType: z.literal("otro"),
    features: z
      .array(
        z.object({
          key: z.string(),
          value: z.string(),
        })
      )
      .optional(),
    frontageMeters: z.number().positive().optional(),
    depthMeters: z.number().positive().optional(),
    topography: z
      .enum(["plano", "ascendente", "descendente", "irregular"])
      .optional(),
    hasServices: z.boolean().default(false).optional(),
    plotSize: z
      .number()
      .min(0, "El tamaño del terreno no puede ser negativo.")
      .optional(),
  })
  .strict();

export const updateOtherPropertyDto = updateBasePropertyDto
  .partial()
  .extend({
    propertyType: z.literal("otro"),
    features: z
      .array(
        z.object({
          key: z.string(),
          value: z.string(),
        })
      )
      .optional(),
    frontageMeters: z.number().positive().optional(),
    depthMeters: z.number().positive().optional(),
    topography: z
      .enum(["plano", "ascendente", "descendente", "irregular"])
      .optional(),
    hasServices: z.boolean().default(false).optional(),
    plotSize: z
      .number()
      .min(0, "El tamaño del terreno no puede ser negativo.")
      .optional(),
  })
  .strict();