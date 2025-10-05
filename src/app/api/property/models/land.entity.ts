import mongoose, { Model } from "mongoose";

import { IProperty, Property } from "@/app/api/property/models/property.entity";

export interface ILand extends IProperty {
  frontageMeters?: number;
  depthMeters?: number;
  topography?: "plano" | "ascendente" | "descendente" | "irregular";
  hasServices: boolean;
  plotSize: number;
}

const landSchema = new mongoose.Schema<ILand>({
  frontageMeters: { type: Number },
  depthMeters: { type: Number },
  topography: {
    type: String,
    enum: ["plano", "ascendente", "descendente", "irregular"],
  },
  hasServices: { type: Boolean, default: false },
  plotSize: { type: Number, default: 0 },
});

export const Land: Model<ILand> =
  Property.discriminators?.Land ||
  Property.discriminator<ILand>("Land", landSchema);
