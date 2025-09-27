import z from "zod";

import { basePropertyDto, updateBasePropertyDto } from "./base.dto";

export const landDto = basePropertyDto.extend({
  propertyType: z.literal('Terreno'),
  landSqMeters: z.number().positive(),
  frontageMeters: z.number().positive().optional(),
  depthMeters: z.number().positive().optional(),
  topography: z.enum(['Plano', 'Ascendente', 'Descendente', 'Irregular']).optional(),
  hasServices: z.boolean().default(false),
}).strict();

export const updateLandDto = updateBasePropertyDto.extend({
  propertyType: z.literal('Terreno'),
  landSqMeters: z.number().positive().optional(),
  frontageMeters: z.number().positive().optional(),
  depthMeters: z.number().positive().optional(),
  topography: z.enum(['Plano', 'Ascendente', 'Descendente', 'Irregular']).optional(),
  hasServices: z.boolean().default(false),
}).strict();