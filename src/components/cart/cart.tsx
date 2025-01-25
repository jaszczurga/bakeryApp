
import Image from "next/image";
import {noImg} from "@/lib/constants";
import React from "react";
import {QuantityButton} from "@/components/cart/quantityButton/quantityButton";
import useCartStore from "@/store/cartStore";
import {Product} from "@prisma/client";


type CartProps = {
    item: Product;
}

export const Cart: React.FC<CartProps> = ({item}) => {


    const currentNumber = useCartStore(state => state.items.find((cartItem) => cartItem.id === item.id)?.quantity ?? 0);


    return (
        <div
            key={item.id}
            className="bg-bgOrange shadow-md rounded-lg p-4 flex flex-col md:flex-row justify-between"
        >
            <div className={"relative h-[150px] md:w-[30%]"}>
                <Image
                    src={item.img ?? noImg}
                    alt={"Bread"}
                    className="object-cover rounded-lg z-10"
                    fill
                />
            </div>
            <div className="flex items-center gap-4">
                <div className="text-lg font-semibold">{item.name}</div>
                <div className="text-gray-500">${item.price}</div>
            </div>
            <div className={"flex items-end"}>
                <div className={"flex flex-row justify-center items-center"}>
                    <p className={"font-bold text-lg"}>{`total: ${currentNumber * item.price}`}</p>
                    <span className={"w-5"}></span>
                    <QuantityButton product={item} />
                </div>

            </div>
        </div>
    )
}