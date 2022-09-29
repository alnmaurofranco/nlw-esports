import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

type DecodedTokenProps = {
  email: string;
  expiresAt: Date;
};

export default function isAuthorized(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let decodedToken: DecodedTokenProps;
  const authHeader = request.headers.authorization;
  const authNotStartedWithBearer = !authHeader?.startsWith("Bearer ");
  if (!authHeader || authNotStartedWithBearer) {
    return response.status(403).json({ error: "Forbidden header" });
  }
  const token = authHeader?.substring(7, authHeader.length);
  try {
    decodedToken = jwt.verify(
      token,
      String(process.env.JWT_SECRET_KEY)
    ) as DecodedTokenProps;
  } catch (error) {
    return response.status(403).json({ error: "Forbidden token" });
  }
  if (
    !decodedToken.hasOwnProperty("email") ||
    !decodedToken.hasOwnProperty("expiresAt")
  ) {
    return response.status(403).json({ error: "Invalid Token" });
  }
  const { email, expiresAt } = decodedToken;
  if (expiresAt < new Date()) {
    return response.status(403).json({ error: "Token expired" });
  }
  // find user by email and check if user exists
  return next();
}
