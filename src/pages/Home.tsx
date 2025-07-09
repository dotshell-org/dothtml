import NavBar from "@/components/generic/nav/NavBar";
import LogoContainer from "@/components/home/logo/LogoContainer";
import LineChartDivider from "@/components/generic/line-chart-divider/LineChartDivider";
import SemiBold from "@/components/generic/SemiBold";
import SoftwareCardsGroup from "@/components/home/software-cards/SoftwareCardsGroup";
import {Direction} from "@/types/home/Direction";
import BarChart from "@/components/home/bar-chart/BarChart";
import EmojiContainer from "@/components/home/emoji/EmojiContainer";
import BlurText from "@/components/generic/BlurText";
import Footer from "@/components/generic/footer/Footer";

const Home = () => {
    return (
        <div className="min-h-screen relative">
            <div className="absolute w-full h-[calc(100vh-7rem)] sm:h-[calc(100vh-7rem)]">
                <NavBar />
                <LogoContainer />
            </div>
            <div className="h-[33rem] lg:h-[48rem]"></div>
            <LineChartDivider color="#3B82F6" direction={Direction.Left} />

            <p className="mt-20 sm:mt-32 md:mt-50 text-center text-lg sm:text-xl font-light px-4">
                For us, <SemiBold>Open Source</SemiBold> is the <SemiBold>Future</SemiBold>
                <br /><br />
                Our ambition is to make open source
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>the best option for all your software
            </p>
            <p className="mt-20 sm:mt-32 md:mt-40 text-center text-lg sm:text-xl font-light px-4">
                By giving you
            </p>            <BlurText
                text="What You Need"
                className="text-center text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black px-4"
                delay={150}
                animateBy="words"
                coloredWords={{ 'need': 'text-blue-500' }}
            />

            <SoftwareCardsGroup />

            <p className="my-20 sm:my-32 md:my-40 text-center text-lg sm:text-xl font-light px-4">
                From cash register to complex
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>analysis for your business statistics,
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>Dotshell software helps you
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span><SemiBold>every day</SemiBold>
            </p>

            <LineChartDivider color="#EF4444" direction={Direction.Right} />            <p className="mt-20 sm:mt-32 md:mt-40 text-center text-lg sm:text-xl font-light px-4">
                Benefit from
            </p>
            <BlurText 
                text="Powerful Tools"
                className="text-center text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black px-4"
                delay={150}
                animateBy="words"
                coloredWords={{ 'powerful': 'text-red-500' }}
            />

            <BarChart />

            <p className="my-20 sm:my-32 md:my-40 text-center text-lg sm:text-xl font-light px-4">
                For Dotshell, <SemiBold>free</SemiBold> doesn&#39;t mean <s>weak</s>
            </p>

            <LineChartDivider color="#22C55E" direction={Direction.Left} />

            <p className="mt-20 sm:mt-32 md:mt-40 text-center text-lg sm:text-xl font-light px-4">
                And <SemiBold>Open Source</SemiBold> doesn&#39;t mean <s>ugly</s>
            </p>
            <p className="mt-4 text-center text-lg sm:text-xl font-light px-4">
                No more software with a 20-years-old design!
            </p>            <p className="mt-20 sm:mt-32 md:mt-40 text-center text-lg sm:text-xl font-light px-4">
                Meet our
            </p>
            <BlurText 
                text="Modern Design"
                className="text-center text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black px-4"
                delay={150}
                animateBy="words"
                coloredWords={{ 'modern': 'text-green-500' }}
            />

            <EmojiContainer />

            <p className="mt-12 sm:mt-16 md:mt-20 mb-20 sm:mb-32 md:mb-40 text-center text-lg sm:text-xl font-light px-4">
                Rediscover the icons <SemiBold>you know</SemiBold> in a no-frills interface
                <br /><br />
                Full of
                <br />
                <SemiBold>S   P   A   C   E</SemiBold>
                <br /><br />
                Take a long breath with Dotshell
            </p>

            <LineChartDivider color="#F0B100" direction={Direction.Right} />            <p className="mt-20 sm:mt-32 md:mt-40 text-center text-lg sm:text-xl font-light px-4">
                And be sure
            </p>
            <BlurText 
                text="Your Data Is Safe"
                className="text-center text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black px-4"
                delay={150}
                animateBy="words"
                coloredWords={{ 'safe': 'text-yellow-500' }}
            />

            <p className="mt-12 sm:mt-16 md:mt-20 mb-20 sm:mb-32 md:mb-40 text-center text-lg sm:text-xl font-light px-4">
                All you data is stored locally
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>on <SemiBold>your device</SemiBold> and nothing
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>comes out of <SemiBold>your computer</SemiBold>.
                <br /><br />
                No more data leaks, no more data theft.
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>Your data is yours and yours only.
            </p>

            <Footer />


        </div>
    )
}

export default Home