/**
 * @jest-environment node
 */

import { MongooseError, Query } from "mongoose";
import { ZodError } from "zod";

import {
  mockContactNumber,
  mockContactNumberList,
  mockCreateContactNumber,
  mockCreateContactNumberDto,
  mockUpdateContactNumberDto,
} from "@/../__mocks__/contact/number";
import {
  createContactNumberDto,
  updateContactNumberDto,
} from "@/app/api/contact/number/dtos/number.dto";
import { ContactNumber, IContactNumber } from "@/app/api/contact/number/number.entity";
import { contactNumberService } from "@/app/api/contact/number/number.service";
import { BadRequestError, InternalServerErrorException, NotFoundException } from "@/lib/httpErrors";

jest.mock("@/lib/mongodb");
jest.mock("@/app/api/contact/number/number.entity", () => ({
  ContactNumber: {
    find: jest.fn(() => ({
      select: jest.fn(),
    })),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

const createMockQuery = <T = IContactNumber>(
  resolveValue: T | null | { _id: string } | { message: string }
): Query<T, IContactNumber> =>
  ({
    exec: jest.fn().mockResolvedValue(resolveValue),
    set: jest.fn(),
    save: jest.fn().mockResolvedValue(resolveValue),
    lean: jest.fn().mockResolvedValue(resolveValue),
    select: jest.fn().mockReturnValue(resolveValue),
    populate: jest.fn().mockReturnThis(),
  } as unknown as Query<T, IContactNumber>);

const mockedNumberModel = jest.mocked(ContactNumber);

describe("ContactNumberService getAll", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of contact numbers", async () => {
    mockedNumberModel.find.mockReturnValue(
      createMockQuery({
        lean: jest.fn().mockReturnValue(mockContactNumberList as unknown as IContactNumber[]),
      } as never)
    );

    const numbers = await contactNumberService.getAll();
    expect(numbers).toBeDefined();
    expect(Array.isArray(numbers)).toBe(true);
  });

  it("should handle errors and throw BadRequestError", async () => {
    const mongooseError = new MongooseError("Database error");

    mockedNumberModel.find.mockReturnValue(
      createMockQuery({
        lean: jest.fn().mockRejectedValue(mongooseError),
      } as never)
    );

    await expect(contactNumberService.getAll()).rejects.toThrow(BadRequestError);
  });
});

describe("ContactNumberService getById", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a contact number by id", async () => {
    mockedNumberModel.findById.mockReturnValue(
      createMockQuery(mockContactNumber as unknown as IContactNumber)
    );

    const number = await contactNumberService.getById(mockContactNumber._id);
    expect(number).toBeDefined();
  });

  it("should throw NotFoundError if contact number not found", async () => {
    mockedNumberModel.findById.mockReturnValue(null as never);

    await expect(contactNumberService.getById("invalid-id")).rejects.toThrow(
      NotFoundException
    );
  });

  it("should handle errors and throw BadRequestError", async () => {
    const mongooseError = new MongooseError("Database error");

    (mockedNumberModel.findById as jest.Mock).mockRejectedValue(mongooseError);

    await expect(contactNumberService.getById(mockContactNumber._id)).rejects.toThrow(
      BadRequestError
    );
  });
});

describe("ContactNumberService create", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create and return a new contact number", async () => {
    jest
      .spyOn(createContactNumberDto, "parse")
      .mockReturnValue(mockCreateContactNumberDto as never);

    mockedNumberModel.create.mockReturnValue(mockContactNumber as never);

    const number = await contactNumberService.create(mockCreateContactNumber as never);
    expect(number).toBeDefined();
  });

  it("should throw ZodError if validation fails", async () => {
    const zodError = new ZodError([
      {
        code: "unrecognized_keys",
        keys: ["color"],
        path: [],
        message: 'Unrecognized key: "color"',
      },
    ]);

    jest.spyOn(createContactNumberDto, "parse").mockImplementation(() => {
      throw zodError;
    });

    try {
      await contactNumberService.create(mockCreateContactNumber as never);
      fail("Expected function to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });

  it("should handle errors and throw BadRequestError", async () => {
    jest
      .spyOn(createContactNumberDto, "parse")
      .mockReturnValue(mockCreateContactNumberDto as never);

    const mongooseError = new MongooseError("Database error");

    (mockedNumberModel.create as jest.Mock).mockRejectedValue(mongooseError);

    await expect(
      contactNumberService.create(mockCreateContactNumber as never)
    ).rejects.toThrow(BadRequestError);
  });
});

describe("ContactNumberService update", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update and return the contact number", async () => {
    jest
      .spyOn(updateContactNumberDto, "parse")
      .mockReturnValue(mockUpdateContactNumberDto as never);

    mockedNumberModel.findById.mockReturnValue(
      createMockQuery(mockContactNumber as unknown as IContactNumber)
    );

    mockedNumberModel.findByIdAndUpdate.mockReturnValue({
      exec: jest.fn().mockReturnValue(mockContactNumber),
    } as never);

    const number = await contactNumberService.update(mockContactNumber._id, {
      phone: "9876543210",
    } as never);
    expect(number).toBeDefined();
  });

  it("should throw NotFoundError if contact number to update not found", async () => {
    jest
      .spyOn(updateContactNumberDto, "parse")
      .mockReturnValue(mockUpdateContactNumberDto as never);

    mockedNumberModel.findById.mockReturnValue(null as never);

    await expect(
      contactNumberService.update(mockContactNumber._id, {
        phone: "9876543210",
      } as never)
    ).rejects.toThrow(NotFoundException);
  });

  it("should throw ZodError if validation fails", async () => {
    const zodError = new ZodError([
      {
        code: "unrecognized_keys",
        keys: ["color"],
        path: [],
        message: 'Unrecognized key: "color"',
      },
    ]);

    jest.spyOn(updateContactNumberDto, "parse").mockImplementation(() => {
      throw zodError;
    });

    mockedNumberModel.findById.mockReturnValue(
      createMockQuery(mockContactNumber as unknown as IContactNumber)
    );

    try {
      await contactNumberService.update(mockContactNumber._id, {
        color: 345678,
      } as never);
      fail("Expected function to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
});

describe("ContactNumberService delete", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete the contact number and return a success message", async () => {
    mockedNumberModel.findById.mockReturnValue(
      createMockQuery(mockContactNumber as unknown as IContactNumber)
    );

    mockedNumberModel.findByIdAndDelete.mockReturnValue(
      createMockQuery(mockContactNumber as unknown as IContactNumber) as never
    );

    const response = await contactNumberService.delete(mockContactNumber._id);
    expect(response).toBeDefined();
    expect((response as { message: string }).message).toBe(
      "Número de contacto eliminado correctamente."
    );
  });

  it("should throw NotFoundError if contact number to delete not found", async () => {
    mockedNumberModel.findById.mockReturnValue(null as never);

    await expect(
      contactNumberService.delete(mockContactNumber._id)
    ).rejects.toThrow(NotFoundException);
  });

  it("should throw InternalServerErrorException if cant delete contact number", async () => {
    (mockedNumberModel.findById as jest.Mock).mockRejectedValue(new Error("Database error"));

    await expect(
      contactNumberService.delete(mockContactNumber._id)
    ).rejects.toThrow(InternalServerErrorException);
  });
});
