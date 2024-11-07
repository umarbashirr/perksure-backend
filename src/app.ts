import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./db";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import authRoutes from "./routes/auth.routes";
import workspaceRoutes from "./routes/workspace.routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/workspaces", workspaceRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server started listening at port ${port}...`);
  });
});
