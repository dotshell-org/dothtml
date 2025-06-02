"use client";

import NavBar from "../components/home/nav/NavBar";
import DownloadButton from "../components/home/download/DownloadButton";
import Image from "next/image";

const Ico = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <NavBar />
            
            <div className="container mx-auto px-6 py-16">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="flex justify-center mb-6">
                        <Image 
                            src="/softwares/ico.svg" 
                            alt="Ico"
                            width={80}
                            height={80}
                            className="dark:invert"
                        />
                    </div>
                    <h1 className="text-5xl font-black mb-4">
                        <span className="text-purple-500">Ico</span>
                    </h1>                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Your powerful accounting solution to manage finances, inventory, and sales with ease
                    </p>
                </div>                {/* Features Section */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h3 className="text-xl font-semibold mb-3">Financial Management</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Track income, expenses, and generate detailed financial reports
                        </p>
                    </div>
                    <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h3 className="text-xl font-semibold mb-3">Inventory Control</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage your stock levels, suppliers, and product catalog efficiently
                        </p>
                    </div>
                    <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h3 className="text-xl font-semibold mb-3">Sales Analytics</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Monitor sales performance and customer trends with powerful analytics
                        </p>
                    </div>
                </div>                {/* CTA Section */}
                <div className="text-center">
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-8">
                        <h2 className="text-3xl font-bold mb-4">Ready to streamline your accounting?</h2>                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                            Download Ico and take control of your business finances today
                        </p>
                        <DownloadButton appName="Ico" colorScheme="purple" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ico;
