import z from "zod";

const userQuerySchema = z
  .string({
    message: "Query must be a valid string",
  })
  .trim()
  .min(1, "Query must have at least one character");

export { userQuerySchema };
