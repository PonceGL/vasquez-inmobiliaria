/**
 * @jest-environment node
*/
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Error as MongooseError } from "mongoose";

import { User } from "@/app/api/user/user.entity";
import { userService } from "@/app/api/user/user.service";
import { hashPassword } from "@/lib/crypt";
import {
  BadRequestError,
  InternalServerErrorException,
  NotFoundException,
  UserNotFoundException,
} from "@/lib/httpErrors";
import { dbConnect } from "@/lib/mongodb";

jest.mock("@/lib/mongodb", () => ({
  dbConnect: jest.fn(),
}));

jest.mock("@/app/api/user/user.entity", () => ({
  User: {
    find: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

jest.mock("@/lib/crypt", () => ({
  hashPassword: jest.fn(),
}));

jest.mock("@/constants/enviroment", () => ({
  IS_DEV: process.env.NODE_ENV === "development",
}));

const mockedDbConnect = jest.mocked(dbConnect);
const mockedUser = jest.mocked(User);
const mockedHashPassword = jest.mocked(hashPassword);

describe("UserService", () => {
  const mockUser = {
    _id: "60d0fe4f5311236168a109ca",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    verified: true,
    toObject: () => ({
      _id: "60d0fe4f5311236168a109ca",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "admin",
      verified: true,
    }),
  };

  const mockUsers = [mockUser];

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("✅ should return all users successfully", async () => {
      mockedDbConnect.mockResolvedValue(true as any);
      (mockedUser.find as jest.Mock).mockResolvedValue(mockUsers);

      const users = await userService.getAll();

      expect(users).toEqual(mockUsers);
      expect(dbConnect).toHaveBeenCalledTimes(1);
      expect(User.find).toHaveBeenCalledWith({});
    });

    it("❌ should throw BadRequestError on Mongoose error", async () => {
      const mongooseError = new MongooseError.CastError(
        " ObjectId",
        "123",
        " _id"
      );
      mockedDbConnect.mockResolvedValue(true as any);
      (mockedUser.find as jest.Mock).mockRejectedValue(mongooseError);

      await expect(userService.getAll()).rejects.toThrow(BadRequestError);
    });

    it("❌ should throw InternalServerErrorException on generic error", async () => {
      mockedDbConnect.mockResolvedValue(true as any);
      (mockedUser.find as jest.Mock).mockRejectedValue(
        new Error("Generic error")
      );

      await expect(userService.getAll()).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });

  describe("getById", () => {
    it("✅ should return a user by ID successfully", async () => {
      mockedDbConnect.mockResolvedValue(true as any);
      (mockedUser.findById as jest.Mock).mockResolvedValue(mockUser);

      const user = await userService.getById(mockUser._id);

      expect(user).toEqual(mockUser);
      expect(User.findById).toHaveBeenCalledWith(mockUser._id);
    });

    it("❌ should throw UserNotFoundException if user is not found", async () => {
      mockedDbConnect.mockResolvedValue(true as any);
      (mockedUser.findById as jest.Mock).mockResolvedValue(null);

      await expect(userService.getById("nonexistent-id")).rejects.toThrow(
        UserNotFoundException
      );
    });
  });

  describe("getByEmail", () => {
    it("✅ should return a user by email successfully", async () => {
      mockedDbConnect.mockResolvedValue(true as any);
      (mockedUser.findOne as jest.Mock).mockResolvedValue(mockUser);
      const emailDto = { email: mockUser.email };

      const user = await userService.getByEmail(emailDto);

      expect(user).toEqual(mockUser);
      expect(User.findOne).toHaveBeenCalledWith({ email: mockUser.email });
    });

    it("❌ should throw UserNotFoundException if email is not found", async () => {
      mockedDbConnect.mockResolvedValue(true as any);
      (mockedUser.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        userService.getByEmail({ email: "notfound@test.com" })
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe("create", () => {
    const createUserData = {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      password: "password123",
      role: "editor",
      verified: false,
    } as const;

    it("✅ should create and return a new user", async () => {
      const createdUser = {
        ...createUserData,
        _id: "newUserId",
        toObject: () => ({ ...createUserData, _id: "newUserId" }),
      };

      mockedDbConnect.mockResolvedValue(true as any);

      (mockedUser.findOne as jest.Mock).mockResolvedValue(null);

      mockedHashPassword.mockResolvedValue("hashed_password");

      (mockedUser.create as jest.Mock).mockResolvedValue(createdUser);

      (mockedUser.findById as jest.Mock).mockResolvedValue(createdUser);

      const result = await userService.create(createUserData);

      expect(User.findOne).toHaveBeenCalledWith({
        email: createUserData.email,
      });
      expect(hashPassword).toHaveBeenCalledWith(createUserData.password);
      expect(User.create).toHaveBeenCalledWith({
        ...createUserData,
        password: "hashed_password",
      });
      expect(User.findById).toHaveBeenCalledWith(createdUser._id);
      expect(result).toEqual(createdUser);
    });

    it("❌ should throw BadRequestError if email is already in use", async () => {
      mockedDbConnect.mockResolvedValue(true as any);
      (mockedUser.findOne as jest.Mock).mockResolvedValue(mockUser);

      await expect(userService.create(createUserData)).rejects.toThrow(
        BadRequestError
      );
      expect(User.create).not.toHaveBeenCalled();
    });
  });

  describe("update", () => {
    const updateData = { name: "John Updated" };

    it("✅ should update and return the user", async () => {
      const updatedUser = { ...mockUser, ...updateData };

      (mockedUser.findById as jest.Mock).mockResolvedValue(mockUser);

      const findByIdAndUpdateMock = {
        exec: jest.fn().mockResolvedValue(updatedUser),
      };
      (mockedUser.findByIdAndUpdate as jest.Mock).mockReturnValue(
        findByIdAndUpdateMock
      );

      (mockedUser.findById as jest.Mock)
        .mockResolvedValueOnce(mockUser)
        .mockResolvedValueOnce(updatedUser);

      const result = await userService.update(mockUser._id, updateData);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        mockUser._id,
        updateData,
        { new: true }
      );
      expect(result).toEqual(updatedUser);
      expect(User.findById).toHaveBeenCalledTimes(2);
    });

    it("❌ should throw UserNotFoundException if user to update does not exist", async () => {
      (mockedUser.findById as jest.Mock).mockResolvedValue(null);

      await expect(
        userService.update("nonexistent-id", updateData)
      ).rejects.toThrow(UserNotFoundException);
    });
  });

  describe("delete", () => {
    it("✅ should delete a user and return a success message", async () => {
      (mockedUser.findById as jest.Mock).mockResolvedValue(mockUser);
      (mockedUser.findByIdAndDelete as jest.Mock).mockResolvedValue(true);

      const result = await userService.delete(mockUser._id);

      expect(User.findById).toHaveBeenCalledWith(mockUser._id);
      expect(User.findByIdAndDelete).toHaveBeenCalledWith(mockUser._id);
      expect(result).toEqual({ message: "Usuario eliminado correctamente." });
    });

    it("❌ should throw UserNotFoundException if user to delete does not exist", async () => {
      (mockedUser.findById as jest.Mock).mockResolvedValue(null);

      await expect(userService.delete("nonexistent-id")).rejects.toThrow(
        UserNotFoundException
      );
      expect(User.findByIdAndDelete).not.toHaveBeenCalled();
    });
  });
});
