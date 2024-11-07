import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./db";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server started listening at port ${port}...`);
  });
});
