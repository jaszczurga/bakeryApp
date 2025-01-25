'use client';
import { useState } from "react";
import { TransactionsList } from "@/components/admin/transactionsList";
import AddProductForm from "@/components/admin/product/addProductForm";

export const AdminControls = () => {
    const [control, setControl] = useState("transactions");

    const controls = [
        { id: "transactions", label: "Transactions" },
        { id: "products", label: "ProductForm" },
    ];

    return (
        <div className="p-4">
            {/* Control Panel */}
            <div className="flex justify-center mb-4 space-x-4">
                {controls.map(({ id, label }) => (
                    <button
                        key={id}
                        className={`px-4 py-2 rounded-lg text-lg font-medium transition-colors duration-300 ${
                            control === id
                                ? "bg-gray-700 text-white"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                        onClick={() => setControl(id)}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <div className="text-center">
                {control === "transactions" && <TransactionsList />}
                {control === "products" && <AddProductForm />}
            </div>
        </div>
    );
};
