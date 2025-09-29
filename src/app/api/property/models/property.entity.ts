import "@/app/api/image/image.entity";
import "@/app/api/user/user.entity";

import mongoose, { Document, Model, Types } from "mongoose";

import { IImage } from "@/app/api/image/image.entity";
import { IUser } from "@/app/api/user/user.entity";

export interface IProperty extends Document {
  title: string;
  slug: string;
  description: string;
  price: {
    value: number;
    currency: string;
  };
  transactionType: "Venta" | "Renta";
  location: {
    type: "Point";
    coordinates: [number, number]; // [longitud, latitud]
    address: string;
    city: string;
    state: string;
    zipCode?: string;
  };
  mainImage: Types.ObjectId | IImage;
  images: Types.ObjectId[] | IImage[];
  agent: Types.ObjectId | IUser;
  propertyType: "Casa" | "Terreno" | "Otro";
}

const basePropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El título es obligatorio."],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true, // <--- MUY IMPORTANTE
      lowercase: true,
      index: true, // Ayuda a que las búsquedas por slug sean más rápidas
    },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria."],
      trim: true,
    },
    price: {
      value: {
        type: Number,
        required: [true, "El precio es obligatorio."],
        min: [0, "El precio no puede ser negativo."],
      },
      currency: { type: String, default: "MXN" },
    },
    transactionType: {
      type: String,
      enum: ["Venta", "Renta"],
      required: true,
    },
    location: {
      // GeoJSON para poder hacer búsquedas por geolocalización en el futuro
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
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String },
    },
    mainImage: {
      type: Types.ObjectId,
      ref: "Image",
      required: [true, "Se debe especificar una imagen principal."],
    },
    images: [
      {
        type: Types.ObjectId,
        ref: "Image",
      },
    ],
    agent: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    propertyType: {
      type: String,
      enum: ["Casa", "Terreno", "Otro"],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Creamos un índice geoespacial
basePropertySchema.index({ location: "2dsphere" });

export const Property: Model<IProperty> =
  mongoose.models.Property ||
  mongoose.model<IProperty>("Property", basePropertySchema);
