import NavBar from "@/components/home/nav/NavBar";
import LogoContainer from "@/components/home/logo/LogoContainer";
import LineChartDivider from "@/components/home/line-chart-divider/LineChartDivider";

const Home = () => {
    return (
        <div className="h-screen relative">
            <div className="absolute w-full h-[calc(100%-7rem)]">
                <NavBar />
                <LogoContainer />
            </div>
            <div className="h-[calc(100%-10rem)]"></div>
            <LineChartDivider color="#3B82F6" />
        </div>
    )
}

export default Home