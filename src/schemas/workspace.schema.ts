import * as z from "zod";

export const workspaceSchema = z.object({
  name: z.string().min(2, {
    message: "Workspace name should be minimum 02 characters",
  }),
  description: z.string().optional(),
});
