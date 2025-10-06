import { z } from "zod";

export const createAddressDto = z
  .object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),

    street: z.string().min(3, "La calle es requerida."),

    exteriorNumber: z
      .string()
      .min(1, "El número exterior es requerido (puede ser 's/n')."),

    interiorNumber: z.string().optional(),

    neighborhood: z.string().min(3, "La colonia es requerida.").optional(),

    postalCode: z
      .string()
      .regex(/^\d{5}$/, "El código postal debe ser de 5 dígitos numéricos.")
      .optional(),

    municipality: z.string().min(3, "El municipio o ciudad es requerido."),

    state: z.string().min(3, "El estado es requerido."),

    country: z.string().min(3, "El país es requerido.").default("México"),

    references: z.string().optional(),

    location: z.object({
      coordinates: z.tuple(
        [
          z
            .number()
            .min(-180, "Longitud inválida")
            .max(180, "Longitud inválida"),
          z.number().min(-90, "Latitud inválida").max(90, "Latitud inválida"),
        ],
        {
          message: "Las coordenadas [longitud, latitud] son requeridas.",
        }
      ),
    }),

    googleMapsUrl: z
      .string()
      .url("El enlace de Google Maps debe ser una URL válida.")
      .optional(),
    isMain: z.boolean().optional(),
  })
  .strict();

export type CreateAddressDto = z.infer<typeof createAddressDto>;

export const updateAddressDto = createAddressDto.partial();

export type UpdateAddressDto = z.infer<typeof updateAddressDto>;
