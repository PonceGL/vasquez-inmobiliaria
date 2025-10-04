import mongoose, { Document, Model } from "mongoose";

export interface IImage extends Document {
  url: string;
  asset_id: string;
  public_id: string;
  folder: string;
  alt: string;
  width: number;
  height: number;
}

const ImageSchema = new mongoose.Schema<IImage>(
  {
    url: {
      type: String,
      required: true,
      unique: true, // <--- MUY IMPORTANTE
      index: true,
    },
    asset_id: {
      type: String,
      required: true,
      unique: true, // <--- MUY IMPORTANTE
      index: true,
    },
    public_id: {
      type: String,
      required: true,
      unique: true, // <--- MUY IMPORTANTE
      index: true,
    },
    folder: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: [true, "La descripción es obligatoria."],
      trim: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Image: Model<IImage> =
  mongoose.models.Image || mongoose.model<IImage>("Image", ImageSchema);
