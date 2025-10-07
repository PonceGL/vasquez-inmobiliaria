import { MongoServerError } from "mongodb";
import { MongooseError, Query } from "mongoose";
import slugify from "slugify";
import { ZodError } from "zod";

import {
  CreateNeighborhoodDto,
  createNeighborhoodDto,
  UpdateNeighborhoodDto,
  updateNeighborhoodDto,
} from "@/app/api/neighborhood/dtos/neighborhood.dto";
import {
  INeighborhood,
  Neighborhood,
} from "@/app/api/neighborhood/neighborhood.entity";
import { IS_DEV } from "@/constants/enviroment";
import { NEIGHBORHOOD_POPULATABLE_FIELDS } from "@/constants/neighborhood";
import {
  BadRequestError,
  HttpError,
  InternalServerErrorException,
  NotFoundException,
} from "@/lib/httpErrors";
import { dbConnect } from "@/lib/mongodb";
import { NEIGHBORHOOD_POPULATE_FIELDS } from "@/types/neighborhood";

class NeighborhoodService {
  public async getAll(
    populateFields: NEIGHBORHOOD_POPULATE_FIELDS[] = []
  ): Promise<INeighborhood[]> {
    try {
      await dbConnect();
      const baseQuery = Neighborhood.find({});

      const finalQuery = this._applyDynamicPopulation(
        baseQuery,
        populateFields
      );

      const neighborhoods = await finalQuery
        .select("-__t")
        .select("-__v")
        .lean<INeighborhood[]>()
        .exec();

      return neighborhoods;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al obtener los vecindarios.",
      });
    }
  }

  public async getById(
    id: string,
    populateFields: NEIGHBORHOOD_POPULATE_FIELDS[] = []
  ): Promise<INeighborhood> {
    try {
      await dbConnect();
      const baseQuery = Neighborhood.findById(id);

      const finalQuery = this._applyDynamicPopulation(
        baseQuery,
        populateFields
      );

      const neighborhood = await finalQuery
        .select("-__t")
        .select("-__v")
        .lean<INeighborhood>()
        .exec();

      if (!neighborhood) {
        throw new NotFoundException("Vecindario no encontrado.");
      }

      return neighborhood;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al obtener la propiedad.",
      });
    }
  }

  public async getBySlug(
    slug: string,
    populateFields: NEIGHBORHOOD_POPULATE_FIELDS[] = []
  ): Promise<INeighborhood> {
    try {
      await dbConnect();

      const baseQuery = Neighborhood.findOne({ slug: slug });

      const finalQuery = this._applyDynamicPopulation(
        baseQuery,
        populateFields
      );

      const neighborhood = await finalQuery
        .select("-__t")
        .select("-__v")
        .lean<INeighborhood>()
        .exec();
      if (!neighborhood) {
        throw new NotFoundException("Vecindario no encontrado con ese slug.");
      }
      return neighborhood;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al obtener el vecindario por slug.",
      });
    }
  }

  public async create(neighborhoodData: CreateNeighborhoodDto) {
    try {
      const validatedData = createNeighborhoodDto.parse(neighborhoodData);
      const dataToSave = {
        ...validatedData,
        slug: this.generateSlug(validatedData.name),
      };
      await dbConnect();
      const newNeighborhood = await Neighborhood.create(dataToSave);
      return newNeighborhood;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al crear vecindario.",
      });
    }
  }

  async update(id: string, data: UpdateNeighborhoodDto) {
    try {
      const validatedData = updateNeighborhoodDto.parse(data);
      await this.getById(id);
      await dbConnect();
      const updatedNeighborhood = await Neighborhood.findByIdAndUpdate(
        id,
        validatedData,
        {
          new: true,
          runValidators: true,
        }
      ).exec();
      if (!updatedNeighborhood) {
        throw new BadRequestError("Vecindario no encontrado.");
      }
      return updatedNeighborhood;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al actualizar el vecindario.",
      });
    }
  }

  async delete(id: string) {
    try {
      await this.getById(id);
      await dbConnect();
      await Neighborhood.findByIdAndDelete(id);
      return { message: "Vecindario eliminado correctamente." };
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Vecindario no eliminado.",
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
    query: Query<T, INeighborhood>,
    populateFields: NEIGHBORHOOD_POPULATE_FIELDS[] = []
  ): Query<T, INeighborhood> {
    const populateMap: {
      [key: string]: (q: Query<T, INeighborhood>) => Query<T, INeighborhood>;
    } = {
      agent: (q) =>
        q.populate({
          path: NEIGHBORHOOD_POPULATE_FIELDS.AGENT,
          select: "name email",
        }),
      images: (q) =>
        q.populate({
          path: NEIGHBORHOOD_POPULATE_FIELDS.IMAGES,
          select: "-__v",
        }),
      mainImage: (q) =>
        q.populate({
          path: NEIGHBORHOOD_POPULATE_FIELDS.MAIN_IMAGE,
          select: "-__v",
        }),
      logo: (q) =>
        q.populate({
          path: NEIGHBORHOOD_POPULATE_FIELDS.LOGO,
          select: "-__v",
        }),
      properties: (q) =>
        q.populate({
          path: NEIGHBORHOOD_POPULATE_FIELDS.PROPERTIES,
          select: "-__v -__t -images",
          populate: {
            path: "mainImage",
            select: "_id url alt width height",
          },
        }),
    };

    populateFields.forEach((field) => {
      if (populateMap[field]) {
        query = populateMap[field](query);
      }
    });

    const fieldsToExclude = NEIGHBORHOOD_POPULATABLE_FIELDS.filter(
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

export const neighborhoodService = new NeighborhoodService();
