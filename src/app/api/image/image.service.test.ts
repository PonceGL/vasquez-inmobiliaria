/**
 * @jest-environment node
 */

import { mockCreatedImage, mockImages, mockSingleImage } from "@mocks/images";
import {
  mockCloudinaryResponse,
  mockCreateImageDto,
  mockCreateImageFromFormDataDto,
  mockUpdateImageDto,
} from "@mocks/images/create";
import { MongooseError, Query } from "mongoose";
import { ZodError } from "zod";

import {
  createImageDto,
  createImageFromFormDataDto,
  createManyImagesDto,
  updateImageDto,
} from "@/app/api/image/dtos/image.dto";
import { IImage, Image } from "@/app/api/image/image.entity";
import { imageService } from "@/app/api/image/image.service";
import { CLOUDINARY_FOLDER } from "@/constants/cloudinary";
import { cloudinaryService } from "@/lib/cloudinary/cloudinary.service";
import {
  BadRequestError,
  ImageNotFoundException,
  InternalServerErrorException,
} from "@/lib/httpErrors";
jest.mock("@/lib/mongodb");

jest.mock("@/app/api/image/image.entity", () => ({
  Image: {
    find: jest.fn(() => ({
      select: jest.fn(),
    })),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

const createMockQuery = <T = IImage>(
  resolveValue: T | null | { _id: string } | { message: string }
): Query<T, IImage> =>
  ({
    exec: jest.fn().mockResolvedValue(resolveValue),
    set: jest.fn(),
    save: jest.fn().mockResolvedValue(resolveValue),
    lean: jest.fn().mockReturnThis(),
    select: jest.fn().mockResolvedValue(resolveValue),
    populate: jest.fn().mockReturnThis(),
  } as unknown as Query<T, IImage>);

jest.mock("@/lib/cloudinary/cloudinary.service", () => ({
  cloudinaryService: {
    upload: jest.fn(),
    deleteByAssetId: jest.fn(),
  },
}));

jest.mock("@/constants/cloudinary", () => ({
  CLOUDINARY_FOLDER: "test_folder",
}));

const mockedImageModel = jest.mocked(Image);
const mockedCloudinaryService = jest.mocked(cloudinaryService);

describe("ImageService getAll", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of images", async () => {
    mockedImageModel.find.mockReturnValue(
      createMockQuery<IImage[]>(mockImages as unknown as IImage[])
    );

    const result = await imageService.getAll();

    expect(result).toEqual(mockImages);
    expect(mockedImageModel.find).toHaveBeenCalledWith({});
  });

  it("should handle errors and throw BadRequestError", async () => {
    const mongooseError = new MongooseError("Database error");

    mockedImageModel.find.mockReturnValue({
      select: jest.fn().mockRejectedValue(mongooseError),
    } as unknown as Query<IImage[], IImage>);

    await expect(imageService.getAll()).rejects.toThrow(BadRequestError);
  });
});

describe("ImageService getById", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an image by id", async () => {
    mockedImageModel.findById.mockReturnValue(
      createMockQuery<IImage>(mockSingleImage as unknown as IImage)
    );

    const result = await imageService.getById(mockSingleImage._id);

    expect(result).toEqual(mockSingleImage);
    expect(mockedImageModel.findById).toHaveBeenCalledWith(mockSingleImage._id);
  });

  it("should throw ImageNotFoundException when image is not found", async () => {
    mockedImageModel.findById.mockReturnValue(createMockQuery<IImage>(null));

    await expect(imageService.getById("invalid-id")).rejects.toThrow(
      ImageNotFoundException
    );
  });
});

