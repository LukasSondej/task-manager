import {z} from "zod"

export const loginSchema = z.object({
 email: z.string().min(1, { message: 'This is required' }).email({ message: 'Must be a valid email' }),
    password: z.string().min(5)
})
export type loginSchemaType = z.infer<typeof loginSchema>