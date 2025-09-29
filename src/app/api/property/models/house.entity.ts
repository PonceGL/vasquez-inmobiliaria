import mongoose, { Model } from "mongoose";

import { IProperty, Property } from "@/app/api/property/models/property.entity";

export interface IHouse extends IProperty {
  bedrooms: number;
  bathrooms: number;
  garageSpaces: number;
  constructionSqMeters: number;
  landSqMeters?: number;
}

const houseSchema = new mongoose.Schema<IHouse>({
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  garageSpaces: { type: Number, default: 0 },
  constructionSqMeters: { type: Number, required: true },
  landSqMeters: { type: Number }, // Opcional
});

export const House: Model<IHouse> =
  mongoose.models.House || Property.discriminator<IHouse>("Casa", houseSchema);
