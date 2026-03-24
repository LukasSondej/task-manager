import z, { email } from "zod";

export const userSchema = z.object({
email: z.string().min(3),
password: z.string().min(7)
})

export const taskSchema = z.object({

    title: z.string().min(1),
    description: z.string(),
    status: z.string(),
    userId: z.number().int("userId must be a total number ")

})



