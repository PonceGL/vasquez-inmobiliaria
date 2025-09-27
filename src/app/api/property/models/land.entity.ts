import mongoose, { Model } from "mongoose";

import { IProperty, Property } from "@/app/api/property/models/property.entity";

export interface ILand extends IProperty {
  landSqMeters: number;
  frontageMeters?: number;
  depthMeters?: number;
  topography?: "Plano" | "Ascendente" | "Descendente" | "Irregular";
  hasServices: boolean;
}

const landSchema = new mongoose.Schema<ILand>({
  landSqMeters: { type: Number, required: true },
  frontageMeters: { type: Number },
  depthMeters: { type: Number },
  topography: {
    type: String,
    enum: ["Plano", "Ascendente", "Descendente", "Irregular"],
  },
  hasServices: { type: Boolean, default: false },
});

export const Land: Model<ILand> =
  mongoose.models.Land || Property.discriminator<ILand>("Terreno", landSchema);
