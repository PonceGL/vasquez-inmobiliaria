import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { MongooseError } from "mongoose";
import { ZodError } from "zod";

import { env } from "@/app/config/env";
import {
  ACCESS_TOKEN_EXPIRATION,
  JWT_ALGORITHM,
  RESET_TOKEN_EXPIRATION,
} from "@/app/constants/auth";
import { IS_DEV } from "@/app/constants/enviroment";
import { comparePassword, hashPassword } from "@/app/lib/crypt";
import {
  AuthenticationError,
  HttpError,
  InternalServerErrorException,
} from "@/app/lib/httpErrors";
import { dbConnect } from "@/app/lib/mongodb";
import { sendMailService } from "@/app/lib/sendMail";

import { userService } from "../user/user.services";
import {
  ForgotPasswordDto,
  forgotPasswordSchema,
} from "./dtos/forgotPassword.dto";
import { LoginDto, loginSchema } from "./dtos/login.dto";
import {
  ResetPasswordDto,
  resetPasswordSchema,
} from "./dtos/resetPassword.dto";

class LoginService {
  /**
   * Crea un login para el usuario y retorna un token JWT si las credenciales son válidas.
   * @param {LoginDto} loginData - Datos de inicio de sesión (email y contraseña).
   * @returns {Promise<{ token: string }>} Un objeto con el token JWT.
   * @throws {AuthenticationError} Si las credenciales son inválidas.
   * @throws {HttpError|ZodError|InternalServerErrorException} Si ocurre un error en el proceso.
   */
  public async createLogin(loginData: LoginDto): Promise<{ token: string }> {
    try {
      const validatedData = loginSchema.parse(loginData);
      await dbConnect();
      const user = await userService.getForLogin(validatedData);

      const isMatch = await comparePassword(
        validatedData.password,
        user.password
      );

      if (!isMatch) {
        throw new AuthenticationError("Credenciales inválidas");
      }

      const token = await this.createToken(
        {
          sub: user.id,
          email: user.email,
          role: user.role,
          verified: user.verified,
        },
        ACCESS_TOKEN_EXPIRATION
      );

      return { token };
    } catch (error) {
      throw this.handleServiceError(error);
    }
  }

  /**
   * Envía un correo electrónico para restablecer la contraseña del usuario.
   *
   * - Si el email existe, se envía un enlace de recuperación.
   * - Si el email no existe, se retorna el mismo mensaje genérico (no revela información).
   * - En modo desarrollo, el mensaje de error se incluye en la respuesta para depuración.
   *
   * @param {ForgotPasswordDto} data - Datos para solicitar el restablecimiento (email).
   * @returns {Promise<{ message: string }>} Mensaje genérico indicando que se envió el enlace si el correo existe.
   */
  public async forgotPassword(
    data: ForgotPasswordDto
  ): Promise<{ message: string }> {
    const defaultMessage =
      "Si existe una cuenta con este correo, se ha enviado un enlace para restablecer la contraseña.";
    try {
      const validatedData = forgotPasswordSchema.parse(data);
      await dbConnect();
      const user = await userService.getByEmail({ email: validatedData.email });

      const resetToken = await this.createToken(
        { sub: user.id, email: user.email },
        RESET_TOKEN_EXPIRATION
      );

      const resetUrl = `${env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

      // TODO: create a better html message
      const htmlMessage = `<p>Hola,</p><p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><a href="${resetUrl}">Restablecer Contraseña</a><p>Este enlace expirará en 15 minutos.</p>`;

      await sendMailService.send({
        email: validatedData.email,
        subject: "Restablece tu contraseña",
        html: htmlMessage,
      });

      return {
        message: defaultMessage,
      };
    } catch (error) {
      if (error instanceof HttpError && error.statusCode === 404) {
        return {
          message: IS_DEV
            ? `Mensaje solo DEV: ${(error as Error).message}`
            : defaultMessage,
        };
      }
      throw this.handleServiceError(error);
    }
  }

  /**
   * Restablece la contraseña del usuario usando un token de recuperación.
   * @param {ResetPasswordDto} data - Datos para restablecer la contraseña (token y nueva contraseña).
   * @returns {Promise<{ message: string }>} Mensaje indicando el resultado de la operación.
   * @throws {AuthenticationError} Si el token es inválido o ha expirado.
   * @throws {HttpError|ZodError|InternalServerErrorException} Si ocurre un error en el proceso.
   */
  public async resetPassword(
    data: ResetPasswordDto
  ): Promise<{ message: string }> {
    try {
      const { token, password } = resetPasswordSchema.parse(data);
      const secret = new TextEncoder().encode(env.SESSION_SECRET);

      const { payload } = await jwtVerify(token, secret);

      if (!payload.sub) {
        throw new AuthenticationError("Token inválido.");
      }

      const userId = payload.sub;

      const hashedPassword = await hashPassword(password);

      await dbConnect();
      await userService.update(userId, {
        password: hashedPassword,
      });
      return { message: "Contraseña restablecida con éxito." };
    } catch (error) {
      throw this.handleServiceError(error, {
        JOSEError:
          "El enlace para restablecer la contraseña ha expirado o es inválido.",
      });
    }
  }

  /**
   * Crea un token JWT con el payload y tiempo de expiración especificados.
   * @param {JWTPayload} payload - Información que se incluirá en el token.
   * @param {string | number} expiresIn - Tiempo de expiración del token.
   * @returns {Promise<string>} El token JWT generado.
   */
  private async createToken(
    payload: JWTPayload,
    expiresIn: string | number
  ): Promise<string> {
    const secret = new TextEncoder().encode(env.SESSION_SECRET);
    return new SignJWT(payload)
      .setProtectedHeader({ alg: JWT_ALGORITHM })
      .setExpirationTime(expiresIn)
      .setIssuedAt()
      .sign(secret);
  }

  /**
   * Maneja y transforma los errores ocurridos en los métodos del servicio.
   * @param {unknown} error - Error capturado.
   * @param {Object} [customMessages] - Mensajes personalizados para distintos tipos de error.
   * @returns {Error} El error transformado.
   */
  private handleServiceError(
    error: unknown,
    customMessages?: { [key: string]: string }
  ): Error {
    if (error instanceof HttpError || error instanceof ZodError) {
      return error;
    }

    if (error instanceof MongooseError) {
      const message = customMessages?.mongoose || "Error en la base de datos.";
      return new InternalServerErrorException(IS_DEV ? error.message : message);
    }

    if (error instanceof Error && error.name === "JOSEError") {
      const message =
        customMessages?.JOSEError || "Error en la operación del token.";
      return new AuthenticationError(IS_DEV ? error.message : message);
    }

    const message = customMessages?.internal || "Error interno.";
    return new InternalServerErrorException(
      IS_DEV ? (error as Error).message : message
    );
  }
}

export const loginService = new LoginService();
