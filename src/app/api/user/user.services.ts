import { Error as MongooseError } from "mongoose";
import { ZodError } from "zod";

import { IS_DEV } from "@/app/constants/enviroment";
import { hashPassword } from "@/app/lib/crypt";
import {
  BadRequestError,
  HttpError,
  InternalServerErrorException,
  NotFoundException,
} from "@/app/lib/httpErrors";
import { dbConnect } from "@/app/lib/mongodb";

import { LoginDto, loginSchema } from "../auth/dtos/login.dto";
import {
  CreateUserDto,
  createUserDto,
  FindUserByEmailDto,
  findUserByEmailDto,
  UpdateUserDto,
  updateUserDto,
} from "./dtos/user.dto";
import { IUser, User } from "./user.entity";

class UserService {
  public async getAll(): Promise<IUser[]> {
    try {
      await dbConnect();
      const users = await User.find({});
      return users;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al obtener usuarios.",
      });
    }
  }

  public async getById(id: string) {
    try {
      await dbConnect();
      const user = await User.findById(id);
      if (!user) {
        throw new NotFoundException("El usuario no se encontró.");
      }
      return user;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "El usuario no se encontró.",
      });
    }
  }

  public async getByEmail(userData: FindUserByEmailDto) {
    try {
      const validatedData = findUserByEmailDto.parse(userData);
      await dbConnect();
      const user = await User.findOne({ email: validatedData.email });
      if (!user) {
        throw new NotFoundException("El usuario no se encontró.");
      }

      return user;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "El usuario no se encontró.",
      });
    }
  }

  public async getForLogin(loginData: LoginDto, errorMessage?: string) {
    try {
      const validatedData = loginSchema.parse(loginData);
      await dbConnect();
      const user = await User.findOne({ email: validatedData.email }).select(
        "+password"
      );
      if (!user) {
        throw new BadRequestError(errorMessage || "Credenciales inválidas");
      }
      // const isMatch = await comparePassword(plainPassword, user.password);
      // if (!isMatch) {
      //   throw new Error("Credenciales incorrectas");
      // }
      // const { password, ...safeUser } = user.toObject();
      return user;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "El usuario no se encontró.",
      });
    }
  }

  public async create(userData: CreateUserDto) {
    try {
      const validatedData = createUserDto.parse(userData);
      await dbConnect();
      const existingUser = await User.findOne({ email: validatedData.email });
      if (existingUser) {
        throw new BadRequestError("El correo electrónico ya está en uso.");
      }
      const hashedPassword = await hashPassword(validatedData.password);
      const newUser = await User.create({
        ...validatedData,
        password: hashedPassword,
      });
      const { _id } = newUser.toObject();
      return await this.getById(_id as string);
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Usuario no creado.",
      });
    }
  }

  public async update(id: string, userData: UpdateUserDto) {
    try {
      const validatedData = updateUserDto.parse(userData);
      await this.getById(id);

      await dbConnect();
      const updatedUser = await User.findByIdAndUpdate(id, validatedData, {
        new: true,
      }).exec();

      if (!updatedUser) {
        throw new InternalServerErrorException("Usuario no actualizado.");
      }
      return this.getById(id);
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Usuario no actualizado.",
      });
    }
  }

  async delete(id: string) {
    try {
      await this.getById(id);
      await dbConnect();
      await User.findByIdAndDelete(id);
      return { message: "Propiedad eliminada correctamente." };
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Usuario no eliminado.",
      });
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

export const userService = new UserService();
