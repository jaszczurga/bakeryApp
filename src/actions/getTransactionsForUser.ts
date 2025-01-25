'use server';
import {prisma} from "@/lib/db";

export async function getTransactionsAction(email: string, page = 1, pageSize = 10) {
    const transactions = await prisma.transaction.findMany({
        where: { email: email },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
            orders: {
                include: {
                    product: true,
                },
            },
        },
    });
    return transactions;
}