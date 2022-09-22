import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export default function zodErrorMiddleware() {
  return (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    if (error instanceof ZodError) {
      const err = error.errors;
      return response.status(400).json(err);
    }
    return response
      .status(500)
      .json({ error: error.message ?? "Internal error" });
  };
}
