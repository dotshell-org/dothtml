"use client";

import NavBar from "../components/home/nav/NavBar";
import DownloadButton from "../components/home/download/DownloadButton";
import Image from "next/image";

const CafeteriaManager = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <NavBar />
            
            <div className="container mx-auto px-6 py-16">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="flex justify-center mb-6">
                        <Image 
                            src="/softwares/cafeteria-manager.svg" 
                            alt="Cafeteria Manager"
                            width={80}
                            height={80}
                            className="dark:invert"
                        />
                    </div>
                    <h1 className="text-5xl font-black mb-4">
                        Cafeteria <span className="text-blue-500">Manager</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Your companion to manage your cafeteria business with ease and efficiency
                    </p>
                </div>                {/* Features Section */}
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h3 className="text-xl font-semibold mb-3">Order Management</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Streamline your order process from kitchen to customer
                        </p>
                    </div>
                    <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h3 className="text-xl font-semibold mb-3">Inventory Control</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Keep track of your ingredients and supplies in real-time
                        </p>
                    </div>
                    <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h3 className="text-xl font-semibold mb-3">Analytics Dashboard</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Monitor your business performance with detailed insights
                        </p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8">
                        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                            Download Cafeteria Manager and transform your business today
                        </p>
                        <DownloadButton appName="Cafeteria Manager" colorScheme="blue" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CafeteriaManager;
