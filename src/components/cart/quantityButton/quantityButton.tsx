
import {PlusIcon} from "@/components/icons/plus";
import {MinusIcon} from "@/components/icons/minus";
import {Product} from "@prisma/client";
import useCartStore from "@/store/cartStore";

type QuantityButtonProps = {
    // setCurrentNumber: (value: (prev: number) => number) => void;
    // currentNumber: number;
    product: Product;
}

export const QuantityButton: React.FC<QuantityButtonProps> = ({product}) => {

    const {items, updateQuantity} = useCartStore();

    // const [currentNumber, setCurrentNumber] = useState(initNumber);

    const increaseQuantity = () => updateQuantity("increment", product);

    const decreaseQuantity = () => updateQuantity("decrement", product);

    const currentNumber = items.find((item) => item.id === product.id)?.quantity ?? 0;

    return (
        <div className="flex">
            <div
                className="bg-red-500 p-1 rounded-l-md flex justify-center items-center hover:bg-red-600
                    transition-transform transform scale-90 hover:scale-100
                    duration-300 ease-in-out"
                onClick={decreaseQuantity}
            >
               <MinusIcon />
            </div>
            <input
                type="number"
                className="text-black text-sm p-2 border-gray-50 w-10 text-center
                    transition-opacity duration-300 ease-in-out opacity-100"
                value={currentNumber}
                onChange={increaseQuantity}
            />

            <div
                className="bg-green-700 p-1 rounded-r-md flex justify-center items-center hover:bg-green-800
                    transition-transform transform scale-90 hover:scale-100
                    duration-300 ease-in-out"
                onClick={increaseQuantity}
            >
                <PlusIcon />
            </div>

        </div>
    )
}