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
    appType?: "electron" | "web"; // Nouveau prop pour différencier les types d'apps
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ appName, colorScheme, appType = "electron" }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState(0); // Index de la plateforme sélectionnée

    // Options de téléchargement selon le type d'application
    const downloadOptions: DownloadOption[] = appType === "web" 
        ? [
            {
                platform: "Source",
                icon: "📦",
                format: ".zip",
                downloadUrl: `/downloads/${appName.toLowerCase()}/source.zip`
            },
            {
                platform: "Source",
                icon: "🗜️",
                format: ".tar.gz",
                downloadUrl: `/downloads/${appName.toLowerCase()}/source.tar.gz`
            }
        ]
        : [
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
                format: ".AppImage",
                downloadUrl: `/downloads/${appName.toLowerCase()}/linux`
            }
        ];const colorClasses = {
        blue: {
            bg: "bg-blue-600",
            hoverBg: "hover:bg-blue-700",
            bgSecondary: "bg-blue-600",
            hoverBgSecondary: "hover:bg-blue-700",
            containerBg: "bg-white dark:bg-gray-800",
            containerBorder: "border-gray-200 dark:border-gray-700",
            optionHover: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
            optionText: "hover:text-blue-600 dark:hover:text-blue-400"
        },
        purple: {
            bg: "bg-purple-600",
            hoverBg: "hover:bg-purple-700",
            bgSecondary: "bg-purple-600",
            hoverBgSecondary: "hover:bg-purple-700",
            containerBg: "bg-white dark:bg-gray-800",
            containerBorder: "border-gray-200 dark:border-gray-700",
            optionHover: "hover:bg-purple-50 dark:hover:bg-purple-900/20",
            optionText: "hover:text-purple-600 dark:hover:text-purple-400"
        },
        green: {
            bg: "bg-green-600",
            hoverBg: "hover:bg-green-700",
            bgSecondary: "bg-green-600",
            hoverBgSecondary: "hover:bg-green-700",
            containerBg: "bg-white dark:bg-gray-800",
            containerBorder: "border-gray-200 dark:border-gray-700",
            optionHover: "hover:bg-green-50 dark:hover:bg-green-900/20",
            optionText: "hover:text-green-600 dark:hover:text-green-400"
        }
    };const colors = colorClasses[colorScheme];
    const currentOption = downloadOptions[selectedPlatform];

    const handlePlatformSelect = (index: number): void => {
        setSelectedPlatform(index);
        setIsExpanded(false);
    };return (        <div className="relative inline-block">
            <div className="flex gap-0.5">{/* Bouton principal Télécharger */}
                <a
                    href={currentOption.downloadUrl}
                    className={`${colors.bg} ${colors.hoverBg} text-white px-3 py-3 font-medium cursor-pointer transition-all duration-200 flex items-center justify-center rounded-l-lg w-[140px] h-[45px]`}
                >
                    <span className="text-sm">Download</span>
                </a>                {/* Bouton avec flèche déroulante */}
                <div className="relative">                    <button
                        className={`${colors.bg} ${colors.hoverBg} text-white px-3 py-3 cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 rounded-r-lg w-[140px] h-[45px]`}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <span className="text-sm font-medium">
                            {currentOption.platform}
                        </span>
                        <svg 
                            className={`w-4 h-4 transition-all duration-300 ease-in-out ${isExpanded ? 'rotate-180 translate-y-0.5' : 'rotate-0'}`}
                            viewBox="0 0 24 24" 
                            fill="currentColor"
                        >
                            <path d="M7 10l5 5 5-5z"></path>
                        </svg>
                    </button>

                    {/* Menu déroulant */}
                    <div 
                        className={`absolute top-full right-0 mt-1 min-w-48 ${colors.containerBg} rounded-lg shadow-xl border ${colors.containerBorder} transition-all duration-200 z-50 ${
                            isExpanded ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                        }`}
                    >                        {downloadOptions.map((option, index) => (
                            <button
                                key={`${option.platform}-${option.format}`}
                                onClick={() => handlePlatformSelect(index)}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-200 ${colors.optionHover} ${colors.optionText} ${
                                    index === 0 ? 'rounded-t-lg' : ''
                                } ${
                                    index === downloadOptions.length - 1 ? 'rounded-b-lg' : ''
                                } ${
                                    selectedPlatform === index ? 'bg-gray-50 dark:bg-gray-700' : ''
                                }`}
                            >
                                <span className="text-lg">{option.icon}</span>
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {option.platform}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {option.format}
                                    </div>
                                </div>
                                {selectedPlatform === index && (
                                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DownloadButton;
