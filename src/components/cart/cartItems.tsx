import React from "react";
import {Cart} from "@/components/cart/cart";
import {urls} from "@/lib/constants";
import {CheckoutButton} from "@/components/cart/checkoutButton";
import {Product} from "@prisma/client";

type CartItemsProps = {
    cartItems: Product[];
}

export const CartItems: React.FC<CartItemsProps> = ({cartItems}) => {

    return (
        <div className={"flex flex-col"}>
        <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
                <Cart key={item.id} item={item} />
            ))}
        </div>
            <div className={"flex justify-end mt-3"}>
                <CheckoutButton href={urls.checkout} />
            </div>
        </div>
    )
}