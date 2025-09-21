import bcrypt from "bcrypt";

/**
 * Genera un hash de una contraseña en texto plano.
 * Utiliza un "salt" para asegurar que contraseñas idénticas resulten en hashes diferentes.
 * @param password La contraseña en texto plano a hashear.
 * @returns Una promesa que se resuelve con la contraseña hasheada.
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

/**
 * Compara una contraseña en texto plano con un hash existente.
 * @param plainPassword La contraseña en texto plano enviada por el usuario (ej. en el login).
 * @param hashedPassword El hash guardado en la base de datos.
 * @returns Una promesa que se resuelve a `true` si las contraseñas coinciden, `false` en caso contrario.
 */
export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};
