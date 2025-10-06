import mongoose, { Document, Model } from "mongoose";

export interface IContactEmail extends Document {
  label: string;
  email: string;
  isMain: boolean;
}

const ContactEmailSchema = new mongoose.Schema<IContactEmail>(
  {
    label: {
      type: String,
      required: [true, "La etiqueta es requerida (ej: Ventas, Soporte)."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El correo electrónico es requerido."],
      unique: true,
      trim: true,
    },
    isMain: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

ContactEmailSchema.pre<IContactEmail>("validate", async function (next) {
  if (this.isModified("isMain") && this.isMain) {
    try {
      await (this.constructor as Model<IContactEmail>).updateMany(
        { _id: { $ne: this._id }, isMain: true },
        { $set: { isMain: false } }
      );
    } catch (error) {
      return next(error as Error);
    }
  }

  next();
});

export const ContactEmail: Model<IContactEmail> =
  mongoose.models.ContactEmail ||
  mongoose.model<IContactEmail>("ContactEmail", ContactEmailSchema);
