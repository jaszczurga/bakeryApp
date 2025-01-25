import {create} from "zustand";
import {Product} from "@prisma/client";
import {persist} from "zustand/middleware";


export interface CartProduct {
    id: string;
    quantity: number;
    price: number;
}

export interface UserData {
    email?: string;
    city?: string;
    street?: string;
    zip?: string;
    phone?: string;
}


interface CartState {
    total: number;
    items: CartProduct[];
    userData: UserData;
    updateQuantity: (type: "increment" | "decrement", productId: Product) => void;
    updateUserData: (newUserData: UserData) => void;
    clearCart: () => void;
}

const useCartStore = create<CartState>()(
    persist(
        (set,get) => ({
            total: 0,
            items: [],
            userData: {
                email: "",
                city: "",
                street: "",
                zip: "",
                phone: "",
                date: new Date(),
            },
            updateUserData: (newUserData: UserData) => {
                set((state) => ({
                    userData: {
                        ...state.userData,
                        ...newUserData,
                    }
                }));
            },
            clearCart: () => {
                set({
                    items: [],
                    total: 0,
                });
                console.log("Cart cleared");
            },
            updateQuantity: (type: "increment" | "decrement", product: Product) => {
                const cartProductExists = get().items.find((item) => item.id === product.id);
                    if(!cartProductExists){
                    set({
                        items: [...get().items,
                        {
                            id: product.id,
                            quantity: 1,
                            price: product.price
                        }
                    ],
                        total: get().total + product.price
                    });
                }else if(cartProductExists.quantity === 1 && type === "decrement"){
                    set({
                        items: get().items.filter((item) => item.id !== product.id),
                        total: get().total - product.price
                    }
                    );
                } else{
                    set({
                    items: get().items.map((item) => {
                        if(item.id === product.id){
                            return {
                                ...item,
                                quantity: type === "increment" ? item.quantity + 1 : item.quantity - 1
                            }
                        }
                        return item;
                    }),
                    total: get().total + (type === "increment" ? product.price : -product.price)
                });
                }
                console.log("Quantity updated");
            },
        }),
        {
            name: "cart-storage"
        }
    )
)

export default useCartStore;