'use client';
import { useEffect, useState } from "react";
import { Transaction } from "@prisma/client";
import { getTransactionsAction } from "@/actions/getAllTransactions";

export const TransactionsList = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        console.log("Admin page with transactions loaded");
        const fetchTransactions = async () => {
            const transactions = await getTransactionsAction(page, 10);
            setTransactions(transactions);
        };
        fetchTransactions();
    }, [page]);

    return (
        <div className="p-6 bg-background min-h-screen">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Transactions</h2>
            <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Id</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-left">Amount</th>
                    <th className="py-3 px-6 text-left">Created At</th>
                </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{transaction.id}</td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">{transaction.email}</td>
                        <td className="py-3 px-6 text-left">{transaction.totalAmount}</td>
                        <td className="py-3 px-6 text-left">{new Date(transaction.createdAt).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="mt-4 flex justify-center items-center">
                <button
                    className="text-textOrange px-4 py-2 rounded hover:bg-bgOrange"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
                    </svg>

                </button>
                <span className="text-white p-2">{page}</span>
                <button
                    className="text-textOrange px-4 py-2 rounded hover:bg-bgOrange"
                    onClick={() => setPage((prev) => prev + 1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                    </svg>

                </button>
            </div>
        </div>
    );
};
