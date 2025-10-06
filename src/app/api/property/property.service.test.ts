/**
 * @jest-environment node
 */

import {
  mockCreatedProperty,
  mockProperties,
  mockSingleProperty,
} from "@mocks/properties";
import {
  mockCreatePropertyDto,
  mockDataHouse,
  mockGetImageById,
  mockGetUSerById,
  mockZodError,
} from "@mocks/properties/create_house";
import {
  mockCreatedLand,
  mockCreateLandDTO,
  mockDataLand,
} from "@mocks/properties/create_land";
import {
  mockCreateOtherDTO,
  mockDataOther,
} from "@mocks/properties/create_other";
import { MongooseError, Query } from "mongoose";
import { ZodError } from "zod";

import { imageService } from "@/app/api/image/image.service";
import {
  createPropertyDto,
  UpdatePropertyDTO,
  updatePropertySchema,
} from "@/app/api/property/dtos/property.dto";
import { House } from "@/app/api/property/models/house.entity";
import { Land } from "@/app/api/property/models/land.entity";
import { OtherProperty } from "@/app/api/property/models/other.entity";
import { IProperty, Property } from "@/app/api/property/models/property.entity";
import { propertyService } from "@/app/api/property/property.service";
import { userService } from "@/app/api/user/user.service";
import {
  BadRequestError,
  InternalServerErrorException,
  NotFoundException,
} from "@/lib/httpErrors";

jest.mock("@/app/api/image/image.service");
jest.mock("@/app/api/user/user.service");
jest.mock("@/lib/mongodb");
jest.mock("slugify");
jest.mock("@/app/api/property/models/property.entity");
jest.mock("@/app/api/property/models/house.entity", () => ({
  House: {
    create: jest.fn(),
  },
}));
jest.mock("@/app/api/property/models/land.entity", () => {
  return {
    Land: {
      create: jest.fn(() => ({
        toObject: jest.fn(),
      })),
    },
  };
});
jest.mock("@/app/api/property/models/other.entity", () => {
  return {
    OtherProperty: {
      create: jest.fn(() => ({
        toObject: jest.fn(),
      })),
    },
  };
});

const mockedUserService = jest.mocked(userService);
const mockedImageService = jest.mocked(imageService);
const mockedPropertyModel = jest.mocked(Property);
const mockedHouseModel = jest.mocked(House);
const mockedLandModel = jest.mocked(Land);
const mockedOtherPropertyModel = jest.mocked(OtherProperty);

const createMockQuery = <T = IProperty>(
  resolveValue: T | null | { _id: string } | { message: string }
): Query<T, IProperty> =>
  ({
    exec: jest.fn().mockResolvedValue(resolveValue),
    set: jest.fn(),
    save: jest.fn().mockResolvedValue(resolveValue),
    lean: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    populate: jest.fn().mockReturnThis(),
  } as unknown as Query<T, IProperty>);

describe("PropertyService getAll", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of properties", async () => {
    mockedPropertyModel.find.mockReturnValue(
      createMockQuery<IProperty[]>(mockProperties as unknown as IProperty[])
    );

    const result = await propertyService.getAll();

    expect(result).toEqual(mockProperties);
    expect(mockedPropertyModel.find).toHaveBeenCalledWith({});
  });

  it("should handle errors and throw BadRequestError", async () => {
    const mongooseError = new MongooseError("Database error");
    mockedPropertyModel.find.mockReturnValue(
      createMockQuery<IProperty[]>(null)
    );
    (mockedPropertyModel.find().exec as jest.Mock).mockRejectedValue(
      mongooseError
    );

    await expect(propertyService.getAll()).rejects.toThrow(BadRequestError);
  });
});

describe("PropertyService getById", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a property by id", async () => {
    mockedPropertyModel.findById.mockReturnValue(
      createMockQuery<IProperty>(mockSingleProperty as unknown as IProperty)
    );

    const result = await propertyService.getById(mockSingleProperty._id);

    expect(result).toEqual(mockSingleProperty);
    expect(mockedPropertyModel.findById).toHaveBeenCalledWith(
      mockSingleProperty._id
    );
  });

  it("should throw NotFoundException when property is not found", async () => {
    mockedPropertyModel.findById.mockReturnValue(
      createMockQuery<IProperty>(null)
    );

    await expect(propertyService.getById("invalid-id")).rejects.toThrow(
      NotFoundException
    );
  });
});

describe("PropertyService getBySlug", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a property by slug", async () => {
    mockedPropertyModel.findOne.mockReturnValue(
      createMockQuery<IProperty>(mockSingleProperty as unknown as IProperty)
    );

    const result = await propertyService.getBySlug(mockSingleProperty.slug);

    expect(result).toEqual(mockSingleProperty);
    expect(mockedPropertyModel.findOne).toHaveBeenCalledWith({
      slug: mockSingleProperty.slug,
    });
  });

  it("should throw NotFoundException when property is not found", async () => {
    mockedPropertyModel.findOne.mockReturnValue(
      createMockQuery<IProperty>(null)
    );

    await expect(propertyService.getBySlug("invalid-slug")).rejects.toThrow(
      NotFoundException
    );
  });
});

