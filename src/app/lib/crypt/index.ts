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

/**
 * Genera una clave criptográfica a partir de una contraseña utilizando PBKDF2 y AES-GCM.
 * 
 * @param password - La contraseña que se utilizará para generar la clave
 * @returns Una Promise que resuelve a un objeto CryptoKey para operaciones de encriptación/desencriptación
 * 
 * @example
 * ```typescript
 * // Generar una clave a partir de una contraseña
 * const password = "miContraseñaSegura123";
 * const key = await generateKey(password);
 * // La clave generada puede usarse para encriptar/desencriptar datos
 * ```
 * 
 * @remarks
 * - Utiliza PBKDF2 (Password-Based Key Derivation Function 2) para derivar la clave
 * - Implementa SHA-256 como función hash
 * - Usa 100,000 iteraciones para mayor seguridad
 * - Genera una clave AES-GCM de 256 bits
 */
async function generateKey(password: string): Promise<CryptoKey> {
  const passwordBuffer = new TextEncoder().encode(password);
  const salt = crypto.getRandomValues(new Uint8Array(16));
  
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );

  return crypto.subtle.deriveKey(
      {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encripta una cadena de texto usando el algoritmo AES-GCM.
 * 
 * @param text - El texto que se desea encriptar
 * @param password - La contraseña que se usará para generar la clave de encriptación
 * @returns Una promesa que resuelve en la cadena encriptada en formato base64
 * 
 * @example
 * ```typescript
 * const textoSecreto = "información confidencial";
 * const password = "miClaveSecreta123";
 * const textoEncriptado = await encryptString(textoSecreto, password);
 * // textoEncriptado => "ABC123XYZ..."
 * ```
 * 
 * @remarks
 * - Utiliza el algoritmo AES-GCM para la encriptación
 * - Genera un vector de inicialización (IV) aleatorio de 12 bytes
 * - Concatena el IV con el contenido encriptado antes de codificar en base64
 */
export async function encryptString(text: string, password: string): Promise<string> {
  const key = await generateKey(password);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const textBuffer = new TextEncoder().encode(text);
  
  const encryptedContent = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    textBuffer
  );

  const encryptedArray = new Uint8Array(iv.length + encryptedContent.byteLength);
  encryptedArray.set(iv);
  encryptedArray.set(new Uint8Array(encryptedContent), iv.length);
  return Buffer.from(encryptedArray).toString('base64');
}

/**
 * Desencripta una cadena de texto que ha sido encriptada previamente usando AES-GCM.
 * 
 * @param encryptedText - El texto encriptado en formato base64
 * @param password - La contraseña utilizada para generar la clave de desencriptación
 * @returns Una promesa que resuelve con el texto desencriptado
 * @throws {Error} Si la contraseña es incorrecta o los datos están corruptos
 * 
 * @example
 * ```typescript
 * try {
 *   const textoEncriptado = "hL9/KGP9zXDzDsqW+5+ulA=="; // texto previamente encriptado
 *   const contraseña = "mi_contraseña_secreta";
 *   const textoDesencriptado = await decryptString(textoEncriptado, contraseña);
 *   console.log(textoDesencriptado); // "texto original"
 * } catch (error) {
 *   console.error("Error al desencriptar:", error.message);
 * }
 * ```
 */
export async function decryptString(encryptedText: string, password: string): Promise<string> {
  const key = await generateKey(password);

  const encryptedArray = new Uint8Array(Buffer.from(encryptedText, 'base64'));
  
  const iv = encryptedArray.slice(0, 12);
  const content = encryptedArray.slice(12);

  try {
    const decryptedContent = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      content
    );
    return new TextDecoder().decode(decryptedContent);
  } catch {
    throw new Error('Error al desencriptar: contraseña incorrecta o datos corruptos');
  }
}
