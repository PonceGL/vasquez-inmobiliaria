/**
 * @jest-environment node
 */
import bcrypt from 'bcrypt';

import { comparePassword, decryptString, encryptString, hashPassword } from '.';

jest.mock('bcrypt');
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

const mockDecrypt = jest.fn();
const mockDecode = jest.fn();
const mockGetRandomValues = jest.fn().mockImplementation((buffer: Uint8Array) => {
  for (let i = 0; i < buffer.length; i++) {
    buffer[i] = i;
  }
  return buffer;
});

beforeEach(() => {
  global.TextEncoder = jest.fn().mockImplementation(() => ({
    encode: jest.fn().mockReturnValue(new Uint8Array([1, 2, 3])),
  })) as unknown as typeof TextEncoder;
  
  global.TextDecoder = jest.fn().mockImplementation(() => ({
    decode: mockDecode,
  })) as unknown as typeof TextDecoder;

  global.crypto = {
    getRandomValues: mockGetRandomValues,
    subtle: {
      importKey: jest.fn().mockResolvedValue('mockedKeyMaterial'),
      deriveKey: jest.fn().mockResolvedValue('mockedDerivedKey'),
      encrypt: jest.fn().mockResolvedValue(new ArrayBuffer(8)),
      decrypt: mockDecrypt,
    } as unknown as SubtleCrypto,
  } as unknown as Crypto;
});

afterEach(() => {
  jest.clearAllMocks();
});


describe('Funciones de Encriptación', () => {
  describe('hashPassword', () => {
    it('debería hashear una contraseña correctamente', async () => {
      const password = 'miPassword123';
      const hashedPassword = 'hashedPassword';
      (mockedBcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const result = await hashPassword(password);

      expect(mockedBcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(result).toBe(hashedPassword);
    });
  });

  describe('comparePassword', () => {
    it('debería devolver true si las contraseñas coinciden', async () => {
      const plainPassword = 'miPassword123';
      const hashedPassword = 'hashedPassword';
      (mockedBcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await comparePassword(plainPassword, hashedPassword);

      expect(mockedBcrypt.compare).toHaveBeenCalledWith(plainPassword, hashedPassword);
      expect(result).toBe(true);
    });

    it('debería devolver false si las contraseñas no coinciden', async () => {
      const plainPassword = 'passwordIncorrecta';
      const hashedPassword = 'hashedPassword';
      (mockedBcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await comparePassword(plainPassword, hashedPassword);

      expect(mockedBcrypt.compare).toHaveBeenCalledWith(plainPassword, hashedPassword);
      expect(result).toBe(false);
    });
  });

  describe('encryptString y decryptString', () => {
    const text = 'este es un texto secreto';
    const password = 'miClaveSecreta';

    it('debería encriptar un string correctamente', async () => {
      const encrypted = await encryptString(text, password);
      
      expect(global.crypto.subtle.importKey).toHaveBeenCalled();
      expect(global.crypto.subtle.deriveKey).toHaveBeenCalled();
      expect(global.crypto.subtle.encrypt).toHaveBeenCalled();
      
      expect(typeof encrypted).toBe('string');
      expect(encrypted).toMatch(/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/);
    });

    it('debería desencriptar un string correctamente', async () => {
      const mockDecryptedBuffer = new ArrayBuffer(8);
      mockDecrypt.mockResolvedValue(mockDecryptedBuffer);

      mockDecode.mockReturnValue(text);

      const encryptedText = 'textoEncriptadoEnBase64'; 
      const decrypted = await decryptString(encryptedText, password);

      expect(global.crypto.subtle.decrypt).toHaveBeenCalled();
      expect(global.TextDecoder).toHaveBeenCalled();
      expect(mockDecode).toHaveBeenCalledWith(mockDecryptedBuffer);
      
      expect(decrypted).toBe(text);
    });
    
    it('debería lanzar un error si la desencriptación falla', async () => {
      const encryptedText = 'textoCorruptoEnBase64';
      
      // Hacemos que nuestro mock de decrypt falle.
      mockDecrypt.mockRejectedValue(new Error('Fallo de criptografía'));
      
      await expect(decryptString(encryptedText, password))
        .rejects.toThrow('Error al desencriptar: contraseña incorrecta o datos corruptos');
      expect(mockDecode).not.toHaveBeenCalled();
    });
  });
});