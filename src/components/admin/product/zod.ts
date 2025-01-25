import * as z from 'zod';

export const FormSchemaProduct = z.object({
    name: z.string().min(1, { message: 'Product name is required.' }),
    description: z.string().optional(),
    price: z.number({ invalid_type_error: 'Price must be a number.' }).positive({ message: 'Price must be positive.' }),
    img: z.any(),
    categoryImg: z.any().optional(),
    category: z.string().optional(),
    newCategoryName: z
        .string()
        .optional(),
    newCategoryDescription: z
        .string()
        .optional(),
});

export type IFormProductInput = z.infer<typeof FormSchemaProduct>;