describe("ImageService create", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new image", async () => {
    jest
      .spyOn(createImageFromFormDataDto, "parse")
      .mockReturnValue(mockCreateImageFromFormDataDto as never);

    mockedCloudinaryService.upload.mockResolvedValue(
      mockCloudinaryResponse as never
    );

    jest
      .spyOn(createImageDto, "parse")
      .mockReturnValue(mockCreateImageDto as never);

    (mockedImageModel.create as jest.Mock).mockResolvedValue(mockCreatedImage);

    const formData = new FormData();
    formData.append("file", mockCreateImageFromFormDataDto.file);
    formData.append("alt", mockCreateImageFromFormDataDto.alt);
    formData.append("folder", mockCreateImageFromFormDataDto.folder || "");

    const result = await imageService.create(formData);

    expect(result).toBeDefined();
    expect(mockedCloudinaryService.upload).toHaveBeenCalledWith({
      file: mockCreateImageFromFormDataDto.file,
      folder: `${CLOUDINARY_FOLDER}/${mockCreateImageFromFormDataDto.folder}`,
    });
    expect(mockedImageModel.create).toHaveBeenCalledWith({
      alt: mockCreateImageFromFormDataDto.alt,
      asset_id: mockCloudinaryResponse.asset_id,
      public_id: mockCloudinaryResponse.public_id,
      folder: mockCloudinaryResponse.folder,
      url: mockCloudinaryResponse.url,
      width: mockCloudinaryResponse.width,
      height: mockCloudinaryResponse.height,
    });
  });

  it("should re-throw ZodError on invalid form data", async () => {
    jest.spyOn(createImageFromFormDataDto, "parse").mockImplementation(() => {
      throw new ZodError([
        {
          code: "invalid_type" as const,
          expected: "object",
          path: ["file"],
          message: "El archivo es requerido.",
        },
      ]);
    });

    try {
      const invalidFormData = new FormData();
      invalidFormData.append("file", "not-a-file");
      invalidFormData.append("alt", "");

      await imageService.create(invalidFormData);
      fail("Expected function to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });

  it("should throw InternalServerErrorException if cloudinary upload fails", async () => {
    jest
      .spyOn(createImageFromFormDataDto, "parse")
      .mockReturnValue(mockCreateImageFromFormDataDto as never);

    mockedCloudinaryService.upload.mockRejectedValue(
      new Error("Cloudinary upload failed")
    );

    const formData = new FormData();
    formData.append("file", mockCreateImageFromFormDataDto.file);
    formData.append("alt", mockCreateImageFromFormDataDto.alt);
    formData.append("folder", mockCreateImageFromFormDataDto.folder || "");

    await expect(imageService.create(formData)).rejects.toThrow(
      InternalServerErrorException
    );
  });

  it("should throw BadRequestError if database creation fails", async () => {
    jest
      .spyOn(createImageFromFormDataDto, "parse")
      .mockReturnValue(mockCreateImageFromFormDataDto as never);

    mockedCloudinaryService.upload.mockResolvedValue(
      mockCloudinaryResponse as never
    );

    jest
      .spyOn(createImageDto, "parse")
      .mockReturnValue(mockCreateImageDto as never);

    (mockedImageModel.create as jest.Mock).mockImplementation(() => {
      throw new MongooseError("Database creation error");
    });

    const formData = new FormData();
    formData.append("file", mockCreateImageFromFormDataDto.file);
    formData.append("alt", mockCreateImageFromFormDataDto.alt);
    formData.append("folder", mockCreateImageFromFormDataDto.folder || "");

    await expect(imageService.create(formData)).rejects.toThrow(
      BadRequestError
    );
  });
});

describe("ImageService createMany", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockFiles = [
    new File(["test1"], "test1.jpg", { type: "image/jpeg" }),
    new File(["test2"], "test2.png", { type: "image/png" }),
  ];
  const mockAlts = ["Test alt 1", "Test alt 2"];
  const mockFolder = "test-folder";

  const mockCloudinaryResponses = [
    { ...mockCloudinaryResponse, public_id: "test1" },
    { ...mockCloudinaryResponse, public_id: "test2" },
  ];
  const mockCreatedImages = [
    { ...mockCreatedImage, public_id: "test1" },
    { ...mockCreatedImage, public_id: "test2" },
  ];

  it("should create multiple images successfully", async () => {
    const formData = new FormData();
    mockFiles.forEach((file) => formData.append("files", file));
    mockAlts.forEach((alt) => formData.append("alts", alt));
    formData.append("folder", mockFolder);

    jest.spyOn(createManyImagesDto, "parse").mockReturnValue({
      files: mockFiles,
      alts: mockAlts,
      folder: mockFolder,
    } as never);

    mockFiles.forEach((_, index) => {
      mockedCloudinaryService.upload.mockResolvedValueOnce(
        mockCloudinaryResponses[index] as never
      );
    });

    jest
      .spyOn(createImageDto, "parse")
      .mockReturnValue(mockCreateImageDto as never);

    mockCreatedImages.forEach((image) => {
      (mockedImageModel.create as jest.Mock).mockResolvedValueOnce(image);
    });

    const result = await imageService.createMany(formData);

    expect(result).toEqual(mockCreatedImages);
    expect(mockedCloudinaryService.upload).toHaveBeenCalledTimes(
      mockFiles.length
    );
    mockFiles.forEach((_, index) => {
      expect(mockedCloudinaryService.upload).toHaveBeenNthCalledWith(
        index + 1,
        {
          file: mockFiles[index],
          folder: `${CLOUDINARY_FOLDER}/${mockFolder}`,
        }
      );
    });
    expect(mockedImageModel.create).toHaveBeenCalledTimes(mockFiles.length);
  });

  it("should throw ZodError when validation fails", async () => {
    const formData = new FormData();
    mockFiles.forEach((file) => formData.append("files", file));
    formData.append("alts", mockAlts[0]);
    formData.append("folder", mockFolder);

    jest.spyOn(createManyImagesDto, "parse").mockImplementation(() => {
      throw new ZodError([
        {
          code: "custom",
          path: ["alts"],
          message:
            "El número de imágenes debe coincidir con el número de textos alternativos.",
        },
      ]);
    });

    try {
      await imageService.createMany(formData);
      fail("Expected function to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
});

describe("ImageService update", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update and return the image", async () => {
    jest
      .spyOn(updateImageDto, "parse")
      .mockReturnValue(mockUpdateImageDto as never);

    const updatedImage = { ...mockSingleImage, ...mockUpdateImageDto };

    mockedImageModel.findById.mockReturnValue(
      createMockQuery<IImage>(mockSingleImage as unknown as IImage)
    );

    const findByIdAndUpdateMock = {
      exec: jest.fn().mockResolvedValue(updatedImage),
    };
    (mockedImageModel.findByIdAndUpdate as jest.Mock).mockReturnValue(
      findByIdAndUpdateMock
    );

    const result = await imageService.update(
      mockSingleImage._id,
      mockUpdateImageDto
    );

    expect(result).toEqual(updatedImage);
    expect(mockedImageModel.findById).toHaveBeenCalledWith(mockSingleImage._id);
    expect(mockedImageModel.findByIdAndUpdate).toHaveBeenCalledWith(
      mockSingleImage._id,
      mockUpdateImageDto,
      { new: true, runValidators: true }
    );
  });

  it("should throw ImageNotFoundException if image to update is not found", async () => {
    jest
      .spyOn(updateImageDto, "parse")
      .mockReturnValue(mockUpdateImageDto as never);

    mockedImageModel.findById.mockReturnValue(createMockQuery<IImage>(null));

    await expect(
      imageService.update("invalid-id", mockUpdateImageDto)
    ).rejects.toThrow(ImageNotFoundException);
  });

  it("should throw InternalServerErrorException if image cannot be updated", async () => {
    jest
      .spyOn(updateImageDto, "parse")
      .mockReturnValue(mockUpdateImageDto as never);

    mockedImageModel.findById.mockReturnValue(
      createMockQuery<IImage>(mockSingleImage as unknown as IImage)
    );

    const findByIdAndUpdateMock = {
      exec: jest.fn().mockResolvedValue(null),
    };
    (mockedImageModel.findByIdAndUpdate as jest.Mock).mockReturnValue(
      findByIdAndUpdateMock
    );

    await expect(
      imageService.update(mockSingleImage._id, mockUpdateImageDto)
    ).rejects.toThrow(InternalServerErrorException);
  });
});

describe("ImageService delete", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete an image and return success", async () => {
    mockedImageModel.findById.mockReturnValue(
      createMockQuery<IImage>(mockSingleImage as unknown as IImage)
    );

    mockedCloudinaryService.deleteByAssetId.mockResolvedValue(undefined);

    const findByIdAndDeleteMock = {
      exec: jest.fn().mockResolvedValue(mockSingleImage),
    };
    (mockedImageModel.findByIdAndDelete as jest.Mock).mockReturnValue(
      findByIdAndDeleteMock
    );

    const result = await imageService.delete(mockSingleImage._id);

    expect(result).toEqual(mockSingleImage);
    expect(mockedImageModel.findById).toHaveBeenCalledWith(mockSingleImage._id);
    expect(mockedCloudinaryService.deleteByAssetId).toHaveBeenCalledWith(
      mockSingleImage.asset_id
    );
    expect(mockedImageModel.findByIdAndDelete).toHaveBeenCalledWith(
      mockSingleImage._id
    );
  });

  it("should throw ImageNotFoundException if image to delete is not found", async () => {
    mockedImageModel.findById.mockReturnValue(createMockQuery<IImage>(null));

    await expect(imageService.delete("invalid-id")).rejects.toThrow(
      ImageNotFoundException
    );
  });

  it("should throw InternalServerErrorException if cloudinary deletion fails", async () => {
    (mockedImageModel.findById as jest.Mock).mockResolvedValue(mockSingleImage);

    mockedCloudinaryService.deleteByAssetId.mockRejectedValue(
      new Error("Cloudinary deletion failed")
    );

    await expect(imageService.delete(mockSingleImage._id)).rejects.toThrow(
      InternalServerErrorException
    );
  });

  it("should throw BadRequestError if database deletion fails", async () => {
    mockedImageModel.findById.mockReturnValue(
      createMockQuery<IImage>(mockSingleImage as unknown as IImage)
    );

    mockedCloudinaryService.deleteByAssetId.mockResolvedValue(undefined);

    (mockedImageModel.findByIdAndDelete as jest.Mock).mockImplementation(() => {
      throw new MongooseError("Database deletion error");
    });

    await expect(imageService.delete(mockSingleImage._id)).rejects.toThrow(
      BadRequestError
    );
  });
});
