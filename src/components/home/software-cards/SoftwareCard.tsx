import React from "react";
import Image from "next/image";

interface SoftwareCardProps {
    imageSrc: string;
    title: string;
    description: string;
}

const SoftwareCard: React.FC<SoftwareCardProps> = ({ imageSrc, title, description }) => {
    return (
        <a href={`/${title.toLowerCase().replace(' ', '-')}`}>
            <div className="w-60 h-88 mx-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow shadow-gray-400 dark:shadow-none border border-transparent dark:border-gray-700 cursor-pointer hover:-translate-y-1 transition-all duration-300">
                <Image src={"/softwares/" + imageSrc} className="relative left-1/2 -translate-x-1/2 mt-16 mb-6 dark:invert" alt={title} width={100} height={100} />
                <h1 className="text-center text-2xl font-semibold px-4">{title}</h1>
                <p className="text-center text-md font-light mt-2 px-8">{description}</p>
            </div>
        </a>
    )
};

export default SoftwareCard;