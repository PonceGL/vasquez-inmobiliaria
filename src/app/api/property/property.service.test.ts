/**
 * @jest-environment node
 */

import { MongooseError, Query } from "mongoose";
import { ZodError } from "zod";

import { imageService } from "@/app/api/image/image.services";
import {
  createPropertyDto,
  UpdatePropertyDTO,
  updatePropertySchema,
} from "@/app/api/property/dtos/property.dto";
import { IProperty, Property } from "@/app/api/property/models/property.entity";
import { propertyService } from "@/app/api/property/property.service";
import { userService } from "@/app/api/user/user.services";
import {
  BadRequestError,
  NotFoundException,
  UserNotFoundException,
} from "@/lib/httpErrors";

jest.mock("@/app/api/user/user.services");
jest.mock("@/app/api/image/image.services");
jest.mock("@/lib/mongodb");
jest.mock("slugify");
jest.mock("@/app/api/property/models/property.entity");

const mockProperty = {
  _id: "68d719e323ca506503864506",
  title: "Casa de Prueba",
  slug: "casa-de-prueba",
  description: "Descripción de prueba",
  price: {
    value: 1000000,
    currency: "MXN",
  },
  transactionType: "Venta" as const,
  location: {
    type: "Point" as const,
    coordinates: [-98.275, 19.0185] as [number, number],
    address: "Dirección de prueba",
    city: "Ciudad de prueba",
    state: "Estado de prueba",
    zipCode: "12345",
  },
  mainImage: "68d700497e5a6e478f0984d8",
  images: ["68d700527e5a6e478f0984da", "68d7005b7e5a6e478f0984dc"],
  agent: "68d6feed7e5a6e478f0984be",
  propertyType: "Casa" as const,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockedUserService = jest.mocked(userService);
const mockedImageService = jest.mocked(imageService);
const mockedPropertyModel = jest.mocked(Property);

const createMockQuery = <T = IProperty>(
  resolveValue: T | null | { _id: string } | { message: string }
): Query<T, IProperty> =>
  ({
    exec: jest.fn().mockResolvedValue(resolveValue),
    lean: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    populate: jest.fn().mockReturnThis(),
  } as unknown as Query<T, IProperty>);

describe("PropertyService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getById", () => {
    it("should return a property when a valid ID is provided", async () => {
      mockedPropertyModel.findById.mockReturnValue(
        createMockQuery<IProperty>(mockProperty)
      );

      const result = await propertyService.getById(mockProperty._id as string);

      expect(result).toEqual(mockProperty);
    });

    it("should throw NotFoundException when property is not found", async () => {
      mockedPropertyModel.findById.mockReturnValue(
        createMockQuery<IProperty>(null)
      );

      await expect(propertyService.getById("non-existent-id")).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe("create", () => {
    const mockHouseDto = {
      propertyType: "Terreno" as const,
      title: "Terreno Residencial en Lomas de Angelópolis III",
      description:
        "Excelente oportunidad de inversión. Terreno plano de 200 metros cuadrados ubicado en uno de los clústers más exclusivos de la zona. Ideal para construir la casa de tus sueños. Cuenta con todos los servicios a pie de calle y seguridad 24 horas.",
      price: {
        value: 1250000,
        currency: "MXN",
      },
      transactionType: "Venta" as const,
      location: {
        coordinates: [-98.275, 19.0185] as [number, number],
        address: "Blvd. de las Cascadas 789, Parque Querétaro, Cascatta",
        city: "San Andrés Cholula",
        state: "Puebla",
        zipCode: "72830",
      },
      mainImage: "68d700497e5a6e478f0984d8",
      images: [
        "68d700527e5a6e478f0984da",
        "68d7005b7e5a6e478f0984dc",
        "68d700657e5a6e478f0984de",
      ],
      agent: "68d6feed7e5a6e478f0984be",
      landSqMeters: 200,
      frontageMeters: 10,
      depthMeters: 20,
      topography: "Plano" as const,
      hasServices: true,
    };

    it("should create and return a new property", async () => {
      const parseSpy = jest
        .spyOn(createPropertyDto, "parse")
        .mockReturnValue(mockHouseDto);

      const createdDocument = {
        _id: "68d719e323ca506503864506",
        title: "Terreno Residencial en Lomas de Angelópolis III",
        slug: "terreno-residencial-en-lomas-de-angelopolis-iii",
        description:
          "Excelente oportunidad de inversión. Terreno plano de 200 metros cuadrados ubicado en uno de los clústers más exclusivos de la zona. Ideal para construir la casa de tus sueños. Cuenta con todos los servicios a pie de calle y seguridad 24 horas.",
        price: {
          value: 1250000,
          currency: "MXN",
        },
        transactionType: "Venta" as const,
        location: {
          type: "Point" as const,
          coordinates: [-98.275, 19.0185] as [number, number],
          address: "Blvd. de las Cascadas 789, Parque Querétaro, Cascatta",
          city: "San Andrés Cholula",
          state: "Puebla",
          zipCode: "72830",
        },
        mainImage: "68d700497e5a6e478f0984d8",
        images: [
          "68d700527e5a6e478f0984da",
          "68d7005b7e5a6e478f0984dc",
          "68d700657e5a6e478f0984de",
        ],
        agent: "68d6feed7e5a6e478f0984be",
        propertyType: "Terreno" as const,
        createdAt: new Date("2025-09-26T22:55:31.259Z"),
        updatedAt: new Date("2025-09-26T22:55:31.259Z"),
      };

      mockedPropertyModel.create.mockResolvedValue({
        ...createdDocument,
        toObject: jest.fn().mockReturnValue(createdDocument),
      } as never);
      mockedUserService.getById.mockResolvedValue({} as never);
      mockedImageService.getById.mockResolvedValue({} as never);

      await propertyService.create(mockHouseDto);

      expect(mockedPropertyModel.create).toHaveBeenCalled();

      parseSpy.mockRestore();
    });

    it("should throw UserNotFoundException if agent does not exist", async () => {
      mockedUserService.getById.mockRejectedValue(
        new UserNotFoundException("El usuario no se encontró.")
      );

      await expect(propertyService.create(mockHouseDto)).rejects.toThrow(
        NotFoundException
      );
    });

    it("should re-throw ZodError on invalid data", async () => {
      const invalidData = { ...mockHouseDto, title: "" };

      const parseSpy = jest
        .spyOn(createPropertyDto, "parse")
        .mockImplementation(() => {
          const zodError = new ZodError([
            {
              code: "too_small",
              minimum: 1,
              inclusive: true,
              exact: false,
              message: "El título es obligatorio.",
              path: ["title"],
              origin: "value",
            },
          ]);
          throw zodError;
        });

      expect(parseSpy).toHaveBeenCalledTimes(0);

      try {
        await propertyService.create(invalidData);
        fail("Expected function to throw");
      } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
      }

      parseSpy.mockRestore();
    });
  });

  describe("update", () => {
    it("should update and return the property", async () => {
      const updateData = {
        title: "Casa Remodelada",
        propertyType: "Casa" as const,
      } as UpdatePropertyDTO;
      const updatedProperty = { ...mockProperty, title: "Casa Remodelada" };
      const parseSpy = jest
        .spyOn(updatePropertySchema, "parse")
        .mockReturnValue(updateData);

      mockedPropertyModel.findById.mockReturnValue(
        createMockQuery<IProperty>(mockProperty)
      );

      mockedPropertyModel.findByIdAndUpdate.mockReturnValue(
        createMockQuery<IProperty>(updatedProperty)
      );

      const result = await propertyService.update(
        mockProperty._id as string,
        updateData
      );

      expect(result).toEqual(updatedProperty);
      parseSpy.mockRestore();
    });

    it("should throw NotFoundException if property to update is not found", async () => {
      const updateData = {
        title: "Nuevo",
        propertyType: "Casa" as const,
      } as UpdatePropertyDTO;
      const parseSpy = jest
        .spyOn(updatePropertySchema, "parse")
        .mockReturnValue(updateData);

      mockedPropertyModel.findById.mockReturnValue(
        createMockQuery<IProperty>(null)
      );

      await expect(
        propertyService.update(mockProperty._id as string, updateData)
      ).rejects.toThrow(NotFoundException);

      parseSpy.mockRestore();
    });
  });

  describe("delete", () => {
    it("should delete a property and return a success message", async () => {
      mockedPropertyModel.findById.mockReturnValue(
        createMockQuery<IProperty>(mockProperty)
      );

      mockedPropertyModel.findByIdAndDelete.mockReturnValue(
        createMockQuery<{ _id: string }>({ _id: mockProperty._id as string })
      );

      const result = await propertyService.delete(mockProperty._id as string);

      expect(result).toEqual({ message: "Propiedad eliminada correctamente." });
    });

    it("should throw an error if Mongoose fails to delete", async () => {
      mockedPropertyModel.findById.mockReturnValue(
        createMockQuery<IProperty>(mockProperty)
      );

      mockedPropertyModel.findByIdAndDelete.mockReturnValue(
        createMockQuery<IProperty>(null)
      );

      await expect(
        propertyService.delete(mockProperty._id as string)
      ).rejects.toThrow("Propiedad no eliminada.");
    });
  });

  describe("handleServiceError", () => {
    it("should return a BadRequestError for a MongooseError", () => {
      const mongooseError = new MongooseError("Duplicate key");
      const error = (
        propertyService as unknown as {
          handleServiceError: (error: unknown) => Error;
        }
      ).handleServiceError(mongooseError);
      expect(error).toBeInstanceOf(BadRequestError);
    });
  });
});
