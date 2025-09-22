import { Error as MongooseError } from "mongoose";

import { IS_DEV } from "@/app/constants/enviroment";
import { hashPassword } from "@/app/lib/crypt";
import {
  BadRequestError,
  InternalServerErrorException,
  NotFoundException,
} from "@/app/lib/httpErrors";
import { dbConnect } from "@/app/lib/mongodb";

import {
  CreateUserDto,
  createUserDto,
  FindUserByEmailDto,
  findUserByEmailDto,
  UpdateUserDto,
  updateUserDto,
} from "./dtos.user.dto";
import { IUser, User } from "./user.entity";

class UserService {
  public async getAll(): Promise<IUser[]> {
    try {
      await dbConnect();
      const users = await User.find({});
      return users;
    } catch (error) {
      if (error instanceof MongooseError) {
        throw new BadRequestError(
          IS_DEV ? error.message : "Error al obtener usuarios."
        );
      }
      throw new InternalServerErrorException("Error al obtener usuarios.");
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
      if (error instanceof MongooseError) {
        throw new BadRequestError(IS_DEV ? error.message : undefined);
      }
      throw new InternalServerErrorException("El usuario no se encontró.");
    }
  }

  public async getByEmail(userData: FindUserByEmailDto) {
    try {
      const validatedData = findUserByEmailDto.parse(userData);
      // TODO: this method should only get user by email, not validate password
      await dbConnect();
      const user = await User.findOne({ email: validatedData.email });
      // const user = await User.findOne({ email }).select("+password");
      if (!user) {
        throw new NotFoundException("El usuario no se encontró.");
      }
      // const isMatch = await comparePassword(plainPassword, user.password);
      // if (!isMatch) {
      //   throw new Error("Credenciales incorrectas");
      // }
      // const { password, ...safeUser } = user.toObject();
      return user;
    } catch (error) {
      if (error instanceof MongooseError) {
        throw new BadRequestError(IS_DEV ? error.message : undefined);
      }
      throw new InternalServerErrorException("El usuario no se encontró.");
    }
  }

  public async create(userData: CreateUserDto) {
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
  }

  public async update(id: string, userData: UpdateUserDto) {
    const validatedData = updateUserDto.parse(userData);
    await this.getById(id);

    try {
      await dbConnect();
      const updatedUser = await User.findByIdAndUpdate(id, validatedData, {
        new: true,
      }).exec();

      if (!updatedUser) {
        throw new InternalServerErrorException("Usuario no actualizado.");
      }
      return this.getById(id);
    } catch (error) {
      if (error instanceof MongooseError) {
        throw new BadRequestError(
          IS_DEV ? error.message : "Usuario no actualizado."
        );
      }
      throw new InternalServerErrorException("Usuario no actualizado.");
    }
  }

  async delete(id: string) {
    try {
      await this.getById(id);
      await dbConnect();
      await User.findByIdAndDelete(id);
      return { message: "Propiedad eliminada correctamente." };
    } catch (error) {
      if (error instanceof MongooseError) {
        throw new BadRequestError(
          IS_DEV ? error.message : "Usuario no eliminado."
        );
      }
      throw new InternalServerErrorException("Usuario no eliminado.");
    }
  }
}

export const userService = new UserService();
