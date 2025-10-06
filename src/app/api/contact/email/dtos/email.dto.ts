import z from "zod";

export const createContactEmailDto = z
  .object({
    label: z.string().min(1, "La etiqueta es requerida."),
    email: z.email("El email es invalido").min(3, {
      message: "El email es requerido",
    }),
    isMain: z.boolean().optional(),
  })
  .strict();

export type CreateContactEmailDto = z.infer<typeof createContactEmailDto>;

export const updateContactEmailDto = createContactEmailDto.partial();

export type UpdateContactEmailDto = z.infer<typeof updateContactEmailDto>;
