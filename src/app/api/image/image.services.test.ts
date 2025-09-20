import { UploadImageSucces } from "@/app/types/cloudinary/image";

import { UpdateImageDto } from "./dtos/image.dto";
import { IImage } from "./image.entity";
import { imageService } from "./image.services";

jest.mock("@/app/lib/mongodb", () => ({
  dbConnect: jest.fn(),
}));

jest.mock("@/app/lib/cloudinary/cloudinary.service", () => ({
  cloudinaryService: {
    upload: jest.fn(),
    deleteByAssetId: jest.fn(),
  },
}));

jest.mock("@/app/constants/cloudinary", () => ({
  CLOUDINARY_FOLDER: "test-folder",
}));

jest.mock("./image.entity", () => ({
  Image: {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn().mockReturnValue({
      exec: jest.fn(),
    }),
    findByIdAndDelete: jest.fn().mockReturnValue({
      exec: jest.fn(),
    }),
  },
}));

import { cloudinaryService } from "@/app/lib/cloudinary/cloudinary.service";

import { Image } from "./image.entity";

type MockCloudinaryService = {
  upload: jest.MockedFunction<typeof cloudinaryService.upload>;
  deleteByAssetId: jest.MockedFunction<
    typeof cloudinaryService.deleteByAssetId
  >;
};

