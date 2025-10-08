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
  transactionType: "venta" | "renta";
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
  propertyType: "casa" | "terreno" | "otro";
  status: "active" | "process" | "sold";
  draft: boolean;
  hidePrice: boolean;
  // subdivision: Types.ObjectId | Subdivision;
  // interested: Types.ObjectId[] | Contact[];
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
    propertyType: {
      type: String,
      enum: ["casa", "terreno", "otro"],
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["venta", "renta"],
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
        required: [true, "Las coordenadas son obligatorias."],
        validate: {
          validator: function (value: number[]) {
            return value.length === 2;
          },
          message:
            "Las coordenadas deben ser una matriz de dos números [longitud, latitud].",
        },
      },
      address: {
        type: String,
        required: [true, "La dirección es obligatoria."],
        trim: true,
      },
      city: {
        type: String,
        required: [true, "La ciudad es obligatoria."],
        trim: true,
      },
      state: {
        type: String,
        required: [true, "El estado es obligatorio."],
        trim: true,
      },
      zipCode: { type: String, trim: true },
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
    status: {
      type: String,
      enum: ["active", "process", "sold"],
      required: true,
    },
    agent: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    draft: {
      type: Boolean,
      required: true,
      default: true,
    },
    hidePrice: {
      type: Boolean,
      required: true,
      default: false,
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
