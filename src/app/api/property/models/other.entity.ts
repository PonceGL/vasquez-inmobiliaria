import mongoose, { Model } from "mongoose";

import { IProperty, Property } from "@/app/api/property/models/property.entity";

export interface IOtherProperty extends IProperty {
  features: {
    key: string;
    value: string;
  }[];
  frontageMeters?: number;
  depthMeters?: number;
  topography?: "plano" | "ascendente" | "descendente" | "irregular";
  hasServices?: boolean;
  plotSize?: number;
}

const otherSchema = new mongoose.Schema<IOtherProperty>({
  features: [
    {
      _id: false,
      key: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
});

export const OtherProperty: Model<IOtherProperty> =
  Property.discriminators?.Other ||
  Property.discriminator<IOtherProperty>("Other", otherSchema);
