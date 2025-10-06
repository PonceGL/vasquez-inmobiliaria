/**
 * @jest-environment node
 */

import { MongooseError, Query } from "mongoose";
import { ZodError } from "zod";

import {
  mockCreateEmail,
  mockCreateEmailDto,
  mockEmail,
  mockUpdateEmailDto,
} from "@/../__mocks__/contact/email";
import {
  createContactEmailDto,
  updateContactEmailDto,
} from "@/app/api/contact/email/dtos/email.dto";
import { ContactEmail, IContactEmail } from "@/app/api/contact/email/email.entity";
import { contactEmailService } from "@/app/api/contact/email/email.service";
import { BadRequestError, InternalServerErrorException, NotFoundException } from "@/lib/httpErrors";

jest.mock("@/lib/mongodb");
jest.mock("@/app/api/contact/email/email.entity", () => ({
  ContactEmail: {
    find: jest.fn(() => ({
      select: jest.fn(),
    })),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

const createMockQuery = <T = IContactEmail>(
  resolveValue: T | null | { _id: string } | { message: string }
): Query<T, IContactEmail> =>
  ({
    exec: jest.fn().mockResolvedValue(resolveValue),
    set: jest.fn(),
    save: jest.fn().mockResolvedValue(resolveValue),
    lean: jest.fn().mockResolvedValue(resolveValue),
    select: jest.fn().mockReturnValue(resolveValue),
    populate: jest.fn().mockReturnThis(),
  } as unknown as Query<T, IContactEmail>);

const mockedEmailModel = jest.mocked(ContactEmail);

describe("ContactEmailService getAll", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of emails", async () => {
    mockedEmailModel.find.mockReturnValue(
      createMockQuery({
        lean: jest.fn().mockReturnValue([mockEmail]),
      } as never)
    );

    const emails = await contactEmailService.getAll();
    expect(emails).toBeDefined();
    expect(Array.isArray(emails)).toBe(true);
  });

  it("should handle errors and throw BadRequestError", async () => {
    const mongooseError = new MongooseError("Database error");

    mockedEmailModel.find.mockReturnValue(
      createMockQuery({
        lean: jest.fn().mockRejectedValue(mongooseError),
      } as never)
    );

    await expect(contactEmailService.getAll()).rejects.toThrow(BadRequestError);
  });
});

describe("ContactEmailService getById", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an email by id", async () => {
    mockedEmailModel.findById.mockReturnValue(
  createMockQuery(mockEmail as unknown as IContactEmail)
    );

    const email = await contactEmailService.getById(mockEmail._id);
    expect(email).toBeDefined();
  });

  it("should throw NotFoundError if email not found", async () => {
    mockedEmailModel.findById.mockReturnValue(null as never);

    await expect(contactEmailService.getById("invalid-id")).rejects.toThrow(
      NotFoundException
    );
  });

  it("should handle errors and throw BadRequestError", async () => {
    const mongooseError = new MongooseError("Database error");

    (mockedEmailModel.findById as jest.Mock).mockRejectedValue(mongooseError);

    await expect(contactEmailService.getById(mockEmail._id)).rejects.toThrow(
      BadRequestError
    );
  });
});

describe("ContactEmailService create", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create and return a new email", async () => {
    jest
      .spyOn(createContactEmailDto, "parse")
      .mockReturnValue(mockCreateEmailDto as never);

    mockedEmailModel.create.mockReturnValue(mockEmail as never);

    const email = await contactEmailService.create(mockCreateEmail as never);
    expect(email).toBeDefined();
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

    jest.spyOn(createContactEmailDto, "parse").mockImplementation(() => {
      throw zodError;
    });

    try {
      await contactEmailService.create(mockCreateEmail as never);
      fail("Expected function to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });

  it("should handle errors and throw BadRequestError", async () => {
    jest
      .spyOn(createContactEmailDto, "parse")
      .mockReturnValue(mockCreateEmailDto as never);

    const mongooseError = new MongooseError("Database error");

    (mockedEmailModel.create as jest.Mock).mockRejectedValue(mongooseError);

    await expect(
      contactEmailService.create(mockCreateEmail as never)
    ).rejects.toThrow(BadRequestError);
  });
});

describe("ContactEmailService update", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update and return the email", async () => {
    jest
      .spyOn(updateContactEmailDto, "parse")
      .mockReturnValue(mockUpdateEmailDto as never);

    mockedEmailModel.findById.mockReturnValue(
      createMockQuery(mockEmail as unknown as IContactEmail)
    );

    mockedEmailModel.findByIdAndUpdate.mockReturnValue({
      exec: jest.fn().mockReturnValue(mockEmail),
    } as never);

    const email = await contactEmailService.update(mockEmail._id, {
      email: "new@email.com",
    } as never);
    expect(email).toBeDefined();
  });

  it("should throw NotFoundError if email to update not found", async () => {
    jest
      .spyOn(updateContactEmailDto, "parse")
      .mockReturnValue(mockUpdateEmailDto as never);

    mockedEmailModel.findById.mockReturnValue(null as never);

    await expect(
      contactEmailService.update(mockEmail._id, {
        email: "new@email.com",
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

    jest.spyOn(updateContactEmailDto, "parse").mockImplementation(() => {
      throw zodError;
    });

    mockedEmailModel.findById.mockReturnValue(
  createMockQuery(mockEmail as unknown as IContactEmail)
    );

    try {
      await contactEmailService.update(mockEmail._id, {
        color: 345678,
      } as never);
      fail("Expected function to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
});

describe("ContactEmailService delete", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete the email and return a success message", async () => {
    mockedEmailModel.findById.mockReturnValue(
  createMockQuery(mockEmail as unknown as IContactEmail)
    );

    mockedEmailModel.findByIdAndDelete.mockReturnValue(
  createMockQuery(mockEmail as unknown as IContactEmail) as never
    );

    const response = await contactEmailService.delete(mockEmail._id);
    expect(response).toBeDefined();
    expect((response as { message: string }).message).toBe(
      "Correo electrónico eliminado correctamente."
    );
  });

  it("should throw NotFoundError if email to delete not found", async () => {
    mockedEmailModel.findById.mockReturnValue(null as never);

    await expect(
      contactEmailService.delete(mockEmail._id)
    ).rejects.toThrow(NotFoundException);
  });

  it("should throw InternalServerErrorException if cant delete email", async () => {
    (mockedEmailModel.findById as jest.Mock).mockRejectedValue(new Error("Database error"));

    await expect(
      contactEmailService.delete(mockEmail._id)
    ).rejects.toThrow(InternalServerErrorException);
  });
});
