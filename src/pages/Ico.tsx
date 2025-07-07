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

const FutureComponent = () => {
    return (
       <div className="flex justify-center items-center w-full h-full">
           <div className="flex flex-col items-center justify-center mt-2 mb-2 p-4 border rounded-xl">
               Future Component
           </div>
       </div>
    );
}

const Ico = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <NavBar />

            <div className="container mt-24 mb-16 mx-auto pl-6 pr-14 py-16 w-[70rem]">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16">
                    <div className="flex-1 relative">
                        <div className="liquid-container w-80 h-80 bg-purple-500 flex ml-auto mr-20 items-center justify-center">
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

            <p className="text-center text-xl font-light mt-28">
                Accounting has always been reserved for trained professionals and experts
                <br />
                It was never truly accessible to everyone
            </p>

            <p className="text-center text-xl font-light mt-28">
                But now,
            </p>
            <BlurText
                text="See Clear"
                className="text-center text-7xl mb-24 font-black"
                delay={150}
                animateBy="words"
                coloredWords={{ 'clear': 'text-purple-500' }}
            />

            <LineChart />

            <p className="text-center text-xl font-light mt-28 mb-28">
                When you open Ico, you instantly see <SemiBold>what matters</SemiBold>
            </p>

            <PieCharts />

            <p className="text-center text-xl font-light mt-28">
                See your <SemiBold>debits</SemiBold> and <SemiBold>credits</SemiBold> with a category approach and even your <SemiBold>profits</SemiBold> in an
            </p>
            <BlurText
                text="Hyper-Compact Synthesis"
                className="text-center text-7xl mb-24 font-black"
                delay={150}
                animateBy="words"
                coloredWords={{ 'synthesis': 'text-purple-500' }}
            />

            <SynthesisTable />

            <p className="text-center text-xl font-light mt-28">
                But Ico is also a <SemiBold>deep analytics tool</SemiBold>. And it&#39;s never been as simple as with
            </p>
            <BlurText
                text="Credit & Debit Summaries"
                className="text-center text-7xl mb-24 font-black"
                delay={150}
                animateBy="words"
                coloredWords={{ 'summaries': 'text-purple-500' }}
            />

            <Summary />
            <p className="text-xs text-center text-gray-400 mb-20">
                * filters and sorts aren&#39;t available in this demo, but they are in the real app.
            </p>

            <p className="text-center text-xl font-light mt-28 mb-28">
                Use <SemiBold>filters</SemiBold> and <SemiBold>sorts</SemiBold>, then click on cells of the same column
                <br />
                and get great numbers from the <SemiBold>aggregation toolbar</SemiBold>!
            </p>

            <LineChartDivider color="#ef4444" direction={Direction.Left} />

            <p className="text-center text-xl font-light mt-28">
                When it comes to data recording, Ico lets you keep track of
            </p>
            <BlurText
                text="Every Last Detail"
                className="text-center text-7xl mb-24 font-black"
                delay={150}
                animateBy="words"
                coloredWords={{ 'detail': 'text-red-500' }}
            />

            <Carousel />
            <div className="h-40"></div>

            <LineChartDivider color="#22c55e" direction={Direction.Right} />

            <p className="text-center text-xl font-light mt-28">
                Ico not only lets you manage your accounts
            </p>
            <p className="text-center text-xl font-light mt-18">
                But also
            </p>
            <BlurText
                text="Your Stock"
                className="text-center text-7xl mb-24 font-black"
                delay={150}
                animateBy="words"
                coloredWords={{ 'stock': 'text-green-500' }}
            />

            <p className="text-center text-xl font-light mt-28 mb-28">
                Exactly as for the accounting tab, everything starts with <SemiBold>charts</SemiBold>
            </p>

            <BarChart />

            <p className="text-center text-xl font-light mt-28 mb-28">
                Trace the <SemiBold>evolution</SemiBold> of a certain object
                <br />
                <SemiBold>over the last 12 months</SemiBold> and obtain the inventory for
                <br />
                a <SemiBold>specific date</SemiBold> in the form of a summary table.
            </p>

            <StockLineChart />

            <p className="text-center text-xl font-light mt-18">
                In the Stock tab, take advantage of a specially designed
            </p>
            <BlurText
                text="Movement Summary"
                className="text-center text-7xl mb-24 font-black"
                delay={150}
                animateBy="words"
                coloredWords={{ 'summary': 'text-green-500' }}
            />

            <FutureComponent />

            <p className="text-center text-xl font-light mt-18">
                Simply record your movements as you wish, or take advantage of the
            </p>
            <BlurText
                text="Stock Links"
                className="text-center text-7xl mb-24 font-black"
                delay={150}
                animateBy="words"
                coloredWords={{ 'links': 'text-green-500' }}
            />

            <p className="text-center text-xl font-light mt-28 mb-28">
                Each time a product is recorded in an invoice,
                <br />
                Ico will remind you to associate it with a movement in your stock.
            </p>

            <p className="text-center text-xl font-light mt-28 mb-28">
                Don&#39;t be <s>overwhelmed</s> by inventory management
                <br />
                Ico is your <SemiBold>copilot</SemiBold>!
            </p>

            <LineChartDivider color="#3b82f6" direction={Direction.Left} />

            <p className="text-center text-xl font-light mt-28 mb-28">
                Finally, Ico also manages your sales.
                <br />
                Enjoy the same graphics as Cafeteria Manager, Ico&#39;s powerful summary,
                <br />
                and a sales editor similar to the stock movement editor.
            </p>

            <p className="text-center text-xl font-light mt-18">
                The best part? Sales are
            </p>
            <BlurText
                text="Connected to Stock"
                className="text-center text-7xl mb-24 font-black"
                delay={150}
                animateBy="words"
                coloredWords={{ 'stock': 'text-blue-500' }}
            />

            <p className="text-center text-xl font-light mt-28 mb-28">
                Each product added to sales is automatically associated
                <br />
                with a negative movement in inventory,
                <br />
                almost automating its evolution.
            </p>

            <div className="text-center mt-32 mb-32">
                <h2 className="text-4xl font-black mb-4">
                    Ready to empower your entrepreneurial journey?
                </h2>
                <p className="text-xl font-light text-gray-600 dark:text-white mb-8">
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
    );
};

export default Ico;
