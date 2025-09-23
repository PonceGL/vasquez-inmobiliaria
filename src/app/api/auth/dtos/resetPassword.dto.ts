import z from "zod";

export const resetPasswordSchema = z.object({
  token: z.string().min(1, { message: 'El token es requerido.' }),
  password: z.string().min(8, { message: 'La nueva contraseña debe tener al menos 8 caracteres.' }),
  confirmPassword: z.string()
}).strict().refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"],
});


export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;