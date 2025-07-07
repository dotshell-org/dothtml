import React from "react";
import Image from "next/image";

interface SoftwareCardProps {
    imageSrc: string;
    title: string;
    description: string;
}

const SoftwareCard: React.FC<SoftwareCardProps> = ({ imageSrc, title, description }) => {
    return (
        <a href={`/projects/${title.toLowerCase().replace(' ', '-')}`}>
            <div className="w-64 max-w-full sm:w-60 h-auto sm:h-72 sm:pt-11 mx-2 sm:mx-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow shadow-gray-400 dark:shadow-none border border-transparent dark:border-gray-700 cursor-pointer hover:-translate-y-1 transition-all duration-300 flex flex-col items-center py-8 px-4">
                <Image src={"/softwares/" + imageSrc} className="mb-6 dark:invert w-20 h-20" alt={title} width={100} height={100} />
                <h1 className="text-center text-lg sm:text-xl font-semibold px-2">{title}</h1>
                <p className="text-center text-sm sm:text-md font-light mt-2 px-2">{description}</p>
            </div>
        </a>
    )
};

export default SoftwareCard;