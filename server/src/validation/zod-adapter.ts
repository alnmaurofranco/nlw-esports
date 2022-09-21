import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export default function zodAdapter(schema: z.ZodSchema<any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.method === "GET") {
        console.log("GET");
        req.query = await schema.parseAsync(req.query);
        req.params = await schema.parseAsync(req.params);
        next();
      } else {
        console.log("POST");
        req.body = await schema.parseAsync(req.body);
        next();
      }
    } catch (error) {
      next(error);
    }
  };
}
