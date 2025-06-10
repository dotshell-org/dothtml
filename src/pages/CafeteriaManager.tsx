"use client";

import NavBar from "../components/home/nav/NavBar";
import DownloadButton from "../components/home/download/DownloadButton";
import Image from "next/image";
import {Direction} from "@/types/home/Direction";
import LineChartDivider from "@/components/home/line-chart-divider/LineChartDivider";
import FakeCalendar from "@/components/home/calendar/FakeCalendar";
import BlurText from "@/components/home/text/BlurText";
import SemiBold from "@/components/style/SemiBold";

const CafeteriaManager = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <NavBar />

            <div className="container mt-24 mb-16 mx-auto pl-6 pr-14 py-16 w-[70rem]">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16">
                    <div className="flex-1 relative">
                        <div className="liquid-container w-80 h-80 bg-blue-500 flex ml-auto mr-20 items-center justify-center">
                            <Image
                                src="/softwares/cafeteria-manager.svg"
                                alt="Cafeteria Manager"
                                width={140}
                                height={140}
                                className="dark:invert filter brightness-0 invert"
                            />
                        </div>
                    </div>

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

            <p className="text-center text-xl font-light mt-28">
                Everything starts
            </p>
            <BlurText 
                text="With a Calendar"
                className="text-center text-7xl mb-24 font-black"
                delay={150}
                animateBy="words"
                coloredWords={{ 'calendar': 'text-blue-500' }}
            />
            
            <div className="w-full max-w-5xl mx-auto mt-10 mb-20">
                <div className="rounded-2xl bg-white/80 dark:bg-gray-900/80 shadow-lg p-4">
                    <FakeCalendar />
                </div>
            </div>

            <p className="text-center text-xl font-light mt-28 mb-20">
                Pick a Day
                <br />
                And <SemiBold>Take Action</SemiBold> !
            </p>
        </div>
    );
};

export default CafeteriaManager;