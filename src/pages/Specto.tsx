"use client";

import NavBar from "../components/home/nav/NavBar";
import DownloadButton from "../components/home/download/DownloadButton";
import Image from "next/image";

const Specto = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <NavBar />
            
            <div className="container mx-auto px-6 py-16">                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="flex justify-center mb-6">
                        <div className="liquid-container w-32 h-32 bg-green-500 flex items-center justify-center">
                            <Image 
                                src="/softwares/specto.svg" 
                                alt="Specto"
                                width={60}
                                height={60}
                                className="dark:invert filter brightness-0 invert"
                            />
                        </div>
                    </div>
                    <h1 className="text-5xl font-black mb-4">
                        <span className="text-green-500">Specto</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Advanced system monitoring and performance analysis for your infrastructure
                    </p>
                </div>                {/* Features Section */}
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h3 className="text-xl font-semibold mb-3">Real-time Monitoring</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Monitor your systems in real-time with detailed metrics and alerts
                        </p>
                    </div>
                    <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h3 className="text-xl font-semibold mb-3">Performance Analytics</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Analyze performance trends and optimize your infrastructure
                        </p>
                    </div>
                    <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h3 className="text-xl font-semibold mb-3">Custom Dashboards</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Create personalized dashboards with the metrics that matter most
                        </p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-8">
                        <h2 className="text-3xl font-bold mb-4">Monitor with confidence</h2>                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                            Download Specto source code and deploy your own monitoring solution
                        </p>
                        <DownloadButton appName="Specto" colorScheme="green" appType="web" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Specto;
