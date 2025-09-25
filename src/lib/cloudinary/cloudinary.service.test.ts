import axios from "axios";

import { cloudinaryService } from "@/lib/cloudinary/cloudinary.service";
import {
  Images,
  ImagesByFolderSucces,
  UploadImageSucces,
} from "@/types/cloudinary/image";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("@/constants/cloudinary", () => ({
  CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/test-cloud",
  CLOUDINARY_API_KEY: "test-api-key",
  CLOUDINARY_API_SECRET: "test-api-secret",
  CLOUDINARY_PRESET: "test-preset",
}));

describe("CloudinaryService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getByFolder", () => {
    const mockImages: Images[] = [
      {
        asset_id: "test-asset-1",
        public_id: "test-public-1",
        format: "jpg",
        version: 1,
        resource_type: "image",
        type: "upload",
        created_at: "2023-01-01T00:00:00Z",
        bytes: 1024,
        width: 800,
        height: 600,
        folder: "test-folder",
        access_mode: "public",
        url: "http://test.com/image1.jpg",
        secure_url: "https://test.com/image1.jpg",
      },
    ];

    it("should return images when API call is successful", async () => {
      const mockResponse: ImagesByFolderSucces = {
        resources: mockImages,
      };

      mockedAxios.request.mockResolvedValueOnce({
        data: mockResponse,
      });

      const result = await cloudinaryService.getByFolder("test-folder");

      expect(mockedAxios.request).toHaveBeenCalledWith({
        method: "get",
        url: "https://api.cloudinary.com/v1_1/test-cloud/resources/image?prefix=test-folder&type=upload",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from("test-api-key:test-api-secret").toString("base64"),
        },
      });
      expect(result).toEqual(mockImages);
    });

    it("should throw error when no resources are found", async () => {
      mockedAxios.request.mockResolvedValueOnce({
        data: {},
      });

      await expect(
        cloudinaryService.getByFolder("test-folder")
      ).rejects.toThrow("Error in getByFolder");
    });

    it("should throw error when API call fails", async () => {
      mockedAxios.request.mockRejectedValueOnce(new Error("API Error"));

      await expect(
        cloudinaryService.getByFolder("test-folder")
      ).rejects.toThrow("Error in getByFolder");
    });
  });

  describe("upload", () => {
    const mockFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
    const mockUploadData = {
      file: mockFile,
      folder: "test-folder",
    };

    const mockUploadResponse: UploadImageSucces = {
      asset_id: "test-asset-1",
      public_id: "test-public-1",
      version: 1,
      version_id: "test-version-1",
      signature: "test-signature",
      width: 800,
      height: 600,
      format: "jpg",
      resource_type: "image",
      created_at: "2023-01-01T00:00:00Z",
      tags: [],
      pages: 1,
      bytes: 1024,
      type: "upload",
      etag: "test-etag",
      placeholder: false,
      url: "http://test.com/image1.jpg",
      secure_url: "https://test.com/image1.jpg",
      folder: "test-folder",
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

    it("should upload image successfully", async () => {
      mockedAxios.request.mockResolvedValueOnce({
        data: mockUploadResponse,
      });

      const result = await cloudinaryService.upload(mockUploadData);

      expect(mockedAxios.request).toHaveBeenCalledWith({
        method: "post",
        url: "https://api.cloudinary.com/v1_1/test-cloud/image/upload",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from("test-api-key:test-api-secret").toString("base64"),
        },
        data: expect.any(FormData),
      });
      expect(result).toEqual(mockUploadResponse);
    });

    it("should handle upload with preset correctly", async () => {
      mockedAxios.request.mockResolvedValueOnce({
        data: mockUploadResponse,
      });

      const result = await cloudinaryService.upload(mockUploadData);

      expect(result).toEqual(mockUploadResponse);
      expect(mockedAxios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "post",
          url: "https://api.cloudinary.com/v1_1/test-cloud/image/upload",
        })
      );
    });

    it("should throw error when API call fails", async () => {
      mockedAxios.request.mockRejectedValueOnce(new Error("Upload failed"));

      await expect(cloudinaryService.upload(mockUploadData)).rejects.toThrow(
        "Error in upload"
      );
    });
  });

  describe("deleteByAssetId", () => {
    const assetId = "test-asset-1";

    it("should delete image successfully", async () => {
      const mockDeleteResponse = {
        deleted: {
          [assetId]: "deleted",
        },
      };

      mockedAxios.request.mockResolvedValueOnce({
        data: mockDeleteResponse,
      });

      const result = await cloudinaryService.deleteByAssetId(assetId);

      expect(mockedAxios.request).toHaveBeenCalledWith({
        method: "delete",
        url: "https://api.cloudinary.com/v1_1/test-cloud/resources",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from("test-api-key:test-api-secret").toString("base64"),
        },
        data: expect.any(FormData),
      });
      expect(result).toEqual(mockDeleteResponse);
    });

    it("should throw error when API call fails", async () => {
      mockedAxios.request.mockRejectedValueOnce(new Error("Delete failed"));

      await expect(cloudinaryService.deleteByAssetId(assetId)).rejects.toThrow(
        "Error in delete"
      );
    });
  });

  describe("FormData validation", () => {
    it("should create correct FormData for upload", async () => {
      const mockFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
      const mockUploadData = {
        file: mockFile,
        folder: "test-folder",
      };

      mockedAxios.request.mockResolvedValueOnce({
        data: {},
      });

      await cloudinaryService.upload(mockUploadData);

      const callArgs = mockedAxios.request.mock.calls[0][0];
      const formData = callArgs.data as FormData;

      expect(formData.get("upload_preset")).toBe("test-preset");
      expect(formData.get("folder")).toBe("test-folder");
      expect(formData.get("file")).toBe(mockFile);
    });

    it("should create correct FormData for delete", async () => {
      const assetId = "test-asset-1";

      mockedAxios.request.mockResolvedValueOnce({
        data: {},
      });

      await cloudinaryService.deleteByAssetId(assetId);

      const callArgs = mockedAxios.request.mock.calls[0][0];
      const formData = callArgs.data as FormData;

      expect(formData.get("asset_ids[]")).toBe(assetId);
    });
  });
});
