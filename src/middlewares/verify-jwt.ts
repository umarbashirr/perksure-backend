import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req: any, res: any, next: any) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "ACCESS_DENIED" });
  }

  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET!);

  if (!decodedToken) {
    return res.status(401).json("UN_AUTHORIZED");
  }

  req.user = decodedToken;

  next();
});
