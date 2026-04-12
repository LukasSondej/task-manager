import z from "zod";

export const registerSchema = z.object({
     email: z.string().min(1, { message: 'This is required' }).email({ message: 'Must be a valid email' }),
     password: z.string().min(5, { message: 'Password must be at least 5 characters' }),
     confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
     message: "Passwords don't match",
     path: ["confirmPassword"], 
});
export type registerSchemaType = z.infer<typeof registerSchema>