import { z } from "zod";

const MAX_FILE_SIZE_MB = 1;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const imageFileSchema = z
  .instanceof(File, { message: "El archivo es requerido." })
  .refine(
    (file) => file.size <= MAX_FILE_SIZE_BYTES,
    `El tamaño máximo por imagen es de ${MAX_FILE_SIZE_MB}MB.`
  )
  .refine(
    (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
    "Formato de imagen no válido. Solo se aceptan .jpg, .jpeg, .png y .webp"
  );

export const createImageFromFormDataDto = z.object({
  file: imageFileSchema,
  alt: z.string().min(1, "El texto alternativo es requerido."),
  folder: z.string().optional(),
});

export const createManyImagesDto = z
  .object({
    files: z
      .array(imageFileSchema)
      .nonempty("Debes subir al menos una imagen."),
    alts: z
      .array(z.string().min(1, "Cada imagen debe tener un texto alternativo."))
      .nonempty("Debes proporcionar al menos un texto alternativo."),
    folder: z.string().min(1, "La carpeta es requerida."),
  })
  .refine((data) => data.files.length === data.alts.length, {
    message:
      "El número de imágenes debe coincidir con el número de textos alternativos.",
    path: ["alts"],
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
