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
  private URL: string;
  private username: string;
  private password: string;

  constructor() {
    this.URL = CLOUDINARY_URL;
    this.username = CLOUDINARY_API_KEY || "";
    this.password = CLOUDINARY_API_SECRET || "";
  }

  private getBasicAuth() {
    const credentials = Buffer.from(
      `${this.username}:${this.password}`
    ).toString("base64");
    return `Basic ${credentials}`;
  }

  public async getByFolder(folder: string): Promise<Images[]> {
    const config = {
      method: "get",
      url: `${this.URL}/resources/image?prefix=${folder}&type=upload`,
      headers: {
        Authorization: this.getBasicAuth(),
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
    if (!CLOUDINARY_PRESET) {
      throw new Error("CLOUDINARY_PRESET no esta disponible");
    }
    const data = new FormData();
    data.append("upload_preset", CLOUDINARY_PRESET);
    data.append("folder", folder);
    data.append("file", file);

    const config = {
      method: "post",
      url: `${this.URL}/image/upload`,
      headers: {
        Authorization: this.getBasicAuth(),
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
      url: `${this.URL}/resources`,
      headers: {
        Authorization: this.getBasicAuth(),
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Error in upload"); // TODO: handle
    }
  }
}

export const cloudinaryService = new CloudinaryService();
