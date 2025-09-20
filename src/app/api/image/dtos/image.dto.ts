import { z } from "zod";

export const uploadImageDto = z.object({
  file: z.file("El archivo es necesario"),
  alt: z.string("El texto alternativo es requerido.").min(5, {
    message: "El texto alternativo debe tener al menos 5 caracteres.",
  }),
});

export const createImageDto = z.object({
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
});

export type UploadImageDto = z.infer<typeof uploadImageDto>;

export type CreateImageDto = z.infer<typeof createImageDto>;

export const updateImageDto = createImageDto.partial();

export type UpdateImageDto = z.infer<typeof updateImageDto>;
