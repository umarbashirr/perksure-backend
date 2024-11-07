import * as z from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(2, {
    message: "Name should be minimum 02 characters",
  }),
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(6, {
    message: "Password should be minimum 06 characters",
  }),
});

export const loginUserSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(6, {
    message: "Password should be minimum 06 characters",
  }),
});
