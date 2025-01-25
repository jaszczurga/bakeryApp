
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckButton } from "@/components/checkProductCard/checkButton";
import { AddButton } from "@/components/checkProductCard/addButton";
import {Product} from "@prisma/client";
import {noImg} from "@/lib/constants";

interface CheckProductCardProps {
    product: Product
    buttonType?: "add" | "check" | undefined;
    isOpen?: boolean;
}

export const CheckProductCard: React.FC<CheckProductCardProps> = ({ product, buttonType,isOpen=false }) => {

    const productUrl = `/pricing/${product.id}`;
    const productName = product.name;
    const imageUrl = product.img ?? noImg;

    return (
        <div className="bg-bgOrange shadow-md rounded-lg w-[300px] h-[325px] relative group">
            <div className="h-full">
                <Link href={productUrl}>
                    <div
                        className={`relative ${isOpen ? 'h-[240px]' : "h-[330px] group-hover:h-[240px] transition-all duration-300"}`}>
                        <Image
                            src={imageUrl}
                            alt={productName}
                            className="object-cover rounded-lg z-10"
                            fill
                        />
                    </div>
                </Link>

            </div>
            <div>
                <div className="text-center text-xl font-semibold mt-1 absolute bottom-12 ml-3 ">
                    {productName}
                </div>
                <div>
                    <p className="text-center text-lg font-semibold mt-1 absolute bottom-6 ml-3">
                        {product.price}$
                    </p>
                </div>
                {
                    buttonType === "add" && <AddButton product={product}/>
                }
                {
                    buttonType === "check" && <CheckButton href={productUrl}/>
                }
            </div>
        </div>
    );
};
