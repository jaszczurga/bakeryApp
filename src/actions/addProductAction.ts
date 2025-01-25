'use server';
import {prisma} from "@/lib/db";
import {IFormProductInput} from "@/components/admin/product/zod";
import {uploadFileToS3} from "@/actions/uploadPhotoS3";


export const addProductAction = async (formData: IFormProductInput) => {
    try {
        let categoryId: string = formData.category as string;

        if (formData.newCategoryName) {
            // Add new category if provided
            const newCategory = await prisma.productCategory.create({
                data: {
                    name: formData.newCategoryName,
                    description: formData.newCategoryDescription || '',
                    createdAt: new Date(),
                    img: '',
                    updatedAt: new Date(),
                },
            });
            categoryId = newCategory.id;

            await uploadFileToS3(formData.categoryImg, newCategory.id);

            await prisma.productCategory.update({
                where: { id: newCategory.id },
                data: {
                    img: `http://localhost:4566/photos/${newCategory.id}`,
                },
            });
        }

        // Add the product
        const product = await prisma.product.create({
            data: {
                name: formData.name,
                description: formData.description || '',
                price: formData.price,
                img: '',
                categoryId: categoryId ,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });

        await uploadFileToS3(formData.img, product.id);

        await prisma.product.update({
            where: { id: product.id },
            data: {
                img: `http://localhost:4566/photos/${product.id}`,
            },
        });

        return { success: true, message: 'Product added successfully!', product };
    } catch (error) {
        if (error instanceof Error) {
        return { success: false, message: error.message || 'An unexpected error occurred.' };
        } else {
            return { success: false, message: 'An unexpected error occurred.' };
        }
    }
};