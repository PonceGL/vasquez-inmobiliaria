import { MongooseError } from "mongoose";
import { ZodError } from "zod";

import {
  CreateImageDto,
  createImageDto,
  createImageFromFormDataDto,
  createManyImagesDto,
  UpdateImageDto,
  updateImageDto,
} from "@/app/api/image/dtos/image.dto";
import { IImage, Image } from "@/app/api/image/image.entity";
import { CLOUDINARY_FOLDER } from "@/constants/cloudinary";
import { IS_DEV } from "@/constants/enviroment";
import { cloudinaryService } from "@/lib/cloudinary/cloudinary.service";
import {
  BadRequestError,
  HttpError,
  ImageNotFoundException,
  InternalServerErrorException,
} from "@/lib/httpErrors";
import { dbConnect } from "@/lib/mongodb";
import { UploadImageSucces } from "@/types/cloudinary/image";

class ImageService {
  public async getAll(): Promise<IImage[]> {
    try {
      await dbConnect();
      const images = await Image.find({}).select("-__v");
      return images;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al obtener las imágenes.",
      });
    }
  }

  public async getById(id: string): Promise<IImage> {
    try {
      await dbConnect();
      const image = await Image.findById(id).select("-__v");
      if (!image) {
        throw new ImageNotFoundException(
          `Imagen no encontrada${IS_DEV ? ` id: ${id}` : "."}`
        );
      }
      return image;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "La imagen no se encontró.",
      });
    }
  }

  public async create(formData: FormData): Promise<IImage> {
    try {
      const validatedData = createImageFromFormDataDto.parse({
        file: formData.get("file"),
        alt: formData.get("alt"),
        folder: formData.get("folder"),
      });

      const { file, alt, folder: folderToSave } = validatedData;

      const { cloudinaryImage } = await this.uploadToCloudinary(
        file,
        folderToSave
      );

      const imageData: CreateImageDto = {
        alt: alt.trim(),
        asset_id: cloudinaryImage.asset_id,
        public_id: cloudinaryImage.public_id,
        folder: cloudinaryImage.folder,
        url: cloudinaryImage.url,
        width: cloudinaryImage.width,
        height: cloudinaryImage.height,
      };

      createImageDto.parse(imageData);
      const newImage = await this.saveImageToDB(imageData);
      return newImage;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al crear la imagen.",
      });
    }
  }

  public async createMany(formData: FormData): Promise<IImage[]> {
    try {
      const dataToValidate = {
        files: formData.getAll("files"),
        alts: formData.getAll("alts"),
        folder: formData.get("folder"),
      };

      const validatedData = createManyImagesDto.parse(dataToValidate);

      const { files, alts, folder } = validatedData;

      const filesToProcess = files.map((file, index) => ({
        file,
        alt: alts[index],
      }));

      const newImages = await Promise.all(
        filesToProcess.map(async ({ file, alt }) => {
          const { cloudinaryImage } = await this.uploadToCloudinary(
            file,
            folder
          );
          if (!cloudinaryImage) {
            throw new InternalServerErrorException(
              "error al crear cloudinary Image"
            );
          }
          return await this.saveImageToDB({
            alt: alt.trim(),
            asset_id: cloudinaryImage.asset_id,
            public_id: cloudinaryImage.public_id,
            folder: cloudinaryImage.folder,
            url: cloudinaryImage.url,
            width: cloudinaryImage.width,
            height: cloudinaryImage.height,
          });
        })
      );

      if (newImages.length === 0) {
        throw new InternalServerErrorException("No se crearon las imágenes.");
      }

      return newImages;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al crear la imagen.",
      });
    }
  }

  public async update(id: string, imageData: UpdateImageDto): Promise<IImage> {
    try {
      const validatedData = updateImageDto.parse(imageData);

      await this.getById(id);

      await dbConnect();
      const updatedImage = await Image.findByIdAndUpdate(id, validatedData, {
        new: true,
        runValidators: true,
      }).exec();

      if (!updatedImage) {
        throw new InternalServerErrorException("Imagen no actualizada.");
      }
      return updatedImage;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al actualizar la imagen.",
      });
    }
  }

  public async delete(id: string): Promise<IImage | null> {
    try {
      const image = await this.getById(id);
      await cloudinaryService.deleteByAssetId(image.asset_id);
      await dbConnect();
      const deletedImage = await Image.findByIdAndDelete(id).exec();
      return deletedImage;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al eliminar la imagen.",
      });
    }
  }

  private async uploadToCloudinary(
    file: File,
    folder?: string
  ): Promise<{ cloudinaryImage: UploadImageSucces }> {
    const cloudinaryImage = await cloudinaryService.upload({
      file,
      folder: `${CLOUDINARY_FOLDER}/${folder ?? ""}`,
    });

    if (!cloudinaryImage) {
      throw new InternalServerErrorException("error al crear cloudinary Image");
    }
    return { cloudinaryImage };
  }

  private async saveImageToDB(imageData: CreateImageDto): Promise<IImage> {
    createImageDto.parse(imageData);

    await dbConnect();
    const newImage = await Image.create(imageData);
    return newImage;
  }

  private handleServiceError(
    error: unknown,
    customMessages?: { [key: string]: string }
  ): Error {
    if (error instanceof HttpError || error instanceof ZodError) {
      return error;
    }

    if (error instanceof MongooseError) {
      const message = customMessages?.mongoose || "Error en la base de datos.";
      return new BadRequestError(IS_DEV ? error.message : message);
    }

    const message = customMessages?.internal || "Error interno.";
    return new InternalServerErrorException(
      IS_DEV ? (error as Error).message : message
    );
  }
}

export const imageService = new ImageService();
