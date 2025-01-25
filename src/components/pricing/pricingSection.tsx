'use client';
import { HorizontalScrollBar } from "@/components/horizontalScrollBar/horizontalScrollBar";
import { CheckProductCard } from "@/components/checkProductCard/checkProductCard";
import { useEffect, useState } from "react";
import { Product, ProductCategory } from "@prisma/client";
import { getProductsForGivenCategory } from "@/actions/getProductsForGivenCategory";
import { fetchCategoriesAction } from "@/actions/fetchCategories";
import Spinner from "@/components/spinner";

export const PricingSection = () => {

    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [currentCategory, setCurrentCategory] = useState<ProductCategory | undefined>(undefined);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(false);

    const changeCategory = (category: ProductCategory) => {
        setCurrentCategory(category);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            setLoadingCategories(true);
            try {
                const categories = await fetchCategoriesAction();
                setCategories(categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoadingCategories(false);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (!currentCategory && categories.length > 0) {
            setCurrentCategory(categories[0]);
        }
        if (currentCategory) {
            const fetchProducts = async () => {
                setLoadingProducts(true);
                try {
                    const products = await getProductsForGivenCategory(currentCategory.id, page);
                    setProducts(products);
                } catch (error) {
                    console.error("Error fetching products:", error);
                } finally {
                    setLoadingProducts(false);
                }
            };
            fetchProducts();
        }
    }, [categories, currentCategory, page]);

    return (
        <div className={"flex flex-col justify-center items-center"}>
            <div className={"max-w-[85%]"}>
                {loadingCategories ? (
                    <Spinner/>
                ) : (
                    <HorizontalScrollBar categories={categories} change={changeCategory} activeCategory={currentCategory} />
                )}
            </div>

            <div className={"w-full flex justify-center"}>
                <h1 className={"text-3xl font-bold text-white p-1"}>Pricing</h1>
            </div>
            <div className="flex flex-wrap justify-center gap-7 p-6">
                {loadingProducts ? (
                    <Spinner/>
                ) : (
                    products.map((product, index) => (
                        <CheckProductCard
                            key={index}
                            product={product}
                            buttonType="add"
                            isOpen={true}
                        />
                    ))
                )}
            </div>
            <div className="mt-4 flex justify-center items-center">
                <button
                    className="text-textOrange px-4 py-2 rounded hover:bg-bgOrange"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={loadingProducts}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
                    </svg>

                </button>
                <span className="text-white p-2">{page}</span>
                <button
                    className="text-textOrange px-4 py-2 rounded hover:bg-bgOrange"
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={loadingProducts}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                    </svg>

                </button>
            </div>
        </div>
    );
};
