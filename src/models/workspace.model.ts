import { Document, Schema, model } from "mongoose";

interface WorkspaceSchemaProps extends Document {
  name: string;
  description?: string;
  createdBy: Schema.Types.ObjectId;
}

const workspaceSchema = new Schema<WorkspaceSchemaProps>(
  {
    name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Workspace = model<WorkspaceSchemaProps>("Workspace", workspaceSchema);

export default Workspace;
