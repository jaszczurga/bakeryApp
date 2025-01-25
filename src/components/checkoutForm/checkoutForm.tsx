'use client';
import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/cartStore";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormSchema, IFormInput} from "@/components/checkoutForm/zod";
import {saveOrder} from "@/actions/saveOrderAction";


export const CheckoutForm = ({userEmail}: {userEmail:string}) => {
    const userData = useCartStore((state) => state.userData);
    const totalPriceFromStore = useCartStore((state) => state.total);
    const clearCart = useCartStore((state) => state.clearCart);
    const {register,control, handleSubmit, formState: {errors},} = useForm<IFormInput>({resolver: zodResolver(FormSchema)})
    const cartItems = useCartStore(state => state.items);
    const onSubmit =  async (data: IFormInput) => {
        console.log("Form data", data);
        console.log("cartProducts", cartItems);
        const result = await saveOrder(data, cartItems);
        if (result.success) {
            alert(result.message);
            clearCart();
            router.push('/');
        } else {
            alert(`Error: ${result.message}`);
        }
    }
    useEffect(() => {
        if (userData) {
            setCity(userData.city || '');
            setStreet(userData.street || '');
            setZipcode(userData.zip || '');
            setPhone(userData.phone || '');
        }
    }, [userData]);

    const [city, setCity] = useState(userData.city);
    const [street, setStreet] = useState(userData.street);
    const [zipcode, setZipcode] = useState(userData.zip);
    const [email, setEmail] = useState(userEmail);
    const [phone, setPhone] = useState(userData.phone);

    const router = useRouter();

    return (
        <form
            className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-md bg-bgOrange"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Order Form</h2>

            {/* City Field */}
            <div className="mb-4">
                <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-600 mb-1"
                >
                    City
                </label>
                <input
                    {...register("city")}
                    type="text"
                    id="city"
                    defaultValue={userData?.city || ""}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
                    required
                />
            </div>
            {
                errors?.city && <p className="text-red-500">{errors.city.message}</p>
            }

            {/* Street Field */}
            <div className="mb-4">
                <label
                    htmlFor="street"
                    className="block text-sm font-medium text-gray-600 mb-1"
                >
                    Street
                </label>
                <input
                    {...register("street")}
                    type="text"
                    id="street"
                    defaultValue={userData?.street || ""}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
                    required
                />
            </div>
            {
                errors?.street && <p className="text-red-500">{errors.street.message}</p>
            }

            {/* Zipcode Field */}
            <div className="mb-4">
                <label
                    htmlFor="zipcode"
                    className="block text-sm font-medium text-gray-600 mb-1"
                >
                    Zipcode
                </label>
                <input
                    {...register("zipcode")}
                    type="text"
                    id="zipcode"
                    defaultValue={userData?.zip || ""}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
                    required
                />
            </div>
            {
                errors?.zipcode && <p className="text-red-500">{errors.zipcode.message}</p>
            }

            {/* Email Field */}
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-600 mb-1"
                >
                    Email
                </label>
                <input
                    {...register("email")}
                    type="email"
                    id="email"
                    defaultValue={userEmail}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
                    required
                />
            </div>
            {
                errors?.email && <p className="text-red-500">{errors.email.message}</p>
            }

            {/* Phone Number */}
            <div className="mb-4">
                <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-600 mb-1"
                >
                    Phone Number
                </label>
                <input
                    {...register("phone")}
                    type="tel"
                    id="phone"
                    defaultValue={userData?.phone || ""}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
                    required
                />
            </div>
            {
                errors?.phone && <p className="text-red-500">{errors.phone.message}</p>
            }


            {/* Date Picker with Hours */}
            <div className="mb-4">
                <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-600 mb-1"
                >
                    Select Date and Time
                </label>
                <Controller
                    control={control}
                    name="date"
                    render={({ field }) => (
                        <DatePicker
                            selected={field.value as Date}
                            onChange={(date) => field.onChange(date)}
                            showTimeSelect
                            dateFormat="Pp"
                            placeholderText="Select date and time"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
                        />
                    )}
                />

            </div>

            {/* Total Price Display */}
            <div className="mb-4">
                <p className={"font-bold text-lg"}>{`Total price: ${totalPriceFromStore}`}</p>
            </div>

            {/* Order Button */}
            <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="w-full px-4 py-2 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800 transition duration-300"
            >
                Place Order
            </button>
        </form>
    );
};
