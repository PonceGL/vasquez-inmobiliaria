import z from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Por favor, introduce un correo válido.' }),
}).strict();

export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;