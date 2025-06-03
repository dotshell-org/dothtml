"use client";

import NavBar from "../components/home/nav/NavBar";
import DownloadButton from "../components/home/download/DownloadButton";
import Image from "next/image";
import LineChartDivider from "@/components/home/line-chart-divider/LineChartDivider";
import {Direction} from "@/types/home/Direction";

const Ico = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <NavBar />

            <div className="container mt-24 mb-16 mx-auto px-6 py-16 w-[55rem]">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16">
                    <div className="flex-1 relative">
                        <div className="liquid-container w-80 h-80 bg-purple-500 flex absolute right-0 items-center justify-center">
                            <Image
                                src="/softwares/ico.svg"
                                alt="Ico"
                                width={140}
                                height={140}
                                className="dark:invert filter brightness-0 invert"
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col md:text-left">
                            <h1 className="text-5xl font-black mb-4 mt-20">
                                <span className="text-purple-500">Ico</span>
                            </h1>
                            <p className="text-xl font-light text-gray-600 dark:text-white mb-6">
                                Your powerful accounting solution to manage finances, inventory, and sales with ease
                            </p>
                            <DownloadButton appName="Ico" colorScheme="purple" />
                        </div>
                    </div>
                </div>
            </div>

            <LineChartDivider color="#ad46ff" direction={Direction.Right} />
        </div>
    );
};

export default Ico;
