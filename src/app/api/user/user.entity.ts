import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "dev" | "collaborator" | "editor";
  verified: boolean;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: [true, "El tipo de rol es obligatorio."],
      enum: {
        values: ["admin", "dev", "collaborator", "editor"],
        message: "{VALUE} no es un tipo de rol válida.",
      },
    },
    verified: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
