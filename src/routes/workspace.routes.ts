import { Router } from "express";

import {
  createWorkspace,
  getAllWorkspacesForUser,
  getSingleWorkspaceForUser,
  updateWorkspaceForUser,
} from "../controllers/workspace.controller";
import { verifyJWT } from "../middlewares/verify-jwt";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getAllWorkspacesForUser).post(createWorkspace);
router
  .route("/:workspaceId")
  .get(getSingleWorkspaceForUser)
  .put(updateWorkspaceForUser);

export default router;
