'use server'
import {prisma} from "@/lib/db";


export const getProductById = async (id: string) => {

    return prisma.product.findUnique({
        where: {
            id: id
        }
    });
}