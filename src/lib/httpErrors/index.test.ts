import {
  AuthenticationError,
  AuthorizationError,
  BadRequestError,
  HttpError,
  InternalServerErrorException,
  JWSExpired,
  JWSInvalid,
  NotFoundException,
} from './index';

describe('HttpError and its extensions', () => {
  describe('HttpError base class', () => {
    it('should create an HttpError with custom status code and message', () => {
      const error = new HttpError(418, 'I\'m a teapot');
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(HttpError);
      expect(error.statusCode).toBe(418);
      expect(error.message).toBe('I\'m a teapot');
    });

    it('should maintain prototype chain for instanceof checks', () => {
      const error = new HttpError(500, 'Test error');
      expect(Object.getPrototypeOf(error)).toBe(HttpError.prototype);
    });
  });

  describe('NotFoundException', () => {
    it('should create with default message', () => {
      const error = new NotFoundException();
      expect(error).toBeInstanceOf(HttpError);
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('Recurso no encontrado');
    });

    it('should create with custom message', () => {
      const error = new NotFoundException('Usuario no encontrado');
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('Usuario no encontrado');
    });
  });

  describe('InternalServerErrorException', () => {
    it('should create with default message', () => {
      const error = new InternalServerErrorException();
      expect(error).toBeInstanceOf(HttpError);
      expect(error).toBeInstanceOf(InternalServerErrorException);
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('Error interno del servidor');
    });

    it('should create with custom message', () => {
      const error = new InternalServerErrorException('Error de base de datos');
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('Error de base de datos');
    });
  });

  describe('AuthenticationError', () => {
    it('should create with default message', () => {
      const error = new AuthenticationError();
      expect(error).toBeInstanceOf(HttpError);
      expect(error).toBeInstanceOf(AuthenticationError);
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe('Error de autenticación');
    });

    it('should create with custom message', () => {
      const error = new AuthenticationError('Token no proporcionado');
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe('Token no proporcionado');
    });
  });

  describe('AuthorizationError', () => {
    it('should create with default message', () => {
      const error = new AuthorizationError();
      expect(error).toBeInstanceOf(HttpError);
      expect(error).toBeInstanceOf(AuthorizationError);
      expect(error.statusCode).toBe(403);
      expect(error.message).toBe('Error de autorización');
    });

    it('should create with custom message', () => {
      const error = new AuthorizationError('Acceso denegado');
      expect(error.statusCode).toBe(403);
      expect(error.message).toBe('Acceso denegado');
    });
  });

  describe('BadRequestError', () => {
    it('should create with default message', () => {
      const error = new BadRequestError();
      expect(error).toBeInstanceOf(HttpError);
      expect(error).toBeInstanceOf(BadRequestError);
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Solicitud incorrecta');
    });

    it('should create with custom message', () => {
      const error = new BadRequestError('Datos inválidos');
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Datos inválidos');
    });
  });

  describe('JWSInvalid', () => {
    it('should create with default message', () => {
      const error = new JWSInvalid();
      expect(error).toBeInstanceOf(HttpError);
      expect(error).toBeInstanceOf(JWSInvalid);
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe('Token inválido');
    });

    it('should create with custom message', () => {
      const error = new JWSInvalid('Firma del token inválida');
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe('Firma del token inválida');
    });
  });

  describe('JWSExpired', () => {
    it('should create with default message', () => {
      const error = new JWSExpired();
      expect(error).toBeInstanceOf(HttpError);
      expect(error).toBeInstanceOf(JWSExpired);
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe('Token expirado');
    });

    it('should create with custom message', () => {
      const error = new JWSExpired('El token ha caducado');
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe('El token ha caducado');
    });
  });
});