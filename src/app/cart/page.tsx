'use client'
import React, {useEffect, useState} from 'react';
import {CartItems} from "@/components/cart/cartItems";
import useCartStore from "@/store/cartStore";
import {getProductsWithGivenIdAction} from "@/actions/getProductsWithGivenIdAction";
import {Product} from "@prisma/client";


export default function Cart(){
    const cartItems = useCartStore(state => state.items);
    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    useEffect(()=>{
        const fetchProducts = async () => {
            const products = await getProductsWithGivenIdAction(cartItems.map(item => item.id));
            setCartProducts(products);
        }
        fetchProducts();
    },[cartItems]);

    return (
        <div className="min-h-screen p-5 bg-background">
            <h1 className="text-2xl text-white font-bold text-center mb-5">Your Cart</h1>
            <div className={"xl:mx-72 "}>
                {
                    cartProducts.length === 0 && <p className="text-white text-center">No items in the cart</p>
                }
                <CartItems cartItems={cartProducts} />
            </div>
        </div>
    );
};
