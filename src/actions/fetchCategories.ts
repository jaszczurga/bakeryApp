'use server';
import {prisma} from "@/lib/db";

export const fetchCategoriesAction = async () => {
    try {
        const categories = await prisma.productCategory.findMany();
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Failed to fetch categories.');
    }
};