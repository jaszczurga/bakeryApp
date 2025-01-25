'use server'
import {prisma} from "@/lib/db";


export const getProductsForGivenCategory = async (categoryId: string, page: number) =>
{
    const products = await prisma.product.findMany({
        where: {
            categoryId: categoryId
        },
        skip: 10 * (page - 1),
        take: 10
    });
    return products;
}