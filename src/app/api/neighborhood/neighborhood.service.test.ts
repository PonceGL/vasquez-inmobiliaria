/**
 * @jest-environment node
 */
import { MongooseError, Query } from "mongoose";
import { ZodError } from "zod";

import {
  createNeighborhoodDto,
  updateNeighborhoodDto,
} from "@/app/api/neighborhood/dtos/neighborhood.dto";
import {
  INeighborhood,
  Neighborhood,
} from "@/app/api/neighborhood/neighborhood.entity";
import {
  BadRequestError,
  InternalServerErrorException,
  NotFoundException,
} from "@/lib/httpErrors";

import { neighborhoodService } from "./neighborhood.service";

jest.mock("@/app/api/neighborhood/neighborhood.entity");
jest.mock("@/lib/mongodb");
jest.mock("slugify");

const mockedNeighborhoodModel = jest.mocked(Neighborhood);

const mockNeighborhoods = [
  { _id: "1", name: "Colonia Centro", slug: "colonia-centro" },
  { _id: "2", name: "Colonia Norte", slug: "colonia-norte" },
];
const mockSingleNeighborhood = {
  _id: "1",
  name: "Colonia Centro",
  slug: "colonia-centro",
};
const mockCreateNeighborhoodDto = {
  name: "Colonia Nueva",
  description: "Desc",
  agent: "agentId",
};
const mockCreatedNeighborhood = {
  _id: "3",
  name: "Colonia Nueva",
  slug: "colonia-nueva",
};
const mockZodError = [
  {
    code: "invalid_value" as const,
    values: ["venta", "renta"],
    path: ["transactionType"],
    message: "Invalid option",
  },
];

const createMockQuery = <T = INeighborhood>(
  resolveValue: T | null | { _id: string } | { message: string }
): Query<T, INeighborhood> =>
  ({
    exec: jest.fn().mockResolvedValue(resolveValue),
    set: jest.fn(),
    save: jest.fn().mockResolvedValue(resolveValue),
    lean: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    populate: jest.fn().mockReturnThis(),
  } as unknown as Query<T, INeighborhood>);

describe("NeighborhoodService getAll", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return a list of neighborhoods", async () => {
    mockedNeighborhoodModel.find.mockReturnValue(
      createMockQuery(mockNeighborhoods as unknown as INeighborhood[])
    );
    const result = await neighborhoodService.getAll();
    expect(result).toEqual(mockNeighborhoods);
    expect(mockedNeighborhoodModel.find).toHaveBeenCalledWith({});
  });

  it("should handle errors and throw BadRequestError", async () => {
    mockedNeighborhoodModel.find.mockReturnValue(
      createMockQuery<INeighborhood[]>(null)
    );
    (mockedNeighborhoodModel.find().exec as jest.Mock).mockRejectedValue(
      new MongooseError("DB error")
    );
    await expect(neighborhoodService.getAll()).rejects.toThrow(BadRequestError);
  });
});

describe("NeighborhoodService getById", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return a neighborhood by id", async () => {
    mockedNeighborhoodModel.findById.mockReturnValue(
      createMockQuery(mockSingleNeighborhood)
    );
    const result = await neighborhoodService.getById(
      mockSingleNeighborhood._id
    );
    expect(result).toEqual(mockSingleNeighborhood);
    expect(mockedNeighborhoodModel.findById).toHaveBeenCalledWith(
      mockSingleNeighborhood._id
    );
  });

  it("should throw NotFoundException when neighborhood is not found", async () => {
    mockedNeighborhoodModel.findById.mockReturnValue(createMockQuery(null));
    await expect(neighborhoodService.getById("invalid-id")).rejects.toThrow(
      NotFoundException
    );
  });
});

