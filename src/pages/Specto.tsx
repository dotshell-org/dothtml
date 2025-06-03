"use client";

import NavBar from "../components/home/nav/NavBar";
import DownloadButton from "../components/home/download/DownloadButton";
import Image from "next/image";
import {Direction} from "@/types/home/Direction";
import LineChartDivider from "@/components/home/line-chart-divider/LineChartDivider";

const Specto = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <NavBar />

            <div className="container mt-24 mb-16 mx-auto px-6 py-16 w-[55rem]">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16">
                    {/* Illustration à droite sur desktop */}
                    <div className="flex-1 relative">
                        <div className="liquid-container w-80 h-80 bg-red-500 flex absolute right-0 items-center justify-center">
                            <Image
                                src="/softwares/specto.svg"
                                alt="Specto"
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
                                <span className="text-red-500">Specto</span>
                            </h1>
                            <p className="text-xl font-light text-gray-600 dark:text-white mb-6">
                                Advanced system monitoring and performance analysis for your infrastructure
                            </p>
                            <DownloadButton appName="Specto" colorScheme="red" appType="web" />
                        </div>
                    </div>
                </div>
            </div>

            <LineChartDivider color="#fb2c36" direction={Direction.Right} />
        </div>
    );
};

export default Specto;
