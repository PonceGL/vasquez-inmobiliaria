import z from "zod";

import { basePropertyDto, updateBasePropertyDto } from "./base.dto";

export const landDto = basePropertyDto
  .extend({
    propertyType: z.literal("terreno"),
    frontageMeters: z.number().positive().optional(),
    depthMeters: z.number().positive().optional(),
    topography: z
      .enum(["plano", "ascendente", "descendente", "irregular"])
      .optional(),
    hasServices: z.boolean().default(false),
    plotSize: z.number().min(0, "El tamaño del terreno no puede ser negativo."),
  })
  .strict();

export const updateLandDto = updateBasePropertyDto
  .extend({
    propertyType: z.literal("terreno"),
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