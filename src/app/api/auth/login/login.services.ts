import { SignJWT } from "jose";
import { MongooseError } from "mongoose";
import { ZodError } from "zod";

import { IS_DEV } from "@/app/constants/enviroment";
import { comparePassword } from "@/app/lib/crypt";
import {
  BadRequestError,
  HttpError,
  InternalServerErrorException,
} from "@/app/lib/httpErrors";
import { dbConnect } from "@/app/lib/mongodb";

import { userService } from "../../user/user.services";
import { LoginDto, loginSchema } from "./dtos/login.dto";

class LoginService {
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
        throw new BadRequestError("Credenciales inválidas");
      }

      const jwtSecretKey = process.env.SESSION_SECRET;
      if (!jwtSecretKey) {
        throw new InternalServerErrorException(
          IS_DEV
            ? "SESSION_SECRET is not defined in environment variables"
            : "Internal server error"
        );
      }
      const secret = new TextEncoder().encode(jwtSecretKey);

      const alg = "HS256";

      const token = await new SignJWT({
        sub: user.id,
        email: user.email,
        role: user.role,
        verified: user.verified,
      })
        .setProtectedHeader({ alg })
        .setExpirationTime("2h") // El token expira en 2 horas
        .setIssuedAt()
        .sign(secret);

      return { token };
    } catch (error) {
      throw this.handleServiceError(error);
    }
  }

  private handleServiceError(
    error: unknown,
    customMessages?: { [key: string]: string }
  ): Error {
    if (error instanceof HttpError || error instanceof ZodError) {
      return error;
    }

    if (error instanceof MongooseError) {
      const message = customMessages?.mongoose || "Error en la base de datos.";
      return new BadRequestError(IS_DEV ? error.message : message);
    }

    const message = customMessages?.internal || "Error interno.";
    return new InternalServerErrorException(
      IS_DEV ? (error as Error).message : message
    );
  }
}

export const loginService = new LoginService();
