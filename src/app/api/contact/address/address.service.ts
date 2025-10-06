import { MongooseError } from "mongoose";
import { ZodError } from "zod";

import { Address, IAddress } from "@/app/api/contact/address/address.entity";
import {
  CreateAddressDto,
  createAddressDto,
  UpdateAddressDto,
  updateAddressDto,
} from "@/app/api/contact/address/dtos/address.dto";
import { IS_DEV } from "@/constants/enviroment";
import {
  BadRequestError,
  HttpError,
  InternalServerErrorException,
  NotFoundException,
} from "@/lib/httpErrors";
import { dbConnect } from "@/lib/mongodb";

class AddressService {
  async getAll(): Promise<IAddress[]> {
    try {
      await dbConnect();
      const addresses = await Address.find().select("-__v").lean();
      return addresses;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al obtener las direcciones de contacto.",
      });
    }
  }

  async getById(id: string) {
    try {
      await dbConnect();
      const address = await Address.findById(id);
      if (!address) {
        throw new NotFoundException("Dirección no encontrada.");
      }
      return address;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al obtener la dirección.",
      });
    }
  }

  async create(addressData: CreateAddressDto) {
    try {
      const validatedData = createAddressDto.parse(addressData);

      await dbConnect();
      const newAddress = await Address.create(validatedData);

      return newAddress;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al crear la dirección.",
      });
    }
  }

  async update(id: string, data: UpdateAddressDto) {
    try {
      const validatedData = updateAddressDto.parse(data);

      await this.getById(id);
      await dbConnect();
      const updatedAddress = await Address.findByIdAndUpdate(
        id,
        validatedData,
        {
          new: true,
          runValidators: true,
        }
      ).exec();

      if (!updatedAddress) {
        throw new BadRequestError("Dirección no encontrada.");
      }
      return updatedAddress;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al actualizar la dirección.",
      });
    }
  }

  async delete(id: string) {
    try {
      await this.getById(id);
      await dbConnect();
      await Address.findByIdAndDelete(id);
      return { message: "Dirección eliminada correctamente." };
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Dirección no eliminada.",
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

export const addressService = new AddressService();
