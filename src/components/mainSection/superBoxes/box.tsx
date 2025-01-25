'use client'
import React, { useState } from "react";

type BoxProps = {
    title: string;
    description: string;
};

export const Box: React.FC<BoxProps> = ({ title, description }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => setIsOpen(!isOpen);

    return (
        <div className="flex-1 min-w-[200px] bg-bgOrange p-4 rounded-lg shadow-md text-center mb-4 sm:text-left">
            <div
                className="flex items-center justify-between cursor-pointer md:cursor-auto"
                onClick={toggleAccordion}
            >
                <h3 className="text-xl font-semibold text-textOrange">
                    {title}
                </h3>
                <div className="md:hidden ml-2 text-textOrange w-5 h-5 flex justify-center items-center">
                    {!isOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25L12 15.75 4.5 8.25"/>
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/>
                        </svg>
                    )}
                </div>

            </div>
            <p className={`text-textDark mt-2 ${isOpen ? "block" : "hidden"} md:block`}>
                {description}
            </p>
        </div>
    );
};
