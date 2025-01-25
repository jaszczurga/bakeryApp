'use server'
import {prisma} from "@/lib/db";
import {revalidatePath} from "next/cache";


export const getProductsWithGivenIdAction = async (itemsIds: string[]) => {
    const products = await prisma.product.findMany({
        where: {
            id: {
                in: itemsIds,
            },
        }
    });
    revalidatePath('/cart');
    return products;
}