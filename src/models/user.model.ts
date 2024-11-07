import { Document, Schema, model } from "mongoose";

interface UserSchemaProps extends Document {
  name: string;
  email: string;
  password: string;
  workspaces: Schema.Types.ObjectId[];
}

const userSchema = new Schema<UserSchemaProps>(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      select: false,
    },
    workspaces: [
      {
        type: Schema.Types.ObjectId,
        ref: "Workspace",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model<UserSchemaProps>("User", userSchema);

export default User;
