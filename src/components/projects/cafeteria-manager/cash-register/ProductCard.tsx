import React from "react";
import Image from "next/image";

interface FakeItem {
    id: number;
    name: string;
    price: number;
    category: string;
    quantity: number;
    image?: string;
}

interface ProductCardProps {
    item: FakeItem;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
    return (
        <div className="rounded-xl shadow cursor-pointer hover:-translate-y-1 transition-all active:scale-95 border-0 dark:border dark:border-gray-600 bg-white dark:bg-gray-800 overflow-hidden">
            <div className="w-full aspect-square bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                {item.image ? (
                    <Image
                        src={item.image}
                        alt={item.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            // Fallback to placeholder if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling!.classList.remove('hidden');
                        }}
                    />
                ) : null}
                <span className={`text-gray-400 dark:text-gray-500 text-sm ${item.image ? 'hidden' : ''}`}>
                    No Image
                </span>
            </div>
            <h2 className="font-bold text-lg ml-2 mt-2 truncate text-black dark:text-white">{item.name}</h2>
            <h3 className="ml-2 mb-2">€{item.price.toFixed(2)}</h3>
        </div>
    );
};

export default ProductCard;
