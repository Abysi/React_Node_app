import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader: string = req.header("authorization");
  const token: string = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err: jwt.VerifyErrors) => {
      if (err) return res.status(403).send(err);
      next();
    }
  );
}
