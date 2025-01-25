'use client';
import React, { useEffect, useState } from 'react';
import {Transaction} from "@prisma/client";
import {getTransactionsAction} from "@/actions/getTransactionsForUser";
import TransactionCard from "@/components/orders/transaction";

export function OrdersList({email}: { email: string }) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        const fetchTransactions = async () => {
            const data = await getTransactionsAction(email, page, pageSize);
            setTransactions(data);
        };
        fetchTransactions();
    }, [page, email]);

    const handleNextPage = () => setPage((prevPage) => prevPage + 1);
    const handlePreviousPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

    return (
        <div className="mt-9">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {transactions.map((transaction) => (
                    <TransactionCard key={transaction.id} transaction={transaction}/>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <button
                    onClick={handlePreviousPage}
                    className="text-textOrange px-4 py-2 rounded hover:bg-bgOrange"
                    disabled={page === 1}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
                    </svg>
                </button>
                <span className="text-white p-2">{page}</span>
                <button
                    onClick={handleNextPage}
                    className="text-textOrange px-4 py-2 rounded hover:bg-bgOrange"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}
