import mongoose, { Document, Model } from "mongoose";

export interface IAddress extends Document {
  name: string;
  street: string;
  exteriorNumber: string;
  interiorNumber?: string;
  neighborhood?: string;
  postalCode?: string;
  municipality: string;
  state: string;
  country: string;
  references?: string;
  googleMapsUrl?: string;
  location: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  isMain: boolean;
}

const AddressSchema = new mongoose.Schema<IAddress>(
  {
    name: {
      type: String,
      required: [true, "La etiqueta es requerida (ej: Ventas, Soporte)."],
      trim: true,
    },
    street: {
      type: String,
      required: [true, "La calle es requerida."],
      trim: true,
    },
    exteriorNumber: {
      type: String,
      required: [true, "El número exterior es requerido."],
      trim: true,
    },
    interiorNumber: {
      type: String,
      trim: true,
    },
    neighborhood: {
      type: String,
      trim: true,
    },
    postalCode: {
      type: String,
      trim: true,
    },
    municipality: {
      type: String,
      required: [true, "El municipio es requerido."],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "El estado es requerido."],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "El país es requerido."],
      trim: true,
      default: "México",
    },
    references: { type: String, trim: true },
    googleMapsUrl: { type: String, trim: true },

    // Estructura GeoJSON para la ubicación
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        select: false,
      },
      coordinates: {
        type: [Number], // [longitud, latitud]
        required: true,
      },
    },
    isMain: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

AddressSchema.index({ location: "2dsphere" });

export const Address: Model<IAddress> =
  mongoose.models.Address || mongoose.model<IAddress>("Address", AddressSchema);
