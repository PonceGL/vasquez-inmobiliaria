import bcrypt from "bcrypt";
import { Buffer } from "buffer";

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
 * Genera una clave para la encriptación AES-GCM a partir de una contraseña.
 * @param password La contraseña a partir de la cual se generará la clave.
 * @returns Una Promise que se resuelve con la clave generada.
 */
async function generateKey(password: string): Promise<CryptoKey> {
  const passwordBuffer = Buffer.from(password, 'utf-8');
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
 * Encripta un string usando AES-GCM.
 * Este método es seguro para usar tanto en el frontend como en el backend.
 * @param text El texto a encriptar.
 * @param password La contraseña para generar la clave de encriptación.
 * @returns Una Promise que se resuelve con el texto encriptado en formato base64.
 */
export async function encryptString(text: string, password: string): Promise<string> {
  const key = await generateKey(password);
  
  const iv = crypto.getRandomValues(new Uint8Array(12));
  
  const textBuffer = Buffer.from(text, 'utf-8');
  
  const encryptedContent = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    key,
    textBuffer
  );

  const encryptedArray = new Uint8Array(iv.length + new Uint8Array(encryptedContent).length);
  encryptedArray.set(iv);
  encryptedArray.set(new Uint8Array(encryptedContent), iv.length);
  
  return Buffer.from(encryptedArray).toString('base64');
}

/**
 * Desencripta un string que fue encriptado con encryptString.
 * Este método es seguro para usar tanto en el frontend como en el backend.
 * @param encryptedText El texto encriptado en formato base64.
 * @param password La contraseña usada para encriptar.
 * @returns Una Promise que se resuelve con el texto desencriptado.
 * @throws {Error} Si la contraseña es incorrecta o el texto está corrupto.
 */
export async function decryptString(encryptedText: string, password: string): Promise<string> {
  const key = await generateKey(password);

  const encryptedArray = new Uint8Array(Buffer.from(encryptedText, 'base64'));
  
  const iv = encryptedArray.slice(0, 12);
  const content = encryptedArray.slice(12);

  try {
    const decryptedContent = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      content
    );

    return Buffer.from(decryptedContent).toString('utf-8');
  } catch {
    throw new Error('Error al desencriptar: contraseña incorrecta o datos corruptos');
  }
};