describe("PropertyService create", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new house", async () => {
    jest
      .spyOn(createPropertyDto, "parse")
      .mockReturnValue(mockCreatePropertyDto as never);

    mockedUserService.getById.mockResolvedValue(
      mockGetUSerById(mockDataHouse.agent) as never
    );
    mockedImageService.getById.mockResolvedValue(
      mockGetImageById(mockDataHouse.mainImage) as never
    );

    mockedHouseModel.create.mockReturnValue({
      toObject: jest.fn(() => mockCreatedProperty as unknown as IProperty),
    } as never);

    const result = await propertyService.create(mockDataHouse as never);

    expect(result).toBeDefined();
  });

  it("should create a new land", async () => {
    jest
      .spyOn(createPropertyDto, "parse")
      .mockReturnValue(mockCreateLandDTO as never);

    mockedUserService.getById.mockResolvedValue(
      mockGetUSerById(mockDataLand.agent) as never
    );
    mockedImageService.getById.mockResolvedValue(
      mockGetImageById(mockDataLand.mainImage) as never
    );

    mockedLandModel.create.mockReturnValue({
      toObject: jest.fn(() => mockCreatedLand as unknown as IProperty),
    } as never);

    const result = await propertyService.create(mockDataLand as never);

    expect(result).toBeDefined();
  });

  it("should create a new other property", async () => {
    jest
      .spyOn(createPropertyDto, "parse")
      .mockReturnValue(mockCreateOtherDTO as never);

    mockedUserService.getById.mockResolvedValue(
      mockGetUSerById(mockDataOther.agent) as never
    );
    mockedImageService.getById.mockResolvedValue(
      mockGetImageById(mockDataOther.mainImage) as never
    );

    mockedOtherPropertyModel.create.mockReturnValue({
      toObject: jest.fn(() => mockDataOther as unknown as IProperty),
    } as never);

    const result = await propertyService.create(mockDataOther as never);

    expect(result).toBeDefined();
  });

  it("should re-throw ZodError on invalid data", async () => {
    jest.spyOn(createPropertyDto, "parse").mockImplementation(() => {
      throw new ZodError(mockZodError);
    });

    try {
      await propertyService.create({
        propertyType: "casa",
        title: "Casa 5A",
        description: "Lorem Ipsum",
        price: {
          value: 253560,
          currency: "MXN",
        },
      } as never);
      fail("Expected function to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });

  it("should throw BadRequestError if property to update cant be created in database", async () => {
    jest
      .spyOn(createPropertyDto, "parse")
      .mockReturnValue(mockCreatePropertyDto as never);

    mockedUserService.getById.mockResolvedValue(
      mockGetUSerById(mockDataHouse.agent) as never
    );
    mockedImageService.getById.mockResolvedValue(
      mockGetImageById(mockDataHouse.mainImage) as never
    );

    mockedHouseModel.create.mockImplementation(() => {
      throw new MongooseError("Propiedad duplicada");
    });

    await expect(
      propertyService.create(mockDataHouse as never)
    ).rejects.toThrow(BadRequestError);
  });
});

describe("PropertyService update", () => {
  it("should update and return the property", async () => {
    const updateData = {
      title: "Casa Remodelada",
      propertyType: "casa" as const,
      location: {
        address: "Nueva Dirección 123",
      },
    } as UpdatePropertyDTO;

    const updatedProperty = { ...mockSingleProperty, title: "Casa Remodelada" };

    jest.spyOn(updatePropertySchema, "parse").mockReturnValue(updateData);

    mockedPropertyModel.findById.mockReturnValue({
      ...updatedProperty,
      exec: jest.fn().mockResolvedValue(updatedProperty),
      set: jest.fn(),
      save: jest.fn(() => ({
        toObject: jest.fn(() => updatedProperty as unknown as IProperty),
      })),
      lean: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
    } as never);

    const result = await propertyService.update(
      mockSingleProperty._id as string,
      updateData
    );

    expect(result).toBeDefined();
  });

  it("should throw NotFoundException if property to update is not found", async () => {
    const updateData = {
      title: "Casa Remodelada",
      propertyType: "casa" as const,
      location: {
        address: "Nueva Dirección 123",
      },
    } as UpdatePropertyDTO;

    jest.spyOn(updatePropertySchema, "parse").mockReturnValue(updateData);

    mockedPropertyModel.findById.mockReturnValue(
      createMockQuery<IProperty>(null)
    );

    await expect(
      propertyService.update("invalid-id", updateData)
    ).rejects.toThrow(NotFoundException);
  });
});

describe("PropertyService delete", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a property and return a success message", async () => {
    mockedPropertyModel.findById.mockReturnValue(
      createMockQuery<IProperty>(mockSingleProperty as unknown as IProperty)
    );

    mockedPropertyModel.findByIdAndDelete.mockReturnValue(
      createMockQuery<IProperty>(mockSingleProperty as unknown as IProperty)
    );

    const result = await propertyService.delete(
      mockSingleProperty._id as string
    );
    expect(result).toEqual({ message: "Propiedad eliminada correctamente." });
  });

  it("should throw InternalServerErrorException if property to update cant be updated", async () => {
    mockedPropertyModel.findById.mockReturnValue(
      createMockQuery<IProperty>(mockSingleProperty as unknown as IProperty)
    );

    mockedPropertyModel.findByIdAndDelete.mockReturnValue(
      createMockQuery<IProperty | null>(null)
    );

    await expect(
      propertyService.delete(mockSingleProperty._id as string)
    ).rejects.toThrow(InternalServerErrorException);
  });
});