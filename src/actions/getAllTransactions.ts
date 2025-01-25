'use server'
import {prisma} from "@/lib/db";



export const getTransactionsAction = async (page: number = 1, pageSize: number = 10) => {
    const transactions = await prisma.transaction.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
            orders: true,
        }
    });
    return transactions;
}