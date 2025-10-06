import mongoose, { Document, Model } from "mongoose";

export interface IContactNumber extends Document {
  label: string;
  phone: string;
  hasWhatsApp: boolean;
  isMainWhatsApp: boolean;
  isMainCall: boolean;
}

const ContactNumberSchema = new mongoose.Schema<IContactNumber>(
  {
    label: {
      type: String,
      required: [true, "La etiqueta es requerida (ej: Ventas, Soporte)."],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "El número de teléfono es requerido."],
      unique: true,
      trim: true,
    },
    hasWhatsApp: {
      type: Boolean,
      default: false,
    },
    isMainWhatsApp: {
      type: Boolean,
      default: false,
    },
    isMainCall: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

ContactNumberSchema.pre<IContactNumber>("validate", async function (next) {
  if (this.isModified("isMainWhatsApp") && this.isMainWhatsApp) {
    try {
      await (this.constructor as Model<IContactNumber>).updateMany(
        { _id: { $ne: this._id }, isMainWhatsApp: true },
        { $set: { isMainWhatsApp: false } }
      );
    } catch (error) {
      return next(error as Error);
    }
  }

  if (this.isModified("isMainCall") && this.isMainCall) {
    try {
      await (this.constructor as Model<IContactNumber>).updateMany(
        { _id: { $ne: this._id }, isMainCall: true },
        { $set: { isMainCall: false } }
      );
    } catch (error) {
      return next(error as Error);
    }
  }

  next();
});

export const ContactNumber: Model<IContactNumber> =
  mongoose.models.ContactNumber ||
  mongoose.model<IContactNumber>("ContactNumber", ContactNumberSchema);
