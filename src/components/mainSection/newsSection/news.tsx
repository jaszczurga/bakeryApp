
import { CheckProductCard } from "@/components/checkProductCard/checkProductCard";
import React from "react";
import {prisma} from "@/lib/db";
export const News = async () => {
    const products = await prisma.product.findMany({
        take: 4,
        orderBy: {
            createdAt: "desc"
        }
    })
    return (
        <div className={"flex flex-col justify-center items-center"}>
            <div className={"w-full flex justify-center"}>
                <h1 className={"text-3xl font-bold text-white p-1"}>News!</h1>
            </div>
            <div className="flex flex-wrap justify-center gap-7 p-6">
                {products.map((product, index) => (
                    <CheckProductCard
                        key={index}
                        product={product}
                        buttonType="check"
                    />
                ))}
            </div>
        </div>
    );
};
