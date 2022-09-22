import { NextFunction, Request, Response } from "express";
import { z, ZodSchema } from "zod";
import ZodValidation from "../../../validation/zod-validation-adapter";

export default function zodMiddlewareAdapter<T = any>(schema: ZodSchema<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paramsData = {
        ...req.params,
        ...req.body,
        ...req.query,
      };
      const zodValidation = new ZodValidation(schema);
      await zodValidation.validation(paramsData, next);
    } catch (error) {
      next(error);
    }
  };
}
