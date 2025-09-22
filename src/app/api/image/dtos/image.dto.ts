import { z } from "zod";

export const createImageFromFormDataDto = z.object({
  file: z.instanceof(File, { message: "El archivo es requerido." }),
  alt: z.string().min(1, "El texto alternativo es requerido."),
  folder: z.string().optional(),
});

export const createImageDto = z
  .object({
    url: z
      .string("La URL de la imagen es requerida.")
      .url({ message: "La URL no es válida." }),
    asset_id: z.string("El ID del asset de la imagen es requerido."),
    public_id: z.string("El ID público de la imagen es requerido."),
    folder: z.string("El nombre del folder de la imagen es requerido."),
    alt: z.string("El texto alternativo es requerido.").min(5, {
      message: "El texto alternativo debe tener al menos 5 caracteres.",
    }),

    width: z.number().positive(),

    height: z.number().positive(),
  })
  .strict();

export type CreateImageFromFormDataDto = z.infer<
  typeof createImageFromFormDataDto
>;

export type CreateImageDto = z.infer<typeof createImageDto>;

export const updateImageDto = createImageDto.partial();

export type UpdateImageDto = z.infer<typeof updateImageDto>;
