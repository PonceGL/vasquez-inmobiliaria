import { CLOUDINARY_FOLDER } from "@/app/constants/cloudinary";
import { cloudinaryService } from "@/app/lib/cloudinary/cloudinary.service";
import { dbConnect } from "@/app/lib/mongodb";

import {
  CreateImageDto,
  createImageDto,
  UpdateImageDto,
  updateImageDto,
} from "./dtos/image.dto";
import { IImage, Image } from "./image.entity";

class ImageService {
  public async getAll(): Promise<IImage[]> {
    await dbConnect();
    const images = await Image.find({});
    return images;
  }

  public async getById(id: string): Promise<IImage> {
    await dbConnect();
    const image = await Image.findById(id);
    if (!image) {
      throw new Error("Imagen no encontrada.");
    }
    return image;
  }

  public async create(formData: FormData): Promise<IImage> {
    const file = formData.get("file") as File;
    if (!file) {
      throw new Error("No se encontró la imagen en el FormData");
    }
    const alt = formData.get("alt") as string;
    const folderToSave = formData.get("folder") as string;

    if (!CLOUDINARY_FOLDER) {
      throw new Error("CLOUDINARY_FOLDER no esta disponible");
    }
    const cloudinaryImage = await cloudinaryService.upload({
      file,
      folder: `${CLOUDINARY_FOLDER}/${folderToSave ?? ""}`,
    });

    if (!cloudinaryImage) {
      throw new Error("error al crear cloudinaryImage");
    }

    const { asset_id, public_id, width, height, folder, url } = cloudinaryImage;

    const imageData: CreateImageDto = {
      alt: alt ?? file.name,
      asset_id,
      public_id,
      folder,
      url,
      width,
      height,
    };

    createImageDto.parse(imageData);

    await dbConnect();
    const newImage = await Image.create(imageData);
    return newImage;
  }

  public async update(id: string, imageData: UpdateImageDto): Promise<IImage> {
    updateImageDto.parse(imageData);

    await this.getById(id);

    await dbConnect();
    const updatedImage = await Image.findByIdAndUpdate(id, imageData, {
      new: true,
    }).exec();

    if (!updatedImage) {
      throw new Error("Imagen no actualizada.");
    }
    return this.getById(id);
  }

  public async delete(id: string): Promise<IImage | null> {
    const image = await this.getById(id);
    await cloudinaryService.deleteByAssetId(image.asset_id);
    await dbConnect();
    const deletedImage = await Image.findByIdAndDelete(id).exec();
    return deletedImage;
  }
}

export const imageService = new ImageService();
