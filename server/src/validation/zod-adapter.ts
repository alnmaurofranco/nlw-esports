import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export default function zodAdapter(schema: z.ZodSchema<any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params = {
        ...req.params,
        ...req.body,
        ...req.query,
      };
      if (schema.safeParse(params).success) {
        return next();
      } else {
        await schema.parseAsync(params);
      }
    } catch (error) {
      next(error);
    }
  };
}
