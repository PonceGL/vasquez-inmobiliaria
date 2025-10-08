import z from "zod";

export const createNeighborhoodDto = z
  .object({
    name: z.string().min(1, "El título es obligatorio."),
    slogan: z.string().optional(),
    description: z.string().min(1, "La descripción es obligatoria."),
    moreInformation: z.string().optional(),
    priceBySqMeters: z.object({
      value: z.number().positive("El precio debe ser positivo."),
      currency: z.string().default("MXN"),
    }),
    location: z.object({
      coordinates: z.tuple([z.number(), z.number()]),
      address: z.string().min(1, "La dirección es obligatoria."),
      city: z.string().min(1, "La ciudad es obligatoria."),
      state: z.string().min(1, "El estado es obligatorio."),
      zipCode: z.string().optional(),
    }),
    logo: z.string().optional(),
    mainImage: z.string("El ID de la imagen principal no es válido."),
    images: z.array(z.string()).default([]),
    agent: z.string("El ID del agente no es válido."),
    properties: z.array(z.string()).default([]),
    neighborhoodType: z
      .string("El tipo de vecindario es obligatorio.")
      .nonempty(),
    sizeLandsRange: z.tuple([z.number(), z.number()]),
    availableLands: z
      .number()
      .positive("El número de terrenos disponibles es obligatorio."),
    priceRange: z.tuple([z.number(), z.number()]),
    features: z.array(z.string()).optional(),
    services: z.array(z.string()).optional(),
    benefits: z.array(z.string()).optional(),
    draft: z.boolean().default(true),
    hidePrice: z.boolean().default(false),
  })
  .strict();

export type CreateNeighborhoodDto = z.infer<typeof createNeighborhoodDto>;

export const updateNeighborhoodDto = createNeighborhoodDto.partial();

export type UpdateNeighborhoodDto = z.infer<typeof updateNeighborhoodDto>;
