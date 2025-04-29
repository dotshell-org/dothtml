import Image from "next/image";

const LogoContainer = () => {
    return (
        <div className="absolute w-full top-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
            <Image 
                className="dark:invert"
                src="/dotshell-logo.svg"
                alt="Dotshell Logo"
                width={350}
                height={350}
            />
            <h1 className="text-7xl font-black text-gray-900 dark:text-white">
                Dotshell
            </h1>
            <h2 className="mt-2 text-xl font-light">
                Believe in the open
            </h2>
        </div>
    )
}

export default LogoContainer;