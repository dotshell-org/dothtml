// import MetallicLogo from "@/components/home/logo/MetallicLogo";
import Image from 'next/image';

const LogoContainer = () => {
    return (
        <div className="absolute w-full top-1/2 -translate-y-1/2 flex flex-col items-center justify-center px-4">
            <Image
                className="dark:invert w-64 lg:w-80 xl:w-[350px] h-auto"
                src="/dotshell-logo.svg"
                alt="Dotshell Logo"
                width={350}
                height={350}
                priority
            />

            {/* <MetallicLogo /> */}

            <h1 className="text-6xl xl:text-7xl font-black text-gray-900 dark:text-white text-center">
                Dotshell
            </h1>
            <h2 className="mt-2 text-base md:text-lg lg:text-xl font-light text-center">
                Believe in the open
            </h2>
        </div>
    );
};

export default LogoContainer;
