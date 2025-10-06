import { MongoServerError } from "mongodb";
import { MongooseError } from "mongoose";
import { ZodError } from "zod";

import {
  CreateContactNumberDto,
  createContactNumberDto,
  UpdateContactNumberDto,
  updateContactNumberDto,
} from "@/app/api/contact/number/dtos/number.dto";
import { ContactNumber } from "@/app/api/contact/number/number.entity";
import { IS_DEV } from "@/constants/enviroment";
import {
  BadRequestError,
  HttpError,
  InternalServerErrorException,
  NotFoundException,
} from "@/lib/httpErrors";
import { dbConnect } from "@/lib/mongodb";

class ContactNumberService {
  async getAll() {
    try {
      await dbConnect();
      const numbers = await ContactNumber.find().select("-__v").lean();
      return numbers;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al obtener los números de contacto.",
      });
    }
  }

  async getById(id: string) {
    try {
      await dbConnect();
      const number = await ContactNumber.findById(id);
      if (!number) {
        throw new NotFoundException("Número de contacto no encontrado.");
      }
      return number;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al obtener el número de contacto.",
      });
    }
  }

  async create(numberData: CreateContactNumberDto) {
    try {
      const validatedData = createContactNumberDto.parse(numberData);
      await dbConnect();
      const newNumber = await ContactNumber.create(validatedData);
      return newNumber;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al crear el número de contacto.",
      });
    }
  }

  async update(id: string, data: UpdateContactNumberDto) {
    try {
      const validatedData = updateContactNumberDto.parse(data);
      const existingNumber = await this.getById(id);
      await dbConnect();
      existingNumber.set(validatedData);
      const updatedNumber = await existingNumber.save();
      if (!updatedNumber) {
        throw new BadRequestError("Número de contacto no encontrado.");
      }
      return updatedNumber;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al actualizar el número de contacto.",
      });
    }
  }

  async delete(id: string) {
    try {
      await this.getById(id);
      await dbConnect();
      await ContactNumber.findByIdAndDelete(id);
      return { message: "Número de contacto eliminado correctamente." };
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Número de contacto no eliminado.",
      });
    }
  }

  private handleServiceError(
    error: unknown,
    customMessages?: { [key: string]: string }
  ): Error {
    const defaultMessage = customMessages?.internal || "Error interno.";
    if (error instanceof HttpError || error instanceof ZodError) {
      return error;
    }

    if (error instanceof MongoServerError) {
      const message = IS_DEV
        ? `code: ${error?.code}, ${JSON.stringify(error.keyValue)}`
        : defaultMessage;
      return new BadRequestError(message);
    }

    if (error instanceof MongooseError) {
      const message = customMessages?.mongoose || "Error en la base de datos.";
      return new BadRequestError(IS_DEV ? error.message : message);
    }

    return new InternalServerErrorException(
      IS_DEV ? (error as Error).message : defaultMessage
    );
  }
}

export const contactNumberService = new ContactNumberService();
