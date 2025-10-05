import mongoose, { Model } from "mongoose";

import { IProperty, Property } from "@/app/api/property/models/property.entity";

export interface IHouse extends IProperty {
  constructionSqMeters: number;
  floors: number;
  bedrooms: number;
  bathrooms: number;
  garageSpaces: number;
  features: string[];
  preservation: string;
  age?: number;
  plotSize?: number;
}

const houseSchema = new mongoose.Schema<IHouse>({
  constructionSqMeters: { type: Number, required: true },
  floors: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  garageSpaces: { type: Number, default: 0 },
  features: [{ type: String, default: [] }],
  preservation: { type: String, required: true },
  age: { type: Number, min: 0, required: true, default: 0 },
  plotSize: { type: Number, required: true, default: 0 },
});

export const House: Model<IHouse> =
  Property.discriminators?.House ||
  Property.discriminator<IHouse>("House", houseSchema);
