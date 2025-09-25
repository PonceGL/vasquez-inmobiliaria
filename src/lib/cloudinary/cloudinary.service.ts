import axios from "axios";

import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_PRESET,
  CLOUDINARY_URL,
} from "@/constants/cloudinary";
import {
  Images,
  ImagesByFolderSucces,
  ImagesUpload,
  UploadImageSucces,
} from "@/types/cloudinary/image";

class CloudinaryService {
  private static URL: string = CLOUDINARY_URL;
  private static username: string = CLOUDINARY_API_KEY;
  private static password: string = CLOUDINARY_API_SECRET;

  private static getBasicAuth() {
    const credentials = Buffer.from(
      `${CloudinaryService.username}:${CloudinaryService.password}`
    ).toString("base64");
    return `Basic ${credentials}`;
  }

  public async getByFolder(folder: string): Promise<Images[]> {
    const config = {
      method: "get",
      url: `${CloudinaryService.URL}/resources/image?prefix=${folder}&type=upload`,
      headers: {
        Authorization: CloudinaryService.getBasicAuth(),
      },
    };

    try {
      const response = await axios.request<ImagesByFolderSucces>(config);
      const resources = response.data?.resources;
      if (!resources) {
        throw new Error("No resources found"); // TODO: handle
      }
      return resources;
    } catch (error) {
      console.log(error);
      throw new Error("Error in getByFolder"); // TODO: handle
    }
  }

  public async upload({ file, folder }: ImagesUpload) {
    const data = new FormData();
    data.append("upload_preset", CLOUDINARY_PRESET);
    data.append("folder", folder);
    data.append("file", file);

    const config = {
      method: "post",
      url: `${CloudinaryService.URL}/image/upload`,
      headers: {
        Authorization: CloudinaryService.getBasicAuth(),
      },
      data: data,
    };

    try {
      const response = await axios.request<UploadImageSucces>(config);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Error in upload"); // TODO: handle
    }
  }

  public async deleteByAssetId(assetId: string) {
    const data = new FormData();
    data.append("asset_ids[]", assetId);

    const config = {
      method: "delete",
      url: `${CloudinaryService.URL}/resources`,
      headers: {
        Authorization: CloudinaryService.getBasicAuth(),
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Error in delete"); // TODO: handle
    }
  }
}

export const cloudinaryService = new CloudinaryService();

