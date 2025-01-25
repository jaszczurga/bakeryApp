import React, { useState } from 'react';
import Image from "next/image";
import { breadImage } from "@/lib/constants";

export const Modal = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [quantity, setQuantity] = useState(1);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(prev => prev - 1);
    };

    return (
        <div>
            <button
                onClick={toggleModal}
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="button"
            >
                Toggle modal
            </button>
            {isOpen && (
                <div
                    className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-[700px] mx-4 md:mx-0 p-4 sm:p-6 md:p-8">
                        {/* Close Button */}
                        <button
                            onClick={toggleModal}
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                            </svg>
                        </button>
                        <div className="space-y-4">
                            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-between">
                                <div className="relative w-full md:w-[50%] h-48 md:h-72">
                                    <Image
                                        src={breadImage}
                                        alt="Bread"
                                        className="object-cover rounded-lg"
                                        layout="fill"
                                    />
                                </div>
                                <div className="flex flex-col justify-between w-full">
                                    <div className="flex flex-col justify-center text-center md:text-left">
                                        <h2 className="text-xl font-semibold text-gray-800">Delicious Bread</h2>
                                        <p className="text-gray-600 mt-2">
                                            A freshly baked, golden-brown bread with a crispy crust and soft, fluffy center.
                                            Perfect for breakfast or any meal.
                                        </p>
                                    </div>
                                    {/* Quantity and Action Buttons */}
                                    <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-gray-200 space-y-2 sm:space-y-0">
                                        <div className="flex items-center">
                                            <button
                                                onClick={decreaseQuantity}
                                                className="px-2 py-1 bg-gray-300 rounded-l-lg text-gray-800"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14"/>
                                                </svg>
                                            </button>
                                            <span
                                                className="px-4 py-1 bg-gray-100 border-t border-b border-gray-300">{quantity}</span>
                                            <button
                                                onClick={increaseQuantity}
                                                className="px-2 py-1 bg-gray-300 rounded-r-lg text-gray-800"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M12 4.5v15m7.5-7.5h-15"/>
                                                </svg>
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => alert(`Added ${quantity} to cart`)}
                                            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg w-full sm:w-auto"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
