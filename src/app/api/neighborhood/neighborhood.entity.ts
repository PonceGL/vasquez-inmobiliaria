import "@/app/api/image/image.entity";
import "@/app/api/user/user.entity";
import "@/app/api/property/models/property.entity";

import mongoose, { Document, Model, Types } from "mongoose";

import { IImage } from "@/app/api/image/image.entity";
import { IProperty } from "@/app/api/property/models/property.entity";
import { IUser } from "@/app/api/user/user.entity";

export interface INeighborhood extends Document {
  name: string;
  slug: string;
  slogan?: string;
  description: string;
  moreInformation?: string;
  priceBySqMeters: {
    value: number;
    currency: string;
  };
  location: {
    type: "Point";
    coordinates: [number, number]; // [longitud, latitud]
    address: string;
    city: string;
    state: string;
    zipCode?: string;
  };
  logo?: Types.ObjectId | IImage;
  mainImage: Types.ObjectId | IImage;
  images: Types.ObjectId[] | IImage[];
  agent: Types.ObjectId | IUser;
  properties: Types.ObjectId[] | IProperty[];
  neighborhoodType: string;
  sizeLandsRange: [number, number]; // [min, max]
  availableLands: number;
  priceRange: [number, number]; // [min, max]
  features?: string[];
  services?: string[];
  benefits?: string[];
  draft: boolean;
  hidePrice: boolean;
}

const neighborhoodSchema = new mongoose.Schema<INeighborhood>({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio."],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true, // <--- MUY IMPORTANTE
    lowercase: true,
    index: true, // Ayuda a que las búsquedas por slug sean más rápidas
  },
  slogan: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "La descripción es obligatoria."],
    trim: true,
  },
  moreInformation: {
    type: String,
    trim: true,
  },
  priceBySqMeters: {
    value: {
      type: Number,
      required: [true, "El precio por metro cuadrado es obligatorio."],
      min: [0, "El precio no puede ser negativo."],
    },
    currency: {
      type: String,
      default: "MXN",
    },
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
      type: [Number],
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
  logo: {
    type: Types.ObjectId,
    ref: "Image",
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
    required: [true, "El agente es obligatorio."],
  },
  properties: [
    {
      type: Types.ObjectId,
      ref: "Property",
    },
  ],
  neighborhoodType: {
    type: String,
    required: [true, "El tipo de vecindario es obligatorio."],
    trim: true,
  },
  sizeLandsRange: {
    type: [Number],
    required: [true, "El rango de tamaño de terrenos es obligatorio."],
    validate: {
      validator: function (value: number[]) {
        return value.length === 2;
      },
      message:
        "El rango de tamaño de terrenos debe ser una matriz de dos números [min, max].",
    },
  },
  availableLands: {
    type: Number,
    required: [true, "El número de terrenos disponibles es obligatorio."],
  },
  priceRange: {
    type: [Number],
    required: [true, "El rango de precios es obligatorio."],
    validate: {
      validator: function (value: number[]) {
        return value.length === 2;
      },
      message:
        "El rango de precios debe ser una matriz de dos números [min, max].",
    },
  },
  features: { type: [String], default: [] },
  services: { type: [String], default: [] },
  benefits: { type: [String], default: [] },
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
});

neighborhoodSchema.index({ location: "2dsphere" }); // Índice geoespacial para consultas por ubicación

export const Neighborhood: Model<INeighborhood> =
  mongoose.models.Neighborhood ||
  mongoose.model<INeighborhood>("Neighborhood", neighborhoodSchema);
