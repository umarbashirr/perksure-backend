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
    createdBy: user._id,
  });

  const workspace = await workspaceInstance.save();

  return res
    .status(201)
    .json({ data: workspace, message: "workspace created successfully!" });
});

export const getAllWorkspacesForUser = asyncHandler(
  async (req: any, res: any) => {
    const user = req.user;

    const workspaces = await Workspace.find({
      createdBy: user?._id,
    });

    return res
      .status(200)
      .json({ data: workspaces, message: "workspaces fetched successfully" });
  }
);

export const getSingleWorkspaceForUser = asyncHandler(
  async (req: any, res: any) => {
    const user = req.user;
    const workspaceId = req.params.workspaceId;

    const workspace = await Workspace.findOne({
      _id: workspaceId,
      createdBy: user?._id,
    });

    if (!workspace) {
      return res.status(400).json({ message: "No workspace found!" });
    }

    return res
      .status(200)
      .json({ data: workspace, message: "workspace fetched successfully" });
  }
);

export const updateWorkspaceForUser = asyncHandler(
  async (req: any, res: any) => {
    const user = req.user;
    const workspaceId = req.params.workspaceId;

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
      _id: workspaceId,
      createdBy: user._id,
    });

    if (!existingWorkspace) {
      return res.status(400).json({ message: "No record found!" });
    }

    existingWorkspace.name = name;
    existingWorkspace.description = description;

    const workspace = await existingWorkspace.save();

    return res
      .status(200)
      .json({ data: workspace, message: "workspace updated successfully!" });
  }
);
