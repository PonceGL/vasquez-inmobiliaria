import { MongoServerError } from "mongodb";
import { MongooseError } from "mongoose";
import { ZodError } from "zod";

import {
  CreateContactEmailDto,
  createContactEmailDto,
  UpdateContactEmailDto,
  updateContactEmailDto,
} from "@/app/api/contact/email/dtos/email.dto";
import { ContactEmail } from "@/app/api/contact/email/email.entity";
import { IS_DEV } from "@/constants/enviroment";
import {
  BadRequestError,
  HttpError,
  InternalServerErrorException,
  NotFoundException,
} from "@/lib/httpErrors";
import { dbConnect } from "@/lib/mongodb";

class ContactEmailService {
  async getAll() {
    try {
      await dbConnect();
      const emails = await ContactEmail.find().select("-__v").lean();
      return emails;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al obtener los correos electrónicos de contacto.",
      });
    }
  }

  async getById(id: string) {
    try {
      await dbConnect();
      const email = await ContactEmail.findById(id);
      if (!email) {
        throw new NotFoundException("Correo electrónico no encontrado.");
      }
      return email;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al obtener el correo electrónico.",
      });
    }
  }

  async create(emailData: CreateContactEmailDto) {
    try {
      const validatedData = createContactEmailDto.parse(emailData);
      await dbConnect();
      const newEmail = await ContactEmail.create(validatedData);
      return newEmail;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al crear el correo electrónico.",
      });
    }
  }

  async update(id: string, data: UpdateContactEmailDto) {
    try {
      const validatedData = updateContactEmailDto.parse(data);
      const existingEmail = await this.getById(id);
      await dbConnect();
      existingEmail.set(validatedData);
      const updatedEmail = await existingEmail.save();
      if (!updatedEmail) {
        throw new BadRequestError("Correo electrónico no encontrado.");
      }
      return updatedEmail;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al actualizar el correo electrónico.",
      });
    }
  }

  async delete(id: string) {
    try {
      await this.getById(id);
      await dbConnect();
      await ContactEmail.findByIdAndDelete(id);
      return { message: "Correo electrónico eliminado correctamente." };
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Correo electrónico no eliminado.",
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

export const contactEmailService = new ContactEmailService();
