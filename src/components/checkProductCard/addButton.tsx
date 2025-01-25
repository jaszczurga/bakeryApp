'use client'
import {MinusIcon} from "@/components/icons/minus";
import {PlusIcon} from "@/components/icons/plus";
import {Product} from "@prisma/client";
import useCartStore from "@/store/cartStore";

type AddButton = {
    product: Product;
}

export const AddButton: React.FC<AddButton> = ({ product }) => {

    const {items, updateQuantity} = useCartStore();

    const increaseQuantity = () => updateQuantity("increment", product);

    const decreaseQuantity = () => updateQuantity("decrement", product);

    const currentNumber = items.find((item) => item.id === product.id)?.quantity ?? 0;

    return (
        <div
            className={`
                absolute text-white focus:ring-4 focus:outline-none 
                focus:ring-blue-300 font-medium text-sm text-center flex mr-3 mb-3 
                bottom-0 right-0 
                ${currentNumber > 0 ? "w-24 rounded-md flex-row-reverse justify-between" : "rounded-full flex-row bg-green-700 hover:bg-green-800"}
                transition-transform transform ${currentNumber > 0 ? "scale-105" : "scale-100"}
                duration-300 ease-in-out
            `}
        >
            <div className={`flex justify-center items-center bg-green-700 hover:bg-green-800
                ${currentNumber > 0 ? "rounded-r-md p-1" : "rounded-full p-2"} 
                transition-transform transform ${currentNumber > 0 ? "scale-100" : "scale-90"} hover:scale-105 duration-300 ease-in-out
            `}
                 onClick={increaseQuantity}>
                <PlusIcon />
            </div>

            {currentNumber > 0 && (
                <input
                    type="number"
                    className="text-black text-sm p-2 border-gray-50 w-10 text-center
                    transition-opacity duration-300 ease-in-out opacity-100"
                    value={currentNumber}
                    onChange={increaseQuantity}
                />
            )}

            {currentNumber > 0 && (
                <div
                    className="bg-red-500 p-1 rounded-l-md flex justify-center items-center hover:bg-red-600
                    transition-transform transform scale-90 hover:scale-100
                    duration-300 ease-in-out"
                    onClick={decreaseQuantity}
                >
                    <MinusIcon />
                </div>
            )}
        </div>
    )
}
