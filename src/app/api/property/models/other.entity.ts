import mongoose, { Model } from "mongoose";

import { IProperty, Property } from "@/app/api/property/models/property.entity";

export interface IOtherProperty extends IProperty {
  features: {
    key: string;
    value: string;
  }[];
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
  mongoose.models.OtherProperty ||
  Property.discriminator<IOtherProperty>("Otro", otherSchema);