describe("NeighborhoodService getBySlug", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return a neighborhood by slug", async () => {
    mockedNeighborhoodModel.findOne.mockReturnValue(
      createMockQuery(mockSingleNeighborhood)
    );
    const result = await neighborhoodService.getBySlug(
      mockSingleNeighborhood.slug
    );
    expect(result).toEqual(mockSingleNeighborhood);
    expect(mockedNeighborhoodModel.findOne).toHaveBeenCalledWith({
      slug: mockSingleNeighborhood.slug,
    });
  });

  it("should throw NotFoundException when neighborhood is not found", async () => {
    mockedNeighborhoodModel.findOne.mockReturnValue(createMockQuery(null));
    await expect(neighborhoodService.getBySlug("invalid-slug")).rejects.toThrow(
      NotFoundException
    );
  });
});

describe("NeighborhoodService create", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should create a new neighborhood", async () => {
    jest
      .spyOn(createNeighborhoodDto, "parse")
      .mockReturnValue(mockCreateNeighborhoodDto as never);
    mockedNeighborhoodModel.create.mockResolvedValue(
      mockCreatedNeighborhood as never
    );
    const result = await neighborhoodService.create(
      mockCreateNeighborhoodDto as never
    );
    expect(result).toEqual(mockCreatedNeighborhood);
  });

  it("should re-throw ZodError on invalid data", async () => {
    jest.spyOn(createNeighborhoodDto, "parse").mockImplementation(() => {
      throw new ZodError(mockZodError);
    });
    try {
      await neighborhoodService.create({ name: "" } as never);
      fail("Expected function to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });

  it("should throw BadRequestError if neighborhood can't be created in database", async () => {
    jest
      .spyOn(createNeighborhoodDto, "parse")
      .mockReturnValue(mockCreateNeighborhoodDto as never);
    mockedNeighborhoodModel.create.mockImplementation(() => {
      throw new MongooseError("Duplicated neighborhood");
    });
    await expect(
      neighborhoodService.create(mockCreateNeighborhoodDto as never)
    ).rejects.toThrow(BadRequestError);
  });
});

describe("NeighborhoodService update", () => {
  it("should update and return the neighborhood", async () => {
    const updateData = { name: "Colonia Actualizada" };
    const updatedNeighborhood = {
      ...mockSingleNeighborhood,
      name: "Colonia Actualizada",
    };
    jest
      .spyOn(updateNeighborhoodDto, "parse")
      .mockReturnValue(updateData as never);
    // Mock getById to return a valid neighborhood
    mockedNeighborhoodModel.findById.mockReturnValue(
      createMockQuery(mockSingleNeighborhood)
    );
    mockedNeighborhoodModel.findByIdAndUpdate.mockReturnValue({
      exec: jest.fn().mockReturnValue(updatedNeighborhood),
    } as never);
    const result = await neighborhoodService.update(
      mockSingleNeighborhood._id,
      updateData as never
    );
    expect(result).toEqual(updatedNeighborhood);
  });

  it("should throw NotFoundException if neighborhood to update is not found", async () => {
    jest
      .spyOn(updateNeighborhoodDto, "parse")
      .mockReturnValue({ name: "Colonia Actualizada" } as never);
    // Mock getById to return null (not found)
    mockedNeighborhoodModel.findById.mockReturnValue(createMockQuery(null));
    await expect(
      neighborhoodService.update("invalid-id", {
        name: "Colonia Actualizada",
      } as never)
    ).rejects.toThrow(NotFoundException);
  });
});

describe("NeighborhoodService delete", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should delete a neighborhood and return a success message", async () => {
    mockedNeighborhoodModel.findById.mockReturnValue(
      createMockQuery(mockSingleNeighborhood)
    );
    mockedNeighborhoodModel.findByIdAndDelete.mockReturnValue(
      createMockQuery(mockSingleNeighborhood)
    );
    const result = await neighborhoodService.delete(mockSingleNeighborhood._id);
    expect(result).toEqual({ message: "Vecindario eliminado correctamente." });
  });

  it("should throw InternalServerErrorException if neighborhood can't be deleted", async () => {
    mockedNeighborhoodModel.findById.mockReturnValue(
      createMockQuery(mockSingleNeighborhood)
    );

    (mockedNeighborhoodModel.findByIdAndDelete as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );
    await expect(
      neighborhoodService.delete(mockSingleNeighborhood._id)
    ).rejects.toThrow(InternalServerErrorException);
  });
});
