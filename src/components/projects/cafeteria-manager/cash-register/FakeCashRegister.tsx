"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import ProductCard from "./ProductCard";

interface FakeItem {
    id: number;
    name: string;
    price: number;
    category: string;
    quantity: number;
    image?: string;
}

interface FakeItemGroup {
    id: number;
    name: string;
    selected: boolean;
}

const FakeCashRegister = () => {
    // Animation variants for both entering and exiting
    const variants: Variants = {
        enter: {
            opacity: 1,
            y: 0,
            transition: {duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.3}
        },
        exit: {
            opacity: 0,
            y: 40,
            transition: {duration: 0.3, ease: [0.4, 0, 1, 1]}
        }
    };

    const [groups, setGroups] = useState<FakeItemGroup[]>([
        { id: 1, name: "Beverages", selected: false },
        { id: 2, name: "Sandwiches", selected: false },
        { id: 3, name: "Desserts", selected: false },
        { id: 4, name: "Snacks", selected: false }
    ]);

    const handleGroupSelected = (id: number) => {
        setGroups(prevGroups =>
            prevGroups.map((group, index) =>
                index === id ? {...group, selected: !group.selected} : group
            )
        );
    }

    const [allItems] = useState<FakeItem[]>([
        { id: 1, name: "Coffee", price: 1.50, category: "Beverages", quantity: 1, image: "/items/coffee.png" },
        { id: 2, name: "Tea", price: 1.20, category: "Beverages", quantity: 1, image: "/items/tea.png" },
        { id: 3, name: "Water", price: 0.80, category: "Beverages", quantity: 1, image: "/items/water.png" },
        { id: 4, name: "Soda", price: 2.00, category: "Beverages", quantity: 1, image: "/items/soda.png" },
        { id: 5, name: "Ham Sandwich", price: 4.50, category: "Sandwiches", quantity: 1, image: "/items/ham-sandwich.png" },
        { id: 6, name: "Tuna Sandwich", price: 4.80, category: "Sandwiches", quantity: 1, image: "/items/tuna-sandwich.png" },
        { id: 7, name: "Croissant", price: 1.20, category: "Desserts", quantity: 1, image: "/items/croissant.png" },
        { id: 8, name: "Muffin", price: 2.50, category: "Desserts", quantity: 1, image: "/items/muffin.png" },
        { id: 9, name: "Chips", price: 1.50, category: "Snacks", quantity: 1, image: "/items/chips.png" },
        { id: 10, name: "Cookies", price: 2.00, category: "Snacks", quantity: 1, image: "/items/cookies.png" }
    ]);

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [itemsInUI, setItemsInUI] = useState<FakeItem[]>(allItems);
    const [itemsInCommand, setItemsInCommand] = useState<FakeItem[]>([]);
    const [orderStatus, setOrderStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

    // Filter items based on groups and search term
    React.useEffect(() => {
        const selectedCategories = groups.filter(g => g.selected).map(g => g.name);
        const filteredItems = allItems.filter(item => 
            (selectedCategories.length === 0 || selectedCategories.includes(item.category)) &&
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setItemsInUI(filteredItems);
    }, [groups, searchTerm, allItems]);

    const handleValidateOrder = () => {
        // Check if there are items in the order
        if (itemsInCommand.length === 0) {
            return;
        }

        // Set status to saving
        setOrderStatus('saving');

        // Simulate clearing process
        setTimeout(() => {
            setItemsInCommand([]);
            setOrderStatus('idle');
        }, 1000);
    };

    return (
        <div className="h-full flex flex-col bg-blue-500 select-none">
            <motion.div
                className="absolute right-0 bottom-0 pb-0 rounded-tl-2xl shadow-xl shadow-transparent dark:border-r dark:border-b border-gray-600 bg-white dark:bg-gray-900 p-2 xs:p-3 sm:p-6 md:p-8 w-[calc(100%-2.5rem)] h-[calc(100%-2rem)] -translate-x-2 text-black dark:text-white flex select-none"
                initial={{opacity: 0, y: 40}}
                animate="enter"
                exit="exit"
                variants={variants}
            >
                <div className="flex-1 h-full p-1 xs:p-2 sm:p-3 md:p-4 pt-2 xs:pt-4 sm:pt-5 md:pt-6 rounded-t-xl border border-b-0 border-gray-200 dark:border-gray-600">
                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search for products"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-1 xs:px-2 sm:px-3 md:px-4 py-0.5 xs:py-1 sm:py-1.5 md:py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1 xs:mb-2 sm:mb-3 md:mb-4 text-xs sm:text-base"
                    />

                    {/* Item Group Choice Bar */}
                    <div className="flex gap-0.5 xs:gap-1 sm:gap-1.5 md:gap-2 mb-1 xs:mb-2 sm:mb-3 md:mb-4 flex-wrap">
                        {groups.map((group, index) => (
                            <button
                                key={group.id}
                                onClick={() => handleGroupSelected(index)}
                                className={`px-1 xs:px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-0.75 md:py-1 rounded-full text-[10px] xs:text-xs sm:text-sm transition-colors cursor-pointer ${
                                    group.selected 
                                        ? 'bg-blue-500 text-white' 
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                }`}
                            >
                                {group.name}
                            </button>
                        ))}
                    </div>

                    <div
                        className="w-full max-h-[calc(100%-4.5rem)] xs:max-h-[calc(100%-5rem)] sm:max-h-[calc(100%-5.2rem)] md:max-h-[calc(100%-5.4rem)] pr-1 xs:pr-2 sm:pr-2.5 md:pr-3 pb-2 xs:pb-3 sm:pb-4 md:pb-6 pt-0.5 xs:pt-1 sm:pt-1.5 md:pt-2 overflow-y-auto grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-1 xs:gap-2 sm:gap-3 md:gap-4 mt-1 xs:mt-2 sm:mt-3 md:mt-4">
                        {itemsInUI.map((item, index) => {
                            return (
                                <div key={index} onClick={() => {
                                    setItemsInCommand((prevItems) => {
                                        const existingItem = prevItems.find((commandItem) => commandItem.name === item.name);
                                        if (existingItem) {
                                            return prevItems.map((commandItem) =>
                                                commandItem.name === item.name
                                                    ? {...commandItem, quantity: commandItem.quantity + 1}
                                                    : commandItem
                                            );
                                        } else {
                                            return [...prevItems, {...item, quantity: 1}];
                                        }
                                    });
                                }}>
                                    <ProductCard item={item} />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="w-40 xs:w-52 sm:w-64 md:w-72 lg:w-80 h-full p-1 xs:p-2 sm:p-3 md:p-4 rounded-t-xl ml-1 xs:ml-2 sm:ml-6 md:ml-8 border border-b-0 border-gray-200 dark:border-gray-600">
                    <div className="flex flex-col h-[calc(100%-9rem)] xs:h-[calc(100%-10rem)] sm:h-[calc(100%-11rem)] md:h-[calc(100%-12rem)]">
                        <h1 className="text-base xs:text-lg sm:text-xl md:text-2xl mt-1 xs:mt-2 sm:mt-3 md:mt-4 text-black dark:text-white">Order</h1>
                        <div
                            className="flex-1 mt-1 xs:mt-2 sm:mt-2.5 md:mt-3 py-0.5 xs:py-1 sm:py-1.5 md:py-2 rounded-xl shadow border-0 dark:border dark:border-gray-600 overflow-y-auto"
                        >
                            {
                                itemsInCommand.map((item, index) => {
                                    return (
                                        <div
                                            key={item.name}
                                            className={`flex justify-between items-center mx-0.5 xs:mx-1 sm:mx-3 md:mx-4 p-0.5 xs:p-1 sm:p-1.5 md:p-2 ${index !== itemsInCommand.length - 1 && "border-b"} border-gray-200 dark:border-gray-700`}
                                            onClick={() => {
                                                setItemsInCommand(prevItems => {
                                                    const updatedItems = prevItems.reduce<FakeItem[]>((acc, curr) => {
                                                        if (curr.name === item.name) {
                                                            if (curr.quantity > 1) {
                                                                acc.push({...curr, quantity: curr.quantity - 1});
                                                            }
                                                        } else {
                                                            acc.push(curr);
                                                        }
                                                        return acc;
                                                    }, []);
                                                    return updatedItems;
                                                });
                                            }}
                                        >
                                            <motion.div
                                                className="flex justify-between items-center w-full cursor-pointer"
                                                initial={{scale: 1}}
                                                whileTap={{scale: 0.9}}
                                                transition={{duration: 0.2}}
                                            >
                                                <div className="max-w-[70%]">
                                                    <h3 className="text-xs xs:text-sm sm:text-base md:text-lg font-medium text-black dark:text-white truncate">{item.name}</h3>
                                                    <p className="text-[8px] xs:text-[10px] sm:text-xs md:text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                                                </div>
                                                <span className="text-xs xs:text-sm sm:text-base md:text-lg font-bold text-black dark:text-white">
                                                    €{(item.quantity * item.price).toFixed(2)}
                                                </span>
                                            </motion.div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div
                        className="w-full h-6 xs:h-8 sm:h-9 md:h-10 mt-2 xs:mt-4 sm:mt-6 md:mt-8 flex items-center justify-between">
                        <span className="text-base xs:text-lg sm:text-xl md:text-2xl mt-1 xs:mt-2 sm:mt-2.5 md:mt-3 text-black dark:text-white">Total</span>
                        <span className="text-base xs:text-lg sm:text-xl md:text-2xl mt-1 xs:mt-2 sm:mt-3 md:mt-4 font-bold text-black dark:text-white">€{itemsInCommand.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span>
                    </div>
                    <button
                        className={`w-full mt-2 xs:mt-3 sm:mt-3.5 md:mt-4 p-1 xs:p-1.5 sm:p-1.75 md:p-2 text-center text-xs xs:text-sm sm:text-base md:text-lg rounded-md border border-transparent hover:border-[#646cff] focus:outline-4 focus:outline-auto focus:outline-[#646cff] transition-all cursor-pointer ${
                            orderStatus === 'idle' 
                                ? 'bg-gray-100 dark:bg-gray-800' 
                                : orderStatus === 'saving' 
                                    ? 'bg-green-100 dark:bg-green-800 cursor-wait' 
                                    : orderStatus === 'success' 
                                        ? 'bg-green-100 dark:bg-green-800' 
                                        : 'bg-red-100 dark:bg-red-800'
                        }`}
                        onClick={handleValidateOrder}
                        disabled={orderStatus !== 'idle' || itemsInCommand.length === 0}
                    >
                        {orderStatus === 'idle'
                            ? "Validate"
                            : orderStatus === 'saving'
                                ? "Order Saved!"
                                : orderStatus === 'success'
                                    ? "Order Saved!"
                                    : "Error"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default FakeCashRegister;
