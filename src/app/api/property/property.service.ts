import { MongoServerError } from "mongodb";
import { MongooseError, Query } from "mongoose";
import slugify from "slugify";
import { ZodError } from "zod";

import { imageService } from "@/app/api/image/image.service";
import {
  CreatePropertyDto,
  createPropertyDto,
  UpdatePropertyDTO,
  updatePropertySchema,
} from "@/app/api/property/dtos/property.dto";
import { House } from "@/app/api/property/models/house.entity";
import { Land } from "@/app/api/property/models/land.entity";
import { OtherProperty } from "@/app/api/property/models/other.entity";
import { IProperty, Property } from "@/app/api/property/models/property.entity";
import { userService } from "@/app/api/user/user.service";
import { IS_DEV } from "@/constants/enviroment";
import { PROPERTY_POPULATABLE_FIELDS } from "@/constants/property";
import {
  BadRequestError,
  HttpError,
  ImageNotFoundException,
  InternalServerErrorException,
  NotFoundException,
  UserNotFoundException,
} from "@/lib/httpErrors";
import { dbConnect } from "@/lib/mongodb";
import { PROPERTY_POPULATE_FIELDS } from "@/types/property";

class PropertyService {
  public async getAll(
    populateFields: PROPERTY_POPULATE_FIELDS[] = []
  ): Promise<IProperty[]> {
    try {
      await dbConnect();
      const baseQuery = Property.find({});

      const finalQuery = this._applyDynamicPopulation(
        baseQuery,
        populateFields
      );

      const properties = await finalQuery
        .select("-__t")
        .select("-__v")
        .lean<IProperty[]>()
        .exec();

      return properties;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al obtener propiedades.",
      });
    }
  }

  public async getById(
    id: string,
    populateFields: PROPERTY_POPULATE_FIELDS[] = []
  ): Promise<IProperty> {
    try {
      await dbConnect();
      const baseQuery = Property.findById(id);

      const finalQuery = this._applyDynamicPopulation(
        baseQuery,
        populateFields
      );

      const property = await finalQuery
        .select("-__t")
        .select("-__v")
        .lean<IProperty>()
        .exec();

      if (!property) {
        throw new NotFoundException("Propiedad no encontrada.");
      }

      return property;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al obtener la propiedad.",
      });
    }
  }

  public async getBySlug(
    slug: string,
    populateFields: PROPERTY_POPULATE_FIELDS[] = []
  ): Promise<IProperty> {
    try {
      await dbConnect();

      const baseQuery = Property.findOne({ slug: slug });

      const finalQuery = this._applyDynamicPopulation(
        baseQuery,
        populateFields
      );

      const property = await finalQuery
        .select("-__t")
        .select("-__v")
        .lean<IProperty>()
        .exec();
      if (!property) {
        throw new NotFoundException("Propiedad no encontrada con ese slug.");
      }
      return property;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al obtener la propiedad por slug.",
      });
    }
  }

  public async create(propertyData: CreatePropertyDto) {
    try {
      const validatedData = createPropertyDto.parse(propertyData);
      await this.validateRelatedEntities(validatedData);
      await dbConnect();
      const dataToSave = {
        ...validatedData,
        slug: this.generateSlug(validatedData.title),
      };

      let newProperty: IProperty | null = null;

      switch (validatedData.propertyType) {
        case "casa":
          newProperty = await House.create(dataToSave);
          break;

        case "terreno":
          newProperty = await Land.create(dataToSave);
          break;

        case "otro":
          newProperty = await OtherProperty.create(dataToSave);
          break;

        default:
          throw new BadRequestError(
            `Tipo de propiedad no soportado: ${propertyData.propertyType}`
          );
      }

      return newProperty.toObject({
        virtuals: false,
        versionKey: false,
      });
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al crear propiedad.",
      });
    }
  }

  async update(id: string, data: UpdatePropertyDTO): Promise<IProperty> {
    try {
      const validatedData: UpdatePropertyDTO & { slug?: string } =
        updatePropertySchema.parse(data);
      const existingProperty = await this.getById(id);
      await this.validateRelatedEntities(validatedData);
      if (validatedData?.title) {
        validatedData["slug"] = this.generateSlug(validatedData.title);
      }
      if (validatedData?.location) {
        const newLocation = {
          ...existingProperty.location,
          ...validatedData.location,
        };
        validatedData.location = newLocation;
      }

      const propertyToUpdate = await Property.findById(id);

      if (!propertyToUpdate) {
        throw new NotFoundException("Propiedad no encontrada.");
      }
      propertyToUpdate.set(validatedData);

      const updatedProperty = await propertyToUpdate.save();

      return updatedProperty.toObject({
        virtuals: false,
        versionKey: false,
      });
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al actualizar la propiedad.",
      });
    }
  }

  public async delete(id: string): Promise<{ message: string }> {
    try {
      await this.getById(id);
      await dbConnect();
      const deletedProperty = await Property.findByIdAndDelete(id).exec();
      if (!deletedProperty) {
        throw new InternalServerErrorException("Propiedad no eliminada.");
      }
      return { message: "Propiedad eliminada correctamente." };
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al eliminar la propiedad.",
      });
    }
  }

  private async validateRelatedEntities(
    data: Partial<CreatePropertyDto | UpdatePropertyDTO>
  ) {
    try {
      if (data?.agent) {
        await userService.getById(data.agent);
      }
      if (data?.mainImage) {
        await imageService.getById(data.mainImage);
      }
      if (data?.images && data?.images?.length > 0) {
        await Promise.all(
          data.images.map((imageId) => imageService.getById(imageId))
        );
      }
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new NotFoundException(error.message.replace("usuario", "agente"));
      }
      if (error instanceof ImageNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw this.handleServiceError(error, {
        internal: "Uno de los elementos relacionados no existe.",
      });
    }
  }

  private generateSlug(title: string): string {
    return slugify(title, {
      lower: true,
      strict: true,
      locale: "es",
    });
  }

  private _applyDynamicPopulation<T>(
    query: Query<T, IProperty>,
    populateFields: PROPERTY_POPULATE_FIELDS[] = []
  ): Query<T, IProperty> {
    const populateMap: {
      [key: string]: (q: Query<T, IProperty>) => Query<T, IProperty>;
    } = {
      agent: (q) =>
        q.populate({
          path: PROPERTY_POPULATE_FIELDS.AGENT,
          select: "name email",
        }),
      images: (q) =>
        q.populate({ path: PROPERTY_POPULATE_FIELDS.IMAGES, select: "-__v" }),
      mainImage: (q) =>
        q.populate({
          path: PROPERTY_POPULATE_FIELDS.MAIN_IMAGE,
          select: "-__v",
        }),
    };

    populateFields.forEach((field) => {
      if (populateMap[field]) {
        query = populateMap[field](query);
      }
    });

    const fieldsToExclude = PROPERTY_POPULATABLE_FIELDS.filter(
      (field) => !populateFields.includes(field)
    );

    if (fieldsToExclude.length > 0) {
      const selectString = fieldsToExclude
        .map((field) => `-${field}`)
        .join(" ");
      query = query.select(selectString);
    }

    return query;
  }

  private handleServiceError(
    error: unknown,
    customMessages?: { [key: string]: string }
  ): Error {
    const defaultMessage = customMessages?.internal || "Error interno.";
    if (error instanceof HttpError || error instanceof ZodError) {
      return error;
    }

    if (error instanceof MongoServerError) {
      const message = IS_DEV
        ? `code: ${error?.code}, ${JSON.stringify(error.keyValue)}`
        : defaultMessage;
      return new BadRequestError(message);
    }

    if (error instanceof MongooseError) {
      const message = customMessages?.mongoose || "Error en la base de datos.";
      return new BadRequestError(IS_DEV ? error.message : message);
    }

    return new InternalServerErrorException(
      IS_DEV ? (error as Error).message : defaultMessage
    );
  }
}

export const propertyService = new PropertyService();
