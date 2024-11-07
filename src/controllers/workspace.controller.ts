import asyncHandler from "express-async-handler";
import { workspaceSchema } from "../schemas/workspace.schema";
import Workspace from "../models/workspace.model";

export const createWorkspace = asyncHandler(async (req: any, res: any) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "INVALID_REQUEST" });
  }

  const fields = workspaceSchema.safeParse(req.body);

  if (!fields.success) {
    return res
      .status(400)
      .json({ message: fields.error.flatten().fieldErrors });
  }

  const { name, description } = fields.data;

  const existingWorkspace = await Workspace.findOne({
    name: name.toLowerCase(),
    createdBy: user._id,
  });

  if (existingWorkspace) {
    return res
      .status(400)
      .json({ message: "Workspace already existed with same name!" });
  }

  const workspaceInstance = new Workspace({
    name,
    description: description ? description : "",
  });

  const workspace = await workspaceInstance.save();

  return res
    .status(201)
    .json({ data: workspace, message: "workspace created successfully!" });
});
