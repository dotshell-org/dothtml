"use client";

import NavBar from "@/components/generic/nav/NavBar";
import Image from "next/image";
import LineChartDivider from "@/components/generic/line-chart-divider/LineChartDivider";
import {Direction} from "@/types/home/Direction";
import DownloadButton from "@/components/projects/DownloadButton";
import BlurText from "@/components/generic/BlurText";
import Footer from "@/components/generic/footer/Footer";
import SemiBold from "@/components/generic/SemiBold";
import LineChart from "@/components/projects/ico/LineChart";
import PieCharts from "@/components/projects/ico/PieCharts";
import Summary from "@/components/projects/ico/Summary";
import SynthesisTable from "@/components/projects/ico/SynthesisTable";
import Carousel from "@/components/projects/ico/Carousel";
import BarChart from "@/components/projects/ico/BarChart";
import StockLineChart from "@/components/projects/ico/StockLineChart";
import StockSummary from "@/components/projects/ico/StockSummary";
import ClientProviders from "@/app/ClientProviders";

const Ico = () => {
    return (
        <ClientProviders>
            <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <NavBar />

            <div className="container mt-10 md:mt-24 mb-8 md:mb-16 mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 max-w-7xl">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8 md:mb-16">
                    <div className="flex-1 relative order-1 md:order-1">
                        <div className="liquid-container w-20 h-20 sm:w-80 sm:h-80 bg-purple-500 flex mx-auto md:ml-auto md:mr-20 items-center justify-center">
                            <Image
                                src="/softwares/ico.svg"
                                alt="Ico"
                                width={140}
                                height={140}
                                className="dark:invert filter brightness-0 invert scale-70 md:scale-100"
                            />
                        </div>
                    </div>
                    <div className="flex-1 order-2 md:order-2">
                        <div className="flex flex-col text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-black mb-4 mt-4 md:mt-20">
                                <span className="text-purple-500">Ico</span>
                            </h1>
                            <p className="text-md md:text-lg font-light text-black dark:text-white mb-6 px-8 sm:px-0">
                                Your powerful accounting solution to manage finances, inventory, and sales with ease
                            </p>
                            <DownloadButton appName="Ico" colorScheme="purple" />
                        </div>
                    </div>
                </div>
            </div>

            <LineChartDivider color="#ad46ff" direction={Direction.Right} />

            <p className="text-center text-lg sm:text-xl font-light mt-16 sm:mt-20 md:mt-28 px-4">
                Accounting has always been reserved for trained professionals and experts
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>It was never truly accessible to everyone
            </p>

            <p className="text-center text-lg sm:text-xl font-light mt-16 sm:mt-20 md:mt-28 px-4">
                But now,
            </p>
            <BlurText
                text="See Clear"
                className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-12 sm:mb-16 md:mb-24 font-black px-4"
                delay={150}
                animateBy="words"
                coloredWords={{ 'clear': 'text-purple-500' }}
            />

            <LineChart />

            <p className="text-center text-lg sm:text-xl font-light mt-16 sm:mt-20 md:mt-28 mb-16 sm:mb-20 md:mb-28 px-4">
                When you open Ico, you instantly see <SemiBold>what matters</SemiBold>
            </p>

            <PieCharts />

            <p className="text-center text-lg sm:text-xl font-light mt-16 sm:mt-20 md:mt-28 px-4">
                See your <SemiBold>debits</SemiBold> and <SemiBold>credits</SemiBold> with a category approach and even your <SemiBold>profits</SemiBold> in an
            </p>
            <BlurText
                text="Hyper-Compact Synthesis"
                className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-12 sm:mb-16 md:mb-24 font-black px-4"
                delay={150}
                animateBy="words"
                coloredWords={{ 'synthesis': 'text-purple-500' }}
            />

            <SynthesisTable />

            <p className="text-center text-lg sm:text-xl font-light mt-16 sm:mt-20 md:mt-28 px-4">
                But Ico is also a <SemiBold>deep analytics tool</SemiBold>. And it&#39;s never been as simple as with
            </p>
            <BlurText
                text="Credit & Debit Summaries"
                className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-12 sm:mb-16 md:mb-24 font-black px-4"
                delay={150}
                animateBy="words"
                coloredWords={{ 'summaries': 'text-purple-500' }}
            />

            <Summary />
            <p className="text-xs text-center text-gray-400 mb-20">
                * filters and sorts aren&#39;t available in this demo, but they are in the real app.
            </p>

            <p className="text-center text-lg sm:text-xl font-light mt-16 sm:mt-20 md:mt-28 mb-16 sm:mb-20 md:mb-28 px-4">
                Use <SemiBold>filters</SemiBold> and <SemiBold>sorts</SemiBold>, then click on cells of the same column
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>and get great numbers from the <SemiBold>aggregation toolbar</SemiBold>!
            </p>

            <LineChartDivider color="#ef4444" direction={Direction.Left} />

            <p className="text-center text-lg sm:text-xl font-light mt-16 sm:mt-20 md:mt-28 px-4">
                When it comes to data recording, Ico lets you keep track of
            </p>
            <BlurText
                text="Every Last Detail"
                className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-12 sm:mb-16 md:mb-24 font-black px-4"
                delay={150}
                animateBy="words"
                coloredWords={{ 'detail': 'text-red-500' }}
            />

            <Carousel />
            <div className="h-20 sm:h-32 md:h-40"></div>

            <LineChartDivider color="#22c55e" direction={Direction.Right} />

            <p className="text-center text-lg sm:text-xl font-light mt-16 sm:mt-20 md:mt-28 px-4">
                Ico not only lets you manage your accounts
            </p>
            <p className="text-center text-lg sm:text-xl font-light mt-8 sm:mt-12 md:mt-18 px-4">
                But also
            </p>
            <BlurText
                text="Your Stock"
                className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-12 sm:mb-16 md:mb-24 font-black px-4"
                delay={150}
                animateBy="words"
                coloredWords={{ 'stock': 'text-green-500' }}
            />

            <p className="text-center text-lg sm:text-xl font-light mt-16 sm:mt-20 md:mt-28 mb-16 sm:mb-20 md:mb-28 px-4">
                Exactly as for the accounting tab, everything starts with <SemiBold>charts</SemiBold>
            </p>

            <BarChart />

            <p className="text-center text-lg sm:text-xl font-light mt-16 sm:mt-20 md:mt-28 mb-16 sm:mb-20 md:mb-28 px-4">
                Trace the <SemiBold>evolution</SemiBold> of a certain object
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span><SemiBold>over the last 12 months</SemiBold> and obtain the inventory for
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>a <SemiBold>specific date</SemiBold> in the form of a summary table.
            </p>

            <StockLineChart />

            <p className="text-center text-lg sm:text-xl font-light mt-8 sm:mt-12 md:mt-18 px-4">
                In the Stock tab, take advantage of a specially designed
            </p>
            <BlurText
                text="Movement Summary"
                className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-12 sm:mb-16 md:mb-24 font-black px-4"
                delay={150}
                animateBy="words"
                coloredWords={{ 'summary': 'text-green-500' }}
            />

            <StockSummary />
            <p className="text-xs text-center text-gray-400 mb-20">
                * filters and sorts aren&#39;t available in this demo, but they are in the real app.
            </p>

            <p className="text-center text-lg sm:text-xl font-light mt-8 sm:mt-12 md:mt-18 px-4">
                Simply record your movements as you wish, or take advantage of the
            </p>
            <BlurText
                text="Stock Links"
                className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-12 sm:mb-16 md:mb-24 font-black px-4"
                delay={150}
                animateBy="words"
                coloredWords={{ 'links': 'text-green-500' }}
            />

            <p className="text-center text-lg sm:text-xl font-light mt-16 sm:mt-20 md:mt-28 mb-16 sm:mb-20 md:mb-28 px-4">
                Each time a product is recorded in an invoice,
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>Ico will remind you to associate it with a movement in your stock.
            </p>

            <p className="text-center text-lg sm:text-xl font-light mt-16 sm:mt-20 md:mt-28 mb-16 sm:mb-20 md:mb-28 px-4">
                Don&#39;t be <s>overwhelmed</s> by inventory management
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>Ico is your <SemiBold>copilot</SemiBold>!
            </p>

            <LineChartDivider color="#3b82f6" direction={Direction.Left} />

            <p className="text-center text-lg sm:text-xl font-light mt-16 sm:mt-20 md:mt-28 mb-16 sm:mb-20 md:mb-28 px-4">
                Finally, Ico also manages your sales.
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>Enjoy the same graphics as Cafeteria Manager, Ico&#39;s powerful summary,
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>and a sales editor similar to the stock movement editor.
            </p>

            <p className="text-center text-lg sm:text-xl font-light mt-8 sm:mt-12 md:mt-18 px-4">
                The best part? Sales are
            </p>
            <BlurText
                text="Connected to Stock"
                className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-12 sm:mb-16 md:mb-24 font-black px-4"
                delay={150}
                animateBy="words"
                coloredWords={{ 'stock': 'text-blue-500' }}
            />

            <p className="text-center text-lg sm:text-xl font-light mt-16 sm:mt-20 md:mt-28 mb-16 sm:mb-20 md:mb-28 px-4">
                Each product added to sales is automatically associated
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>with a negative movement in inventory,
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>almost automating its evolution.
            </p>

            <div className="text-center mt-16 sm:mt-24 md:mt-32 mb-16 sm:mb-24 md:mb-32 px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4">
                    Ready to empower your entrepreneurial journey?
                </h2>
                <p className="text-lg sm:text-xl font-light text-gray-600 dark:text-white mb-8">
                    With Ico, accounting and management are finally accessible to everyone. Take control and start building your success today.
                </p>
                <a
                    href="#"
                    className="inline-flex items-center justify-center px-6 py-3 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-medium text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
                    style={{ scrollBehavior: 'smooth' }}
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                >
                    Download Now
                </a>
            </div>

            <Footer />
            
        </div>
        </ClientProviders>
    );
};

export default Ico;
