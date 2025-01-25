// Import your images
// Carousel.js
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { slides } from "@/lib/constants"; // Adjust the path to your slides file

export const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Go to previous slide
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    // Go to next slide
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    return (
        <div className="relative w-full mx-auto overflow-hidden shadow-xl">
            <div
                className="flex transition-transform ease-in-out duration-700"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="w-full flex-shrink-0 relative"
                        style={{ height: "360px" }}
                    >
                        <Image
                            src={slide.image}
                            alt={slide.title || `Slide ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
                            <h2 className="text-2xl font-bold">{slide.title}</h2>
                        </div>
                    </div>
                ))}
            </div>

            <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 text-white bg-black bg-opacity-50 rounded-r-lg hover:bg-opacity-70 z-10"
                onClick={prevSlide}
            >
                ‹
            </button>
            <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 text-white bg-black bg-opacity-50 rounded-l-lg hover:bg-opacity-70 z-10"
                onClick={nextSlide}
            >
                ›
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-400"}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
