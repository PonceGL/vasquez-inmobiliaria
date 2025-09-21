import { comparePassword, hashPassword } from "@/app/lib/crypt";
import { dbConnect } from "@/app/lib/mongodb";

import {
  CreateUserDto,
  createUserDto,
  UpdateUserDto,
  updateUserDto,
} from "./dtos.user.dto";
import { IUser, User } from "./user.entity";

class UserService {
  public async getAll(): Promise<IUser[]> {
    await dbConnect();
    const users = await User.find({});
    return users;
  }

  public async getById(id: string) {
    await dbConnect();
    const user = await User.findById(id);
    if (!user) {
      throw new Error("El usuario no se encontró.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = user.toObject();
    return safeUser;
  }

  public async getByEmail(
    email: string,
    { password: plainPassword }: { password: string }
  ) {
    await dbConnect();
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("El usuario no se encontró.");
    }
    const isMatch = await comparePassword(plainPassword, user.password);
    if (!isMatch) {
      throw new Error("Credenciales incorrectas");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = user.toObject();
    return safeUser;
  }

  public async create(userData: CreateUserDto) {
    const validatedData = createUserDto.parse(userData);
    await dbConnect();
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      throw new Error("El correo electrónico ya está en uso.");
    }
    const hashedPassword = await hashPassword(validatedData.password);
    const newUser = await User.create({
      ...validatedData,
      password: hashedPassword,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = newUser.toObject();
    return safeUser;
  }

  public async update(id: string, userData: UpdateUserDto) {
    const validatedData = updateUserDto.parse(userData);
    await this.getById(id);

    await dbConnect();
    const updatedUser = await User.findByIdAndUpdate(id, validatedData, {
      new: true,
    }).exec();

    if (!updatedUser) {
      throw new Error("Usuario no actualizado.");
    }
    return this.getById(id);
  }

  async delete(id: string) {
    await this.getById(id);
    await dbConnect();
    await User.findByIdAndDelete(id);
    return { message: "Propiedad eliminada correctamente." };
  }
}

export const userService = new UserService();
