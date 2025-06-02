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

    const downloadOptions: DownloadOption[] = [
        {
            platform: "Windows",
            icon: "🪟",
            format: ".exe",
            downloadUrl: `/downloads/${appName.toLowerCase()}/windows`
        },
        {
            platform: "macOS",
            icon: "🍎",
            format: ".dmg",
            downloadUrl: `/downloads/${appName.toLowerCase()}/mac`
        },
        {
            platform: "Linux",
            icon: "🐧",
            format: ".AppImage/.deb",
            downloadUrl: `/downloads/${appName.toLowerCase()}/linux`
        }
    ];

    const colorClasses = {
        blue: {
            bg: "bg-blue-500",
            hoverBg: "hover:bg-blue-600",
            shadow: "hover:shadow-blue-500/25",
            optionHover: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
            optionText: "hover:text-blue-600 dark:hover:text-blue-400"
        },
        purple: {
            bg: "bg-purple-500",
            hoverBg: "hover:bg-purple-600",
            shadow: "hover:shadow-purple-500/25",
            optionHover: "hover:bg-purple-50 dark:hover:bg-purple-900/20",
            optionText: "hover:text-purple-600 dark:hover:text-purple-400"
        },
        green: {
            bg: "bg-green-500",
            hoverBg: "hover:bg-green-600",
            shadow: "hover:shadow-green-500/25",
            optionHover: "hover:bg-green-50 dark:hover:bg-green-900/20",
            optionText: "hover:text-green-600 dark:hover:text-green-400"
        }
    };

    const colors = colorClasses[colorScheme];

    return (
        <div className="relative inline-block">
            <div className="flex items-center">
                <button 
                    className={`${colors.bg} ${colors.hoverBg} text-white px-8 py-3 font-semibold cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-md ${colors.shadow} active:scale-95 relative z-10 ${
                        isExpanded ? 'rounded-l-lg rounded-r-none' : 'rounded-lg'
                    }`}
                    onMouseEnter={() => setIsExpanded(true)}
                    onMouseLeave={() => setIsExpanded(false)}
                >
                    Download Now
                </button>

                <div 
                    className={`flex transition-all duration-500 ease-out overflow-hidden ${
                        isExpanded ? 'max-w-xs opacity-100' : 'max-w-0 opacity-0'
                    }`}
                    onMouseEnter={() => setIsExpanded(true)}
                    onMouseLeave={() => setIsExpanded(false)}
                >
                    {downloadOptions.map((option, index) => (
                        <a
                            key={option.platform}
                            href={option.downloadUrl}
                            className={`flex flex-col items-center justify-center px-3 py-3 bg-white dark:bg-gray-800 border-t border-b border-r border-gray-200 dark:border-gray-700 transition-all duration-300 cursor-pointer shadow-lg ${colors.optionHover} ${colors.optionText} group hover:z-20 ${
                                index === downloadOptions.length - 1 ? 'rounded-r-lg' : ''
                            } ${isExpanded ? 'transform translate-x-0 scale-100' : 'transform scale-95'}`}
                            style={{ 
                                transitionDelay: `${index * 75}ms`,
                                minWidth: '75px',
                                height: '65px'
                            }}
                        >
                            <span className="text-lg mb-1 group-hover:scale-110 transition-transform duration-200">
                                {option.icon}
                            </span>
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:font-semibold transition-all duration-200 text-center">
                                {option.platform}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 text-center leading-tight">
                                {option.format}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DownloadButton;
