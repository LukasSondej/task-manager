import z, { email } from 'zod'
import { omit } from 'zod/mini'

export const userSchema = z.object({
  email: z.string().min(3),
  password: z.string().min(5),
})

export const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.string().default('TODO'),
})

export type taskType = z.infer<typeof taskSchema>
export type userType = z.infer<typeof userSchema>
