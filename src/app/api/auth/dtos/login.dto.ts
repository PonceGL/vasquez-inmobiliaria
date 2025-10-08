import z from "zod";

export const logInSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Por favor, introduce un correo válido." }),
    password: z
      .string()
      .min(1, { message: "La contraseña no puede estar vacía." }),
  })
  .strict();

export const signInSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Por favor, introduce un correo válido." }),
    password: z
      .string()
      .min(1, { message: "La contraseña no puede estar vacía." }),
    newName: z.string("El nombre del nuevo usuario es requerido").min(3),
    newEmail: z.string().email({
      message: "Por favor, introduce un correo válido, para el nuevo usuario.",
    }),
  })
  .strict();

export type LogInDto = z.infer<typeof logInSchema>;
export type SignInDto = z.infer<typeof signInSchema>;
