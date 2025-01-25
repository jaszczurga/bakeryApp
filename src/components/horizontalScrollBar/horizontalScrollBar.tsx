import React from 'react';
import Image from "next/image";
import {ProductCategory} from "@prisma/client";
import {noImg} from "@/lib/constants";


interface Props {
    categories: ProductCategory[];
    change: (category: ProductCategory) => void;
    activeCategory?: ProductCategory;
}

export const HorizontalScrollBar: React.FC<Props> = ({ categories,change, activeCategory }) => {
    return (
        <div
            className="horizontal-scroll flex flex-row gap-4 overflow-x-auto p-4 scrollbar-hide"
        >
            {categories.map((category,index) => (
                <div key={index} onClick={
                    () => change(category)
                }
                     className={`flex flex-col items-center justify-center`}>
                    <div className={`relative w-20 h-20 rounded-full bg-gray-300 ${activeCategory?.id === category.id ? 'border-4 border-green-700' : ''}`}>
                        <Image
                            src={category.img ?? noImg}
                            alt={category.name}
                            className={`object-cover w-20 h-20 rounded-full z-10 `}
                            fill
                        />
                    </div>
                    <p className="text-white">{category.name}</p>
                </div>
            ))}
        </div>
    );
};
