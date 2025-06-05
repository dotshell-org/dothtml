import NavBar from "@/components/home/nav/NavBar";
import LogoContainer from "@/components/home/logo/LogoContainer";
import LineChartDivider from "@/components/home/line-chart-divider/LineChartDivider";
import SemiBold from "@/components/style/SemiBold";
import SoftwareCardsGroup from "@/components/home/software-cards/SoftwareCardsGroup";
import {Direction} from "@/types/home/Direction";
import BarChart from "@/components/home/bar-chart/BarChart";
import EmojiContainer from "@/components/home/emoji/EmojiContainer";
import BlurText from "@/components/home/text/BlurText";

const Home = () => {
    return (
        <div className="h-screen relative">
            <div className="absolute w-full h-[calc(100%-7rem)]">
                <NavBar />
                <LogoContainer />
            </div>
            <div className="h-[calc(100%-10rem)]"></div>
            <LineChartDivider color="#3B82F6" direction={Direction.Left} />

            <p className="mt-50 text-center text-xl font-light">
                For us, <SemiBold>Open Source</SemiBold> is the <SemiBold>Future</SemiBold>
                <br /><br />
                Our ambition is to make open source
                <br />
                the best option for all your software
            </p>            <p className="mt-40 text-center text-xl font-light">
                By giving you
            </p>            <BlurText 
                text="What You Need"
                className="text-center text-7xl font-black"
                delay={150}
                animateBy="words"
                coloredWords={{ 'need': 'text-blue-500' }}
            />

            <SoftwareCardsGroup />

            <p className="my-40 text-center text-xl font-light">
                From cash register to complex
                <br />
                analysis for your business statistics,
                <br />
                Dotshell software helps you
                <br />
                <SemiBold>every day</SemiBold>
            </p>

            <LineChartDivider color="#EF4444" direction={Direction.Right} />            <p className="mt-40 text-center text-xl font-light">
                Benefit from
            </p>
            <BlurText 
                text="Powerful Tools"
                className="text-center text-7xl font-black"
                delay={150}
                animateBy="words"
                coloredWords={{ 'powerful': 'text-red-500' }}
            />

            <BarChart />

            <p className="my-40 text-center text-xl font-light">
                For Dotshell, <SemiBold>free</SemiBold> doesn&#39;t mean <s>weak</s>
            </p>

            <LineChartDivider color="#22C55E" direction={Direction.Left} />

            <p className="mt-40 text-center text-xl font-light">
                And <SemiBold>Open Source</SemiBold> doesn&#39;t mean <s>ugly</s>
            </p>
            <p className="mt-4 text-center text-xl font-light">
                No more software with a 20-years-old design !
            </p>            <p className="mt-40 text-center text-xl font-light">
                Meet our
            </p>
            <BlurText 
                text="Modern Design"
                className="text-center text-7xl font-black"
                delay={150}
                animateBy="words"
                coloredWords={{ 'modern': 'text-green-500' }}
            />

            <EmojiContainer />

            <p className="mt-20 mb-40 text-center text-xl font-light">
                Rediscover the icons <SemiBold>you know</SemiBold> in a no-frills interface
                <br /><br />
                Full of
                <br />
                <SemiBold>S   P   A   C   E</SemiBold>
                <br /><br />
                Take a long breath with Dotshell
            </p>

            <LineChartDivider color="#F0B100" direction={Direction.Right} />            <p className="mt-40 text-center text-xl font-light">
                And be sure
            </p>
            <BlurText 
                text="Your Data Is Safe"
                className="text-center text-7xl font-black"
                delay={150}
                animateBy="words"
                coloredWords={{ 'safe': 'text-yellow-500' }}
            />

            <p className="mt-20 mb-40 text-center text-xl font-light">
                All you data is stored locally
                <br />
                on <SemiBold>your device</SemiBold> and nothing
                <br />
                comes out of <SemiBold>your computer</SemiBold>.
                <br /><br />
                No more data leaks, no more data theft.
                <br />
                Your data is yours and yours only.
            </p>

            <footer className="w-full text-center text-xl font-light py-20 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                <p className="mb-4">
                    Made with 🥐 by <SemiBold>Dotshell</SemiBold>, France • Open Source &amp; Privacy First
                </p>
                <p className="mb-2">
                    Follow us on
                    <a href="https://github.com/dotshell-org" className="text-blue-500 hover:underline mx-1" target="_blank" rel="noopener noreferrer">GitHub</a>
                </p>
                <p className="text-sm text-neutral-400 mt-4">
                    © {new Date().getFullYear()} Dotshell. All rights reserved.
                </p>
            </footer>


        </div>
    )
}

export default Home