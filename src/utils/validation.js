import { z } from 'zod'

export const User = z.object({
    email: z.string().email({message: "Please, enter the correct email"}),
    password: z.string().min(8)
    .refine((value) => /[A-Z]/.test(value), {
      message: "The password must contain at least one uppercase letter",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "The password must contain at least one lowercase letter",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "The password must contain at least one number",
    }),
    date: z.number(),
  })