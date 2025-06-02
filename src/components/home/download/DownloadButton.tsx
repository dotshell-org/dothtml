"use client";

import React, { useState } from "react";

interface DownloadOption {
    platform: string;
    icon: string;
    format: string;
    downloadUrl?: string;
}

interface DownloadButtonProps {
    appName: string;
    colorScheme: "blue" | "purple" | "green";
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ appName, colorScheme }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);const downloadOptions: DownloadOption[] = [
        {
            platform: "Windows",
            icon: "🪟",
            format: "",
            downloadUrl: `/downloads/${appName.toLowerCase()}/windows`
        },
        {
            platform: "macOS",
            icon: "🍎",
            format: "",
            downloadUrl: `/downloads/${appName.toLowerCase()}/mac`
        },
        {
            platform: "Linux",
            icon: "🐧",
            format: "",
            downloadUrl: `/downloads/${appName.toLowerCase()}/linux`
        }
    ];const colorClasses = {
        blue: {
            bg: "bg-blue-500",
            hoverBg: "hover:bg-blue-600",
            shadow: "hover:shadow-blue-500/25",
            containerBg: "bg-blue-50 dark:bg-blue-900",
            containerBorder: "border-blue-200 dark:border-blue-700",
            optionHover: "hover:bg-blue-100 dark:hover:bg-blue-800/50",
            optionText: "hover:text-blue-600 dark:hover:text-blue-400"
        },
        purple: {
            bg: "bg-purple-500",
            hoverBg: "hover:bg-purple-600",
            shadow: "hover:shadow-purple-500/25",
            containerBg: "bg-purple-50 dark:bg-purple-900",
            containerBorder: "border-purple-200 dark:border-purple-700",
            optionHover: "hover:bg-purple-100 dark:hover:bg-purple-800/50",
            optionText: "hover:text-purple-600 dark:hover:text-purple-400"
        },
        green: {
            bg: "bg-green-500",
            hoverBg: "hover:bg-green-600",
            shadow: "hover:shadow-green-500/25",
            containerBg: "bg-green-50 dark:bg-green-900",
            containerBorder: "border-green-200 dark:border-green-700",
            optionHover: "hover:bg-green-100 dark:hover:bg-green-800/50",
            optionText: "hover:text-green-600 dark:hover:text-green-400"
        }
    };

    const colors = colorClasses[colorScheme];

    const handleMouseEnter = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
        setIsExpanded(true);
    };    const handleMouseLeave = () => {
        const id = setTimeout(() => {
            setIsExpanded(false);
        }, 150); // 150ms de délai
        setTimeoutId(id);
    };return (
        <div 
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >            {/* Bouton principal */}
            <button 
                className={`${colors.bg} text-white px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 transform shadow-md relative z-10 ${
                    isExpanded 
                        ? `${colors.hoverBg.replace('hover:', '')} scale-105 shadow-xl ${colors.shadow.replace('hover:', '')}` 
                        : `${colors.hoverBg} hover:scale-105 hover:shadow-xl ${colors.shadow} active:scale-95`
                }`}
            >
                Download Now
            </button>

            {/* Options de téléchargement en dessous */}
            <div 
                className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 transition-all duration-300 ease-out ${
                    isExpanded ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
            >
                <div className={`flex items-center justify-center gap-3 ${colors.containerBg} p-5 rounded-lg shadow-xl border ${colors.containerBorder} min-w-max`}>
                    {downloadOptions.map((option, index) => (
                        <a
                            key={option.platform}
                            href={option.downloadUrl}
                            className={`flex flex-col transition-all duration-300 cursor-pointer ${colors.optionHover} ${colors.optionText} group hover:scale-105 hover:shadow-md rounded-lg px-4 py-2`}
                            style={{ 
                                transitionDelay: `${index * 50}ms`,
                                minWidth: '90px',
                                height: '70px'
                            }}
                        >
                            {/* Logo centré */}
                            <div className="flex justify-center mb-1">
                                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                                    {option.icon}
                                </span>
                            </div>
                            
                            {/* Nom de la plateforme centré sous le logo */}
                            <div className="flex-1 flex flex-col justify-center">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:font-semibold transition-all duration-200 text-center block">
                                    {option.platform}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DownloadButton;
