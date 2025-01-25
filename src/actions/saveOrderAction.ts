'use server';

import { prisma } from "@/lib/db";
import { IFormInput } from '@/components/checkoutForm/zod';
import { CartProduct } from '@/store/cartStore';

export async function saveOrder(formData: IFormInput, cartProducts: CartProduct[]) {
    try {
        if (!formData || !cartProducts) {
            throw new Error("Invalid input: formData or cartProducts is null or undefined.");
        }

        console.log("formData:", formData);
        console.log("cartProducts:", cartProducts);

        if (!formData.email || !formData.street || !formData.city || !formData.zipcode) {
            throw new Error("Missing required fields in formData.");
        }

        if (cartProducts.length === 0) {
            throw new Error("Cart is empty. Cannot place an order.");
        }

        const address = await prisma.address.upsert({
            where: { email: formData.email },
            update: {
                street: formData.street,
                city: formData.city,
                zipCode: formData.zipcode,
                updatedAt: new Date(),
            },
            create: {
                email: formData.email,
                street: formData.street,
                city: formData.city,
                zipCode: formData.zipcode,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });

        console.log("Address saved:", address);

        const totalAmount = cartProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);

        if (totalAmount <= 0) {
            throw new Error("Total amount must be greater than zero.");
        }

        const transaction = await prisma.transaction.create({
            data: {
                totalAmount: totalAmount,
                email: formData.email,
                createdAt: new Date(),
                deliveryDate: formData.date,
                status: "PENDING",
                address: {
                    connect: { id: address.id },
                },
            },
        });

        console.log("Transaction created:", transaction);

        console.log("Cart products:", cartProducts);

        // Step 4: Save orders for each cart product
        const orders = cartProducts.map(product => ({
            quantity: product.quantity,
            createdAt: new Date(),
            updatedAt: new Date(),
            product: {
                connect: { id: product.id },
            },
            transaction: {
                connect: { id: transaction.id },
            },
        }));

        await Promise.all(
            orders.map(order =>
                prisma.order.create({ data: order }).catch(err => {
                    console.error("Error creating order for product:", order, err);
                    throw err;
                })
            )
        );

        console.log("Orders created successfully.");

        return {
            success: true,
            message: "Order placed successfully!",
            transactionId: transaction.id,
        };
    } catch (error) {
        console.error("Error in saveOrder:", error);
        return {
            success: false,
            message: error,
        };
    }
}
