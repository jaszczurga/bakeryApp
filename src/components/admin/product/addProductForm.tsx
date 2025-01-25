'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchemaProduct, IFormProductInput } from "@/components/admin/product/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { addProductAction } from "@/actions/addProductAction";
import { fetchCategoriesAction } from "@/actions/fetchCategories";
import {FileInput} from "@/components/admin/product/fileDrop";
import {redirect} from "next/navigation";

const AddProductForm = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<IFormProductInput>({
        resolver: zodResolver(FormSchemaProduct),
    });

    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const [newCategoryMode, setNewCategoryMode] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await fetchCategoriesAction();
            setCategories(categories);
        };
        fetchCategories();
    }, []);

    const onSubmit = async (data: IFormProductInput) => {
        console.log(data);
        const result = await addProductAction(data);
        if (result.success) {
            alert(result.message);
            redirect("/pricing")
        } else {
            alert(`Error: ${result.message}`);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-md bg-bgOrange"
        >
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Add New Product</h2>

            {/* Product Name */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Product Name</label>
                <input
                    {...register('name')}
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
                    required
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Description */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                <textarea
                    {...register('description')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
                ></textarea>
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            {/* Price */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Price</label>
                <input
                    {...register('price', { valueAsNumber: true })}
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
                    required
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>

            {/* Image */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Image URL</label>
                <FileInput control={control} name="img" />
                {/*{errors.img && <p className="text-red-500 text-sm">{errors.img.message}</p>}*/}
            </div>

            {/* Category */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
                {!newCategoryMode ? (
                    <select
                        {...register('category')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                ) : (
                    <div>
                        <input
                            {...register('newCategoryName')}
                            type="text"
                            placeholder="New category name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                            required
                        />
                        <textarea
                            {...register('newCategoryDescription')}
                            placeholder="Description (optional)"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
                        ></textarea>
                        <FileInput control={control} name="categoryImg"/>
                    </div>
                )}
                {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>

            <div className="flex items-center mb-4">
                <input
                    type="checkbox"
                    checked={newCategoryMode}
                    onChange={() => setNewCategoryMode(!newCategoryMode)}
                    className="mr-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                />
                <label className="text-sm text-gray-600">Add new category</label>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full px-4 py-2 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800 transition duration-300"
            >
                Add Product
            </button>
        </form>
    );
};

export default AddProductForm;
