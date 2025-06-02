import NavBar from "@/components/home/nav/NavBar";
import Image from "next/image";

const Specto = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <NavBar />
            
            <div className="container mx-auto px-6 py-16">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="flex justify-center mb-6">
                        <Image 
                            src="/softwares/specto.svg" 
                            alt="Specto"
                            width={80}
                            height={80}
                            className="dark:invert"
                        />
                    </div>
                    <h1 className="text-5xl font-black mb-4">
                        <span className="text-green-500">Specto</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Advanced system monitoring and performance analysis for your infrastructure
                    </p>
                </div>

                {/* Features Section */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
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
                        <h2 className="text-3xl font-bold mb-4">Monitor with confidence</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                            Download Specto and take control of your system performance
                        </p>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                            Download Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Specto;
