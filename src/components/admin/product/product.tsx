import { getProductById } from "@/actions/getProductById";
import Image from "next/image";
import { noImg } from "@/lib/constants";
import {AddButton} from "@/components/checkProductCard/addButton";
import {Product} from "@prisma/client";

export const ProductPage = async ({ productId }: { productId: string }) => {
    const product = await getProductById(productId);

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
                {/* Image Section */}
                <div className="flex-shrink-0 w-[250px] h-[250px] relative">
                    <Image
                        src={product?.img || noImg}
                        alt={product?.name || "No name available"}
                        width={500}
                        height={500}
                        className="rounded-lg shadow-md w-full object-cover"
                    />
                </div>

                {/* Product Details */}
                <div className="flex flex-col">
                    <div>
                        <h1 className="text-2xl lg:text-4xl font-bold mb-4 text-black">{product?.name}</h1>
                        <p className="text-white text-lg mb-6">{product?.description || "No description available."}</p>
                    </div>
                    <div className="text-lg font-semibold text-gray-800">
                        Price: <span className="text-black">${product?.price.toFixed(2)}</span>
                    </div>
                    <div className={"relative"}>
                        <AddButton product={product as Product}/>
                    </div>
                </div>
            </div>
        </div>
    );
};
