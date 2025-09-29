/**
 * Clase base para todos los errores HTTP personalizados.
 */
export class HttpError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

/**
 * Excepción para errores 404 (No Encontrado).
 */
export class NotFoundException extends HttpError {
  constructor(message: string = 'Recurso no encontrado') {
    super(404, message);
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}
/**
 * Excepción Especifica, para controlar los errores de la imagen para errores 404 (No Encontrado).
 */
export class ImageNotFoundException extends HttpError {
  constructor(message: string = 'Imagen no encontrada') {
    super(404, message);
    Object.setPrototypeOf(this, ImageNotFoundException.prototype);
  }
}
/**
 * Excepción Especifica, para controlar los errores de las usuarios para errores 404 (No Encontrado).
 */
export class UserNotFoundException extends HttpError {
  constructor(message: string = 'Usuario no encontrado') {
    super(404, message);
    Object.setPrototypeOf(this, UserNotFoundException.prototype);
  }
}

/**
 * Excepción para errores 500 (Error Interno del Servidor).
 */
export class InternalServerErrorException extends HttpError {
  constructor(message: string = 'Error interno del servidor') {
    super(500, message);
    Object.setPrototypeOf(this, InternalServerErrorException.prototype);
  }
}

/**
 * Excepción para errores 401 (No Autorizado).
 */
export class AuthenticationError extends HttpError {
  constructor(message: string = 'Error de autenticación') {
    super(401, message);
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

/**
 * Excepción para errores 403 (Prohibido).
 */
export class AuthorizationError extends HttpError {
  constructor(message: string = 'Error de autorización') {
    super(403, message);
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}

/**
 * Excepción para errores 400 (Solicitud Incorrecta).
 */
export class BadRequestError extends HttpError {
  constructor(message: string = 'Solicitud incorrecta') {
    super(400, message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

/**
 * Excepción para tokens JWT inválidos (401 No Autorizado).
 */
export class JWSInvalid extends HttpError {
  constructor(message: string = 'Token inválido') {
    super(401, message);
    Object.setPrototypeOf(this, JWSInvalid.prototype);
  }
}

/**
 * Excepción para tokens JWT expirados (401 No Autorizado).
 */
export class JWSExpired extends HttpError {
  constructor(message: string = 'Token expirado') {
    super(401, message);
    Object.setPrototypeOf(this, JWSExpired.prototype);
  }
}