import React from 'react';
import {dateFormatter} from "@/lib/dateFormatter";
import {Transaction} from "@prisma/client";

const TransactionCard = ({ transaction }: {transaction: Transaction}) => {
    return (
        <div
            key={transaction.id}
            className="bg-bgOrange shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
        >
            <h3 className="text-lg font-semibold text-gray-800">
                Transaction ID: {transaction.id}
            </h3>
            <p className="text-sm text-gray-500">Date: {new Date(transaction.createdAt).toLocaleDateString()}</p>
            <p className="mt-2 text-sm text-gray-700">Email: {transaction.email}</p>

            <div className="mt-4">
                <h4 className="text-md font-medium text-gray-800">Orders:</h4>
                {transaction.orders.map((order) => (
                    <div key={order.id} className="mt-2 border-t pt-2">
                        <h5 className="text-sm font-medium text-gray-700">Product: {order.product.name}</h5>
                        <p className="text-sm text-gray-700">Quantity: {order.quantity}</p>
                        <p className="text-sm text-gray-700">Price: {order.product.price}</p>
                        <p className="text-sm text-gray-700">Total: {order.quantity * order.product.price}</p>
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <h4 className="text-md font-medium text-gray-800">Details:</h4>
                <p className="text-sm text-gray-700">Status: {transaction.status}</p>
                <p className="text-sm text-gray-700">Delivery Date: {dateFormatter(transaction.deliveryDate)}</p>
                <p className="text-sm text-gray-700">Total: ${transaction.totalAmount.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default TransactionCard;
