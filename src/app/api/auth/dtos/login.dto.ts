import z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: 'Por favor, introduce un correo válido.' }),
  password: z.string().min(1, { message: 'La contraseña no puede estar vacía.' }),
}).strict();

export type LoginDto = z.infer<typeof loginSchema>;