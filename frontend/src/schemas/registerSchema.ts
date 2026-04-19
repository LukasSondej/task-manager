import { z } from 'zod'

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Email address is required' })
      .email({ message: 'Please enter a valid email address' }),
    password: z.string().min(5, { message: 'Password must be at least 5 characters long' }),
    confirmPassword: z.string().min(1, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type registerSchemaType = z.infer<typeof registerSchema>
