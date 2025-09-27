import z from "zod";

import { basePropertyDto, updateBasePropertyDto } from "./base.dto";

export const otherPropertyDto = basePropertyDto.extend({
  propertyType: z.literal('Otro'),
  features: z.array(z.object({
    key: z.string(),
    value: z.string(),
  })),
}).strict();

export const updateOtherPropertyDto = updateBasePropertyDto.partial().extend({
  propertyType: z.literal('Otro'),
  features: z.array(z.object({
    key: z.string(),
    value: z.string(),
  })).optional(),
}).strict();