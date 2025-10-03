import { z } from "zod";

export const basePropertyDto = z
  .object({
    title: z.string().min(1, "El título es obligatorio."),
    description: z.string().min(1, "La descripción es obligatoria."),
    price: z.object({
      value: z.number().positive("El precio debe ser positivo."),
      currency: z.string().default("MXN"),
    }),
    transactionType: z.enum(["venta", "renta"]),
    location: z.object({
      coordinates: z.tuple([z.number(), z.number()]), // [longitud, latitud]
      address: z.string().min(1, "La dirección es obligatoria."),
      city: z.string().min(1, "La ciudad es obligatoria."),
      state: z.string().min(1, "El estado es obligatorio."),
      zipCode: z.string().optional(),
    }),
    mainImage: z.string("El ID de la imagen principal no es válida."),
    images: z.array(z.string()),
    agent: z.string(),
    status: z.enum(["active", "process", "sold"]),
    draft: z.boolean().default(true),
    hidePrice: z.boolean().default(false),
  })
  .strict();

export const updateBasePropertyDto = basePropertyDto
  .partial()
  .omit({ location: true })
  .extend({
    location: basePropertyDto.shape.location.partial().optional()
  });
