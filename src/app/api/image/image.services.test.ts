/**
 * @jest-environment node
 */

import { ZodError } from "zod";

import { CLOUDINARY_FOLDER } from "@/app/constants/cloudinary";
import { cloudinaryService } from "@/app/lib/cloudinary/cloudinary.service";
import {
  InternalServerErrorException,
  NotFoundException,
} from "@/app/lib/httpErrors";
import { dbConnect } from "@/app/lib/mongodb";

import { Image } from "./image.entity";
import { imageService } from "./image.services";

jest.mock("@/app/lib/mongodb", () => ({
  dbConnect: jest.fn(),
}));

jest.mock("./image.entity", () => ({
  Image: {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

jest.mock("@/app/lib/cloudinary/cloudinary.service", () => ({
  cloudinaryService: {
    upload: jest.fn(),
    deleteByAssetId: jest.fn(),
  },
}));

jest.mock("@/app/constants/cloudinary", () => ({
  CLOUDINARY_FOLDER: "test_folder",
}));

const mockedImage = jest.mocked(Image);
const mockedCloudinaryService = jest.mocked(cloudinaryService);

describe("ImageService", () => {
  const mockImage = {
    _id: "60d0fe4f5311236168a109cb",
    alt: "A beautiful landscape",
    asset_id: "asset_123",
    public_id: "public_456",
    folder: "test_folder/landscapes",
    url: "http://cloudinary.com/image.jpg",
    width: 800,
    height: 600,
  };

  const mockImages = [mockImage];

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("✅ should return all images successfully", async () => {
      (mockedImage.find as jest.Mock).mockResolvedValue(mockImages);

      const images = await imageService.getAll();

      expect(images).toEqual(mockImages);
      expect(dbConnect).toHaveBeenCalledTimes(1);
      expect(Image.find).toHaveBeenCalledWith({});
    });

    it("❌ should throw an error on database failure", async () => {
      (mockedImage.find as jest.Mock).mockRejectedValue(new Error("DB error"));
      await expect(imageService.getAll()).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });

  describe("getById", () => {
    it("✅ should return an image by ID successfully", async () => {
      (mockedImage.findById as jest.Mock).mockResolvedValue(mockImage);

      const image = await imageService.getById(mockImage._id);

      expect(image).toEqual(mockImage);
      expect(Image.findById).toHaveBeenCalledWith(mockImage._id);
    });

    it("❌ should throw NotFoundException if image is not found", async () => {
      (mockedImage.findById as jest.Mock).mockResolvedValue(null);

      await expect(imageService.getById("nonexistent-id")).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe("create", () => {
    const mockFile = new File(["dummy content"], "test-image.jpg", {
      type: "image/jpeg",
    });
    const mockFormData = new FormData();
    mockFormData.append("file", mockFile);
    mockFormData.append("alt", "Test Alt Text");
    mockFormData.append("folder", "test_subfolder");

    const mockCloudinaryResponse = {
      asset_id: "asset_new",
      public_id: "public_new",
      width: 100,
      height: 100,
      folder: `${CLOUDINARY_FOLDER}/test_subfolder`,
      url: "http://new-image.com/img.png",
    };

    it("✅ should create an image successfully", async () => {
      mockedCloudinaryService.upload.mockResolvedValue(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mockCloudinaryResponse as any
      );
      (mockedImage.create as jest.Mock).mockResolvedValue({
        ...mockCloudinaryResponse,
        alt: "Test Alt Text",
      });

      const newImage = await imageService.create(mockFormData);

      expect(cloudinaryService.upload).toHaveBeenCalledWith({
        file: mockFile,
        folder: `${CLOUDINARY_FOLDER}/test_subfolder`,
      });
      expect(Image.create).toHaveBeenCalledWith({
        alt: "Test Alt Text",
        asset_id: mockCloudinaryResponse.asset_id,
        public_id: mockCloudinaryResponse.public_id,
        folder: mockCloudinaryResponse.folder,
        url: mockCloudinaryResponse.url,
        width: mockCloudinaryResponse.width,
        height: mockCloudinaryResponse.height,
      });
      expect(newImage.asset_id).toBe(mockCloudinaryResponse.asset_id);
    });

    it("❌ should re-throw ZodError on invalid form data", async () => {
      const invalidFormData = new FormData();
      invalidFormData.append("file", "not-a-file");
      invalidFormData.append("alt", "");

      await expect(imageService.create(invalidFormData)).rejects.toThrow(
        ZodError
      );
    });

    it("❌ should throw error if Cloudinary upload fails", async () => {
      mockedCloudinaryService.upload.mockRejectedValue(
        new Error("Upload failed")
      );
      await expect(imageService.create(mockFormData)).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });

  describe("update", () => {
    const updateData = { alt: "Updated alt text" };
    const updatedImage = { ...mockImage, ...updateData };

    it("✅ should update and return the image", async () => {
      (mockedImage.findById as jest.Mock).mockResolvedValue(mockImage);
      const findByIdAndUpdateMock = {
        exec: jest.fn().mockResolvedValue(updatedImage),
      };
      (mockedImage.findByIdAndUpdate as jest.Mock).mockReturnValue(
        findByIdAndUpdateMock
      );

      const result = await imageService.update(mockImage._id, updateData);

      expect(Image.findById).toHaveBeenCalledWith(mockImage._id);
      expect(Image.findByIdAndUpdate).toHaveBeenCalledWith(
        mockImage._id,
        updateData,
        { new: true }
      );
      expect(result).toEqual(updatedImage);
    });

    it("❌ should throw NotFoundException if image to update does not exist", async () => {
      (mockedImage.findById as jest.Mock).mockResolvedValue(null);
      await expect(
        imageService.update("nonexistent-id", updateData)
      ).rejects.toThrow(NotFoundException);
    });
  });

  // --- Pruebas para el método delete ---
  describe("delete", () => {
    it("✅ should delete an image and its Cloudinary asset", async () => {
      (mockedImage.findById as jest.Mock).mockResolvedValue(mockImage);
      mockedCloudinaryService.deleteByAssetId.mockResolvedValue(undefined);
      const findByIdAndDeleteMock = {
        exec: jest.fn().mockResolvedValue(mockImage),
      };
      (mockedImage.findByIdAndDelete as jest.Mock).mockReturnValue(
        findByIdAndDeleteMock
      );

      await imageService.delete(mockImage._id);

      expect(Image.findById).toHaveBeenCalledWith(mockImage._id);
      expect(cloudinaryService.deleteByAssetId).toHaveBeenCalledWith(
        mockImage.asset_id
      );
      expect(Image.findByIdAndDelete).toHaveBeenCalledWith(mockImage._id);
    });

    it("❌ should throw error if Cloudinary deletion fails", async () => {
      (mockedImage.findById as jest.Mock).mockResolvedValue(mockImage);
      mockedCloudinaryService.deleteByAssetId.mockRejectedValue(
        new Error("Deletion failed")
      );

      await expect(imageService.delete(mockImage._id)).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });
});
