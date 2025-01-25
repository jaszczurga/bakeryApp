import * as z from "zod";
export const FormSchema = z.object({
    city: z
        .string()
        .min(1, { message: "City is required." })
        .max(100, { message: "City name must be less than 100 characters." })
        .regex(/^[a-zA-Z\s.,'-]+$/, {
            message: "City can only contain letters and common special characters (e.g., ., '-). No numbers or invalid characters allowed.",
        }),
    street: z
        .string()
        .min(1, { message: "Street is required." })
        .max(200, { message: "Street name must be less than 200 characters." })
        .regex(/^[a-zA-Z0-9\s.,'-]+$/, {
            message: "Street can only contain letters and common special characters (e.g., ., '-). No numbers or invalid characters allowed.",
        }),
    zipcode: z
        .string()
        .regex(/^\d{2}-\d{3}$/, { message: "ZIP code must be in the format 80-240." }),
    email: z
        .string()
        .email({ message: "Invalid email address format." }),
    phone: z
        .string()
        .length(9, { message: "Phone number must be exactly 9 digits." })
        .regex(/^\d{9}$/, { message: "Phone number must be in the format 555111777." }),
    date: z.date(),
});


export type IFormInput = z.infer<typeof FormSchema>;