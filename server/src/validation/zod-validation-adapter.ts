import { z, ZodSchema } from "zod";

// export default async function zodValidationAdapter() {
//   if (schema.safeParse(params).success) {
//     return next();
//   } else {
//     await schema.parseAsync(params);
//   }
// }

export default class ZodValidation {
  readonly #schema: ZodSchema;

  constructor(schema: ZodSchema) {
    this.#schema = schema;
  }

  async validation(data: any, next: Function) {
    if (this.#schema.safeParse(data).success) {
      return next();
    } else {
      await this.#schema.parseAsync(data);
    }
  }
}
