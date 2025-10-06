/**
 * @jest-environment node
 */

import {
  mockAddress,
  mockCreateAddress,
  mockCreateAddressDto,
  mockUpdateAddressDto,
} from "@mocks/contact/addres";
import { MongooseError, Query } from "mongoose";
import { ZodError } from "zod";

import { Address, IAddress } from "@/app/api/contact/address/address.entity";
import { addressService } from "@/app/api/contact/address/address.service";
import {
  createAddressDto,
  updateAddressDto,
} from "@/app/api/contact/address/dtos/address.dto";
import { BadRequestError, InternalServerErrorException, NotFoundException } from "@/lib/httpErrors";

jest.mock("@/lib/mongodb");
jest.mock("@/app/api/contact/address/address.entity", () => ({
  Address: {
    find: jest.fn(() => ({
      select: jest.fn(),
    })),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

const createMockQuery = <T = IAddress>(
  resolveValue: T | null | { _id: string } | { message: string }
): Query<T, IAddress> =>
  ({
    exec: jest.fn().mockResolvedValue(resolveValue),
    set: jest.fn(),
    save: jest.fn().mockResolvedValue(resolveValue),
    lean: jest.fn().mockResolvedValue(resolveValue),
    select: jest.fn().mockReturnValue(resolveValue),
    populate: jest.fn().mockReturnThis(),
  } as unknown as Query<T, IAddress>);

const mockedAddressModel = jest.mocked(Address);

describe("AddressService getAll", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of addresses", async () => {
    mockedAddressModel.find.mockReturnValue(
      createMockQuery({
        lean: jest.fn().mockReturnValue([mockAddress] as unknown as IAddress[]),
      } as never)
    );

    const addresses = await addressService.getAll();
    expect(addresses).toBeDefined();
    expect(Array.isArray(addresses)).toBe(true);
  });

  it("should handle errors and throw BadRequestError", async () => {
    const mongooseError = new MongooseError("Database error");

    mockedAddressModel.find.mockReturnValue(
      createMockQuery({
        lean: jest.fn().mockRejectedValue(mongooseError),
      } as never)
    );

    await expect(addressService.getAll()).rejects.toThrow(BadRequestError);
  });
});

describe("AddressService getById", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an address by id", async () => {
    mockedAddressModel.findById.mockReturnValue(
      createMockQuery(mockAddress as unknown as IAddress)
    );

    const address = await addressService.getById(mockAddress._id);
    expect(address).toBeDefined();
  });

  it("should throw NotFoundError if address not found", async () => {
    mockedAddressModel.findById.mockReturnValue(null as never);

    await expect(addressService.getById("invalid-id")).rejects.toThrow(
      NotFoundException
    );
  });

  it("should handle errors and throw BadRequestError", async () => {
    const mongooseError = new MongooseError("Database error");

    (mockedAddressModel.findById as jest.Mock).mockRejectedValue(mongooseError);

    await expect(addressService.getById(mockAddress._id)).rejects.toThrow(
      BadRequestError
    );
  });
});

describe("AddressService create", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create and return a new address", async () => {
    jest
      .spyOn(createAddressDto, "parse")
      .mockReturnValue(mockCreateAddressDto as never);

    mockedAddressModel.create.mockReturnValue(mockAddress as never);

    const addresses = await addressService.create(mockCreateAddress as never);
    expect(addresses).toBeDefined();
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

    jest.spyOn(createAddressDto, "parse").mockImplementation(() => {
      throw zodError;
    });

    try {
      await addressService.create(mockCreateAddress as never);
      fail("Expected function to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });

  it("should handle errors and throw BadRequestError", async () => {
    jest
      .spyOn(createAddressDto, "parse")
      .mockReturnValue(mockCreateAddressDto as never);

    const mongooseError = new MongooseError("Database error");

    (mockedAddressModel.create as jest.Mock).mockRejectedValue(mongooseError);

    await expect(
      addressService.create(mockCreateAddress as never)
    ).rejects.toThrow(BadRequestError);
  });
});

describe("AddressService update", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update and return the address", async () => {
    jest
      .spyOn(updateAddressDto, "parse")
      .mockReturnValue(mockUpdateAddressDto as never);

    mockedAddressModel.findById.mockReturnValue(
      createMockQuery(mockAddress as unknown as IAddress)
    );

    mockedAddressModel.findByIdAndUpdate.mockReturnValue({
      exec: jest.fn().mockReturnValue(mockAddress),
    } as never);

    const addresses = await addressService.update(mockAddress._id, {
      exteriorNumber: "345 B",
    } as never);
    expect(addresses).toBeDefined();
  });

  it("should throw NotFoundError if address to update not found", async () => {
    jest
      .spyOn(updateAddressDto, "parse")
      .mockReturnValue(mockUpdateAddressDto as never);

    mockedAddressModel.findById.mockReturnValue(null as never);

    await expect(
      addressService.update(mockAddress._id, {
        exteriorNumber: "345 B",
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

    jest.spyOn(updateAddressDto, "parse").mockImplementation(() => {
      throw zodError;
    });

    mockedAddressModel.findById.mockReturnValue(
      createMockQuery(mockAddress as unknown as IAddress)
    );

    try {
      await addressService.update(mockAddress._id, {
        color: 345678,
      } as never);
      fail("Expected function to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
});

describe("AddressService delete", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete the address and return a success message", async () => {
    mockedAddressModel.findById.mockReturnValue(
      createMockQuery(mockAddress as unknown as IAddress)
    );

    mockedAddressModel.findByIdAndDelete.mockReturnValue(
      createMockQuery(mockAddress as unknown as IAddress) as never
    );

    const response = await addressService.delete(mockAddress._id);
    expect(response).toBeDefined();
    expect((response as { message: string }).message).toBe(
      "Dirección eliminada correctamente."
    );
  });

  it("should throw NotFoundError if address to delete not found", async () => {
    mockedAddressModel.findById.mockReturnValue(null as never);

    await expect(
      addressService.delete(mockAddress._id)
    ).rejects.toThrow(NotFoundException);
  });

  it("should throw InternalServerErrorException if cant delete address", async () => {

    (mockedAddressModel.findById as jest.Mock).mockRejectedValue(new Error("Database error"));

    await expect(
      addressService.delete(mockAddress._id)
    ).rejects.toThrow(InternalServerErrorException);
  });
});
