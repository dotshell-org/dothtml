"use client";

import NavBar from "../components/home/nav/NavBar";
import DownloadButton from "../components/home/download/DownloadButton";
import Image from "next/image";
import {Direction} from "@/types/home/Direction";
import LineChartDivider from "@/components/home/line-chart-divider/LineChartDivider";

const CafeteriaManager = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <NavBar />

            <div className="container mt-24 mb-16 mx-auto px-6 py-16 w-[55rem]">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16">
                    {/* Illustration à droite sur desktop */}
                    <div className="flex-1 relative">
                        <div className="liquid-container w-80 h-80 bg-blue-500 flex absolute right-0 items-center justify-center">
                            <Image
                                src="/softwares/cafeteria-manager.svg"
                                alt="Cafeteria Manager"
                                width={140}
                                height={140}
                                className="dark:invert filter brightness-0 invert"
                            />
                        </div>
                    </div>
                    {/* Texte et CTA à gauche sur desktop */}
                    <div className="flex-1">
                        <div className="flex flex-col md:text-left">
                            <h1 className="text-5xl font-black mb-4 mt-20">
                                Cafeteria <span className="text-blue-500">Manager</span>
                            </h1>
                            <p className="text-xl font-light text-gray-600 dark:text-white mb-6">
                                Your companion to manage your cafeteria business with ease and efficiency
                            </p>
                            <DownloadButton appName="Cafeteria Manager" colorScheme="blue" />
                        </div>
                    </div>
                </div>
            </div>

            <LineChartDivider color="#2b7fff" direction={Direction.Right} />
        </div>
    );
};

export default CafeteriaManager;