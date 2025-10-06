import z from "zod";

export const createContactNumberDto = z
  .object({
    label: z.string().min(1, "La etiqueta es requerida."),
    phone: z
      .string()
      .min(1, "El número de teléfono es requerido.")
      .max(10, "El número de teléfono es muy largo."),
    hasWhatsApp: z.boolean().optional().default(false),
    isMainWhatsApp: z.boolean().optional().default(false),
    isMainCall: z.boolean().optional().default(false),
  })
  .strict()
  .refine(
    (data) => {
      if (data.isMainWhatsApp === true && data.hasWhatsApp === false) {
        return false;
      }
      return true;
    },
    {
      message:
        "No se puede establecer un número como principal de WhatsApp si no tiene WhatsApp habilitado.",
      path: ["isMainWhatsApp"],
    }
  );

export type CreateContactNumberDto = z.infer<typeof createContactNumberDto>;

export const updateContactNumberDto = createContactNumberDto.partial();

export type UpdateContactNumberDto = z.infer<typeof updateContactNumberDto>;
