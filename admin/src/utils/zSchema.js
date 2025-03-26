import { z } from "zod";

export const LogInFormFieldsSchema = z.object({
    email: z.string()
        .min(1, { message: "Email is required." })
        .email({ message: "Invalid email format" }),
    password: z.string()
        .min(1, { message: 'Password is required.' })
        .min(6, { message: 'Password must be at least 6 characters long.' })
})

export const createUserFormFieldSchema = z.object({
    first_name: z.string()
        .min(1, { message: "First name is required." }),
    last_name: z.string()
        .min(1, { message: "Last name is required." }),
    email: z.string()
        .min(1, { message: "Email is required." })
        .email({ message: "Invalid email format" }),
    password: z.string()
        .min(1, { message: 'Password is required.' })
        .min(6, { message: 'Password must be at least 6 characters long.' }
        )
})