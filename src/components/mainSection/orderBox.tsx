'use client'
import { useState } from "react";
import Link from "next/link";
import { urls } from "@/lib/constants";
import useCartStore, { UserData } from "@/store/cartStore";

export const OrderBox = () => {
    const updateUserData = useCartStore((state) => state.updateUserData);

    // State to store user inputs
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");

    // Function to handle form submission
    const handleUserData = () => {
        const data: UserData = { street: street || "", city: city || "" }; // Default to empty string if fields are empty
        updateUserData(data);
    };

    return (
        <div className="w-full flex justify-center md:absolute md:bottom-0">
            <div className="text-4xl mt-3 text-center mx-7 w-[650px] h-[300px] bg-secondary/70 rounded-xl p-4 shadow-lg">
                <h2 className="text-3xl font-semibold mb-6 text-white">Place Your Order</h2>
                <div className="flex flex-col items-center space-y-4 mt-6">
                    <label className="sr-only" htmlFor="street">
                        Street
                    </label>
                    <input
                        id="street"
                        type="text"
                        placeholder="Street"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        className="w-3/4 p-2 text-xl rounded-md border border-gray-300 shadow-sm"
                    />
                    <label className="sr-only" htmlFor="city">
                        City
                    </label>
                    <input
                        id="city"
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-3/4 p-2 text-xl rounded-md border border-gray-300 shadow-sm"
                    />
                    <Link href={urls.pricing} className="w-3/4 p-2 mt-4 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition duration-300 shadow-md">
                        <button
                            onClick={handleUserData}
                        >
                            Proceed with Purchase
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
