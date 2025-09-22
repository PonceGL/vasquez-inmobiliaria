import z from "zod";

export const findUserByEmailDto = z
  .object({
    email: z.email("El email es invalido").min(3, {
      message: "El email es requerido",
    }),
  })
  .strict();

export const createUserDto = z
  .object({
    name: z.string("El nombre es requerido").min(3),
    email: z.email("El email es invalido").min(3, {
      message: "El email es requerido",
    }),
    password: z.string("La password es requerido").min(8, {
      message: "La contraseña debe tener almenos 8 caracteres",
    }),
    role: z.enum(["admin", "dev", "collaborator", "editor"], {
      error: "El tipo de rol es requerido y debe ser uno valido",
    }),
    verified: z.boolean("El status verified es requerido"),
  })
  .strict();

export type CreateUserDto = z.infer<typeof createUserDto>;
export type FindUserByEmailDto = z.infer<typeof findUserByEmailDto>;
export const updateUserDto = createUserDto.partial();
export type UpdateUserDto = z.infer<typeof updateUserDto>;