type MockImageMethods = {
  find: jest.MockedFunction<typeof Image.find>;
  findById: jest.MockedFunction<typeof Image.findById>;
  create: jest.MockedFunction<typeof Image.create>;
  findByIdAndUpdate: jest.MockedFunction<typeof Image.findByIdAndUpdate>;
  findByIdAndDelete: jest.MockedFunction<typeof Image.findByIdAndDelete>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MockCreateResult = any;

const mockCloudinaryService =
  cloudinaryService as unknown as MockCloudinaryService;
const mockImageMethods = Image as unknown as MockImageMethods;

describe("ImageService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("should return all images", async () => {
      const mockImages: IImage[] = [
        {
          _id: "image1",
          url: "https://test.com/image1.jpg",
          asset_id: "asset1",
          public_id: "public1",
          folder: "test-folder",
          alt: "Test image 1",
          width: 800,
          height: 600,
        } as IImage,
      ];

      mockImageMethods.find.mockResolvedValueOnce(
        mockImages as unknown as IImage[]
      );

      const result = await imageService.getAll();

      expect(mockImageMethods.find).toHaveBeenCalledWith({});
      expect(result).toEqual(mockImages);
    });

    it("should return empty array when no images exist", async () => {
      mockImageMethods.find.mockResolvedValueOnce([] as unknown as IImage[]);

      const result = await imageService.getAll();

      expect(result).toEqual([]);
    });
  });

  describe("getById", () => {
    it("should return image when found", async () => {
      const mockImageData: IImage = {
        _id: "image1",
        url: "https://test.com/image1.jpg",
        asset_id: "asset1",
        public_id: "public1",
        folder: "test-folder",
        alt: "Test image 1",
        width: 800,
        height: 600,
      } as IImage;

      mockImageMethods.findById.mockResolvedValueOnce(mockImageData);

      const result = await imageService.getById("image1");

      expect(mockImageMethods.findById).toHaveBeenCalledWith("image1");
      expect(result).toEqual(mockImageData);
    });

    it("should throw error when image not found", async () => {
      mockImageMethods.findById.mockResolvedValueOnce(null);

      await expect(imageService.getById("nonexistent")).rejects.toThrow(
        "Imagen no encontrada."
      );
    });
  });

  describe("create", () => {
    const mockFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
    const mockFormData = new FormData();
    mockFormData.append("file", mockFile);
    mockFormData.append("alt", "Test image description");
    mockFormData.append("folder", "subfolder");

    const mockCloudinaryResponse = {
      asset_id: "asset1",
      public_id: "public1",
      version: 1,
      version_id: "version1",
      signature: "signature1",
      width: 800,
      height: 600,
      format: "jpg",
      resource_type: "image",
      created_at: "2023-01-01T00:00:00Z",
      tags: [],
      pages: 1,
      bytes: 1024,
      type: "upload",
      etag: "etag1",
      placeholder: false,
      url: "https://test.com/image1.jpg",
      secure_url: "https://test.com/image1.jpg",
      folder: "test-folder/subfolder",
      access_mode: "public",
      image_metadata: {
        XResolution: "72",
        YResolution: "72",
        ResolutionUnit: "2",
        UserComment: "",
        ExifImageWidth: "800",
        ExifImageHeight: "600",
        XMPToolkit: "",
        PixelsPerUnitX: "72",
        PixelsPerUnitY: "72",
        PixelUnits: "2",
        ProfileDescription: "",
        Colorspace: "sRGB",
        DPI: "72",
      },
      illustration_score: 0.1,
      semi_transparent: false,
      grayscale: false,
      quality_analysis: {
        focus: 0.95,
      },
      original_filename: "test.jpg",
    };

    const mockCreatedImage: IImage = {
      _id: "image1",
      url: "https://test.com/image1.jpg",
      asset_id: "asset1",
      public_id: "public1",
      folder: "test-folder/subfolder",
      alt: "Test image description",
      width: 800,
      height: 600,
    } as IImage;

    it("should create image successfully", async () => {
      mockCloudinaryService.upload.mockResolvedValueOnce(
        mockCloudinaryResponse
      );
      mockImageMethods.create.mockResolvedValueOnce([
        mockCreatedImage,
      ] as MockCreateResult);

      const result = await imageService.create(mockFormData);

      expect(mockCloudinaryService.upload).toHaveBeenCalledWith({
        file: mockFile,
        folder: "test-folder/subfolder",
      });
      expect(mockImageMethods.create).toHaveBeenCalledWith({
        alt: "Test image description",
        asset_id: "asset1",
        public_id: "public1",
        folder: "test-folder/subfolder",
        url: "https://test.com/image1.jpg",
        width: 800,
        height: 600,
      });
      expect(result).toEqual([mockCreatedImage]);
    });

    it("should use file name as alt when alt is not provided", async () => {
      const formDataWithoutAlt = new FormData();
      formDataWithoutAlt.append("file", mockFile);
      formDataWithoutAlt.append("folder", "subfolder");

      mockCloudinaryService.upload.mockResolvedValueOnce(
        mockCloudinaryResponse
      );
      mockImageMethods.create.mockResolvedValueOnce([
        mockCreatedImage,
      ] as MockCreateResult);

      await imageService.create(formDataWithoutAlt);

      expect(mockImageMethods.create).toHaveBeenCalledWith(
        expect.objectContaining({
          alt: "test.jpg",
        })
      );
    });

    it("should throw error when file is not found in FormData", async () => {
      const formDataWithoutFile = new FormData();
      formDataWithoutFile.append("alt", "Test image description");

      await expect(imageService.create(formDataWithoutFile)).rejects.toThrow(
        "No se encontró la imagen en el FormData"
      );
    });

    it("should handle cloudinary upload failure correctly", async () => {
      mockCloudinaryService.upload.mockResolvedValueOnce(
        null as unknown as UploadImageSucces
      );

      await expect(imageService.create(mockFormData)).rejects.toThrow(
        "error al crear cloudinaryImage"
      );
    });

    it("should throw error when cloudinary upload fails", async () => {
      mockCloudinaryService.upload.mockResolvedValueOnce(
        null as unknown as UploadImageSucces
      );

      await expect(imageService.create(mockFormData)).rejects.toThrow(
        "error al crear cloudinaryImage"
      );
    });
  });

  describe("update", () => {
    const mockUpdateData: UpdateImageDto = {
      alt: "Updated image description",
      width: 1000,
    };

    const mockExistingImage: IImage = {
      _id: "image1",
      url: "https://test.com/image1.jpg",
      asset_id: "asset1",
      public_id: "public1",
      folder: "test-folder",
      alt: "Test image 1",
      width: 800,
      height: 600,
    } as IImage;

    const mockUpdatedImage: IImage = {
      ...mockExistingImage,
      alt: "Updated image description",
      width: 1000,
    } as IImage;

    it("should update image successfully", async () => {
      mockImageMethods.findById.mockResolvedValueOnce(mockExistingImage);

      const mockExec = jest.fn().mockResolvedValueOnce(mockUpdatedImage);
      mockImageMethods.findByIdAndUpdate.mockReturnValueOnce({
        exec: mockExec,
      } as unknown as ReturnType<typeof Image.findByIdAndUpdate>);

      mockImageMethods.findById.mockResolvedValueOnce(mockUpdatedImage);

      const result = await imageService.update("image1", mockUpdateData);

      expect(mockImageMethods.findByIdAndUpdate).toHaveBeenCalledWith(
        "image1",
        mockUpdateData,
        { new: true }
      );
      expect(mockExec).toHaveBeenCalled();
      expect(result).toEqual(mockUpdatedImage);
    });

    it("should throw error when image not found for update", async () => {
      mockImageMethods.findById.mockResolvedValueOnce(null);

      await expect(
        imageService.update("nonexistent", mockUpdateData)
      ).rejects.toThrow("Imagen no encontrada.");
    });

    it("should throw error when update fails", async () => {
      mockImageMethods.findById.mockResolvedValueOnce(mockExistingImage);
      const mockExec = jest.fn().mockResolvedValueOnce(null);
      mockImageMethods.findByIdAndUpdate.mockReturnValueOnce({
        exec: mockExec,
      } as unknown as ReturnType<typeof Image.findByIdAndUpdate>);

      await expect(
        imageService.update("image1", mockUpdateData)
      ).rejects.toThrow("Imagen no actualizada.");
    });
  });

  describe("delete", () => {
    const mockImageToDelete: IImage = {
      _id: "image1",
      url: "https://test.com/image1.jpg",
      asset_id: "asset1",
      public_id: "public1",
      folder: "test-folder",
      alt: "Test image 1",
      width: 800,
      height: 600,
    } as IImage;

    it("should delete image successfully", async () => {
      mockImageMethods.findById.mockResolvedValueOnce(mockImageToDelete);
      mockCloudinaryService.deleteByAssetId.mockResolvedValueOnce({});
      const mockExec = jest.fn().mockResolvedValueOnce(mockImageToDelete);
      mockImageMethods.findByIdAndDelete.mockReturnValueOnce({
        exec: mockExec,
      } as unknown as ReturnType<typeof Image.findByIdAndDelete>);

      const result = await imageService.delete("image1");

      expect(mockImageMethods.findById).toHaveBeenCalledWith("image1");
      expect(mockCloudinaryService.deleteByAssetId).toHaveBeenCalledWith(
        "asset1"
      );
      expect(mockImageMethods.findByIdAndDelete).toHaveBeenCalledWith("image1");
      expect(mockExec).toHaveBeenCalled();
      expect(result).toEqual(mockImageToDelete);
    });

    it("should throw error when image not found for deletion", async () => {
      mockImageMethods.findById.mockResolvedValueOnce(null);

      await expect(imageService.delete("nonexistent")).rejects.toThrow(
        "Imagen no encontrada."
      );
    });
  });

  describe("FormData handling", () => {
    it("should handle FormData with all fields correctly", async () => {
      const mockFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
      const formData = new FormData();
      formData.append("file", mockFile);
      formData.append("alt", "Test image description");
      formData.append("folder", "subfolder");

      const mockCloudinaryResponse = {
        asset_id: "asset1",
        public_id: "public1",
        version: 1,
        version_id: "version1",
        signature: "signature1",
        width: 800,
        height: 600,
        format: "jpg",
        resource_type: "image",
        created_at: "2023-01-01T00:00:00Z",
        tags: [],
        pages: 1,
        bytes: 1024,
        type: "upload",
        etag: "etag1",
        placeholder: false,
        url: "https://test.com/image1.jpg",
        secure_url: "https://test.com/image1.jpg",
        folder: "test-folder/subfolder",
        access_mode: "public",
        image_metadata: {
          XResolution: "72",
          YResolution: "72",
          ResolutionUnit: "2",
          UserComment: "",
          ExifImageWidth: "800",
          ExifImageHeight: "600",
          XMPToolkit: "",
          PixelsPerUnitX: "72",
          PixelsPerUnitY: "72",
          PixelUnits: "2",
          ProfileDescription: "",
          Colorspace: "sRGB",
          DPI: "72",
        },
        illustration_score: 0.1,
        semi_transparent: false,
        grayscale: false,
        quality_analysis: {
          focus: 0.95,
        },
        original_filename: "test.jpg",
      };

      const mockCreatedImage: IImage = {
        _id: "image1",
        url: "https://test.com/image1.jpg",
        asset_id: "asset1",
        public_id: "public1",
        folder: "test-folder/subfolder",
        alt: "Test image description",
        width: 800,
        height: 600,
      } as IImage;

      mockCloudinaryService.upload.mockResolvedValueOnce(
        mockCloudinaryResponse
      );
      mockImageMethods.create.mockResolvedValueOnce([
        mockCreatedImage,
      ] as MockCreateResult);

      const result = await imageService.create(formData);

      expect(result).toEqual([mockCreatedImage]);
    });

    it("should handle FormData without folder correctly", async () => {
      const mockFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
      const formData = new FormData();
      formData.append("file", mockFile);
      formData.append("alt", "Test image description");

      const mockCloudinaryResponse = {
        asset_id: "asset1",
        public_id: "public1",
        version: 1,
        version_id: "version1",
        signature: "signature1",
        width: 800,
        height: 600,
        format: "jpg",
        resource_type: "image",
        created_at: "2023-01-01T00:00:00Z",
        tags: [],
        pages: 1,
        bytes: 1024,
        type: "upload",
        etag: "etag1",
        placeholder: false,
        url: "https://test.com/image1.jpg",
        secure_url: "https://test.com/image1.jpg",
        folder: "test-folder/",
        access_mode: "public",
        image_metadata: {
          XResolution: "72",
          YResolution: "72",
          ResolutionUnit: "2",
          UserComment: "",
          ExifImageWidth: "800",
          ExifImageHeight: "600",
          XMPToolkit: "",
          PixelsPerUnitX: "72",
          PixelsPerUnitY: "72",
          PixelUnits: "2",
          ProfileDescription: "",
          Colorspace: "sRGB",
          DPI: "72",
        },
        illustration_score: 0.1,
        semi_transparent: false,
        grayscale: false,
        quality_analysis: {
          focus: 0.95,
        },
        original_filename: "test.jpg",
      };

      mockCloudinaryService.upload.mockResolvedValueOnce(
        mockCloudinaryResponse
      );
      mockImageMethods.create.mockResolvedValueOnce([{}] as MockCreateResult);

      await imageService.create(formData);

      expect(mockCloudinaryService.upload).toHaveBeenCalledWith({
        file: mockFile,
        folder: "test-folder/",
      });
    });
  });
});
