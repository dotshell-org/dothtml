// import MetallicLogo from "@/components/home/logo/MetallicLogo";
import Image from 'next/image';

const LogoContainer = () => {
    return (
        <div className="w-full mb-16 flex flex-col items-center justify-center px-4">
            <Image
                className="w-64 lg:w-80 xl:w-[350px] h-auto invert"
                src="/dotshell-logo.svg"
                alt="Dotshell Logo"
                width={350}
                height={350}
                priority
            />

            {/* <MetallicLogo /> */}

            <h1 className="text-6xl xl:text-7xl font-black text-white text-center">
                Dotshell
            </h1>
            <h2 className="mt-2 text-base md:text-lg lg:text-xl font-light text-white/80 text-center">
                Be Evil
            </h2>
        </div>
    );
};

export default LogoContainer;
