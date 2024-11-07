import { Router } from "express";
import { createWorkspace } from "../controllers/workspace.controller";

const router = Router();

router.route("/").post(createWorkspace);

export default router;
