"use client";

import React, { useState, useEffect } from "react";

interface DownloadOption {
    platform: string;
    icon: string;
    format: string;
    downloadUrl?: string;
}

interface DownloadButtonProps {
    appName: string;
    colorScheme: "blue" | "purple" | "red";
    appType?: "electron" | "web";
}

// Configuration des repositories GitHub et versions pour chaque application
const appConfig = {
    "Ico": {
        repo: "dotshell-org/ico",
        version: "V1",
        releases: {
            windows: "Ico-V.1-Setup.exe",
            linux_deb: "Ico-V.1-Setup.deb",
            linux_appimage: "Ico-V.1-Setup.AppImage"
        }
    },
    "Specto": {
        repo: "dotshell-org/specto",
        version: "V1",
        releases: {
            zip: "Specto-V.1.zip",
            targz: "Specto-V.1.tar.gz"
        }
    },
    "Cafeteria Manager": {
        repo: "dotshell-org/cafeteria-manager",
        version: "v25.0.0",
        releases: {
            windows: "Cafeteria.Manager-25.0.0.exe",
            mac_silicon: "Cafeteria.Manager-25.0.0-Apple.Silicon.dmg",
            linux_deb: "Cafeteria.Manager-25.0.0.deb",
        }
    }
};

// Fonction pour générer l'URL de téléchargement GitHub
const generateGitHubDownloadUrl = (appName: string, platform: string): string => {
    const config = appConfig[appName as keyof typeof appConfig];
    if (!config) {
        return `/downloads/${appName.toLowerCase()}/${platform}`;
    }

    // Cas spécial pour Specto qui a zip/targz au lieu de windows/mac/linux
    if (appName === "Specto") {
        const releaseFile = config.releases[platform as keyof typeof config.releases];
        if (!releaseFile) {
            return `/downloads/${appName.toLowerCase()}/${platform}`;
        }
        return `https://github.com/${config.repo}/releases/download/${config.version}/${releaseFile}`;
    }

    const releaseFile = config.releases[platform as keyof typeof config.releases];
    if (!releaseFile) {
        return `/downloads/${appName.toLowerCase()}/${platform}`;
    }

    return `https://github.com/${config.repo}/releases/download/${config.version}/${releaseFile}`;
};

const DownloadButton: React.FC<DownloadButtonProps> = ({ appName, colorScheme, appType = "electron" }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    // Initialize with a default value (0) for both server and client to avoid hydration mismatch
    const [selectedPlatform, setSelectedPlatform] = useState(0);

    // Use useEffect to update the platform after initial render (client-side only)
    useEffect(() => {
        // Only run on the client side
        if (typeof window !== 'undefined') {
            // Detect OS and update the platform
            const detectClientOS = (): number => {
                const userAgent = window.navigator.userAgent.toLowerCase();

                // Cas spécial pour Specto : zip pour Windows, tar.gz pour autres
                if (appName === "Specto") {
                    return userAgent.includes('win') ? 0 : 1; // 0 = zip, 1 = tar.gz
                }

                // Cas spécial pour Ico : pas d'options macOS
                if (appName === "Ico") {
                    if (userAgent.includes('linux')) {
                        // Pour Linux, on essaie de détecter si c'est Ubuntu/Debian ou autre
                        if (userAgent.includes('ubuntu') || userAgent.includes('debian')) {
                            return 1; // Ubuntu/Debian (.deb)
                        } else {
                            return 2; // Autres Linux (.AppImage)
                        }
                    }
                    return 0; // Windows par défaut pour Ico
                }

                // Cas général pour les autres applications
                if (userAgent.includes('mac')) {
                    // Détection de Mac Apple Silicon vs Intel
                    if (userAgent.includes('arm') || userAgent.includes('arm64')) {
                        return 1; // Mac Apple Silicon
                    } else {
                        return 2; // Mac Intel (par défaut pour les autres Mac)
                    }
                }

                // Pour Cafeteria Manager: Linux doit proposer l'option .deb (index 2)
                if (appName === "Cafeteria Manager" && userAgent.includes('linux')) {
                    return 2; // Ubuntu/Debian (.deb)
                }

                if (userAgent.includes('linux')) return 3; // Linux
                return 0; // Windows par défaut
            };

            setSelectedPlatform(detectClientOS());
        }
    }, [appName]);    // Fonction pour gérer le téléchargement
    const handleDownload = async (downloadUrl: string) => {
        if (!downloadUrl) {
            console.error('URL de téléchargement non disponible');
            return;
        }

        setIsDownloading(true);
        try {
            // Vérifier si l'URL est une URL GitHub Release
            if (downloadUrl.includes('github.com') && downloadUrl.includes('/releases/download/')) {
                // Ouvrir directement le lien GitHub
                window.open(downloadUrl, '_blank');
            } else {
                // Pour les autres URLs, utiliser la méthode de téléchargement classique
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = '';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (error) {
            console.error('Erreur lors du téléchargement:', error);
            // En cas d'erreur, essayer d'ouvrir le lien dans un nouvel onglet
            window.open(downloadUrl, '_blank');
        } finally {
            setIsDownloading(false);
        }
    };    // Options de téléchargement selon le type d'application
    const downloadOptions: DownloadOption[] = appType === "web" && appName !== "Specto"
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
        : appName === "Specto"
        ? [
            {
                platform: "Windows",
                icon: "📦",
                format: ".zip",
                downloadUrl: generateGitHubDownloadUrl(appName, "zip")
            },
            {
                platform: "Universal",
                icon: "🗜️",
                format: ".tar.gz",
                downloadUrl: generateGitHubDownloadUrl(appName, "targz")
            }
        ]
        : appName === "Ico"
        ? [
            {
                platform: "Windows",
                icon: "🪟",
                format: ".exe",
                downloadUrl: generateGitHubDownloadUrl(appName, "windows")
            },
            {
                platform: "Ubuntu/Debian",
                icon: "🐧",
                format: ".deb",
                downloadUrl: generateGitHubDownloadUrl(appName, "linux_deb")
            },
            {
                platform: "Linux",
                icon: "🐧",
                format: ".AppImage",
                downloadUrl: generateGitHubDownloadUrl(appName, "linux_appimage")
            }
        ]
        : appName === "Cafeteria Manager"
                    ? [
            {
                platform: "Windows",
                icon: "🪟",
                format: ".exe",
                downloadUrl: generateGitHubDownloadUrl(appName, "windows")
            },
            {
                platform: "MacOS Apple Silicon",
                icon: "🍎",
                format: ".dmg",
                downloadUrl: generateGitHubDownloadUrl(appName, "mac_silicon")
            },
            {
                platform: "Ubuntu/Debian",
                icon: "🐧",
                format: ".deb",
                downloadUrl: generateGitHubDownloadUrl(appName, "linux_deb")
            }
        ] : [];
        const colorClasses = {
        blue: {
            bg: "bg-blue-600",
            hoverBg: "hover:bg-blue-700",
            bgSecondary: "bg-blue-600",
            hoverBgSecondary: "hover:bg-blue-700",
            containerBg: "bg-white dark:bg-gray-800",
            containerBorder: "border-blue-200 dark:border-transparent",
            optionHover: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
            optionText: "hover:text-blue-600 dark:hover:text-blue-400"
        },
        purple: {
            bg: "bg-purple-600",
            hoverBg: "hover:bg-purple-700",
            bgSecondary: "bg-purple-600",
            hoverBgSecondary: "hover:bg-purple-700",
            containerBg: "bg-white dark:bg-gray-800",
            containerBorder: "border-purple-200 dark:border-transparent",
            optionHover: "hover:bg-purple-50 dark:hover:bg-purple-900/20",
            optionText: "hover:text-purple-600 dark:hover:text-purple-400"
        },
        red: {
            bg: "bg-red-600",
            hoverBg: "hover:bg-red-700",
            bgSecondary: "bg-red-600",
            hoverBgSecondary: "hover:bg-red-700",
            containerBg: "bg-white dark:bg-gray-800",
            containerBorder: "border-red-200 dark:border-transparent",
            optionHover: "hover:bg-red-50 dark:hover:bg-red-900/20",
            optionText: "hover:text-red-600 dark:hover:text-red-400"
        }
    };const colors = colorClasses[colorScheme];
    const currentOption = downloadOptions[selectedPlatform];

    const handlePlatformSelect = (index: number): void => {
        setSelectedPlatform(index);
        setIsExpanded(false);
    };return (
        <div className="relative inline-block z-[60]">
            <div className="flex gap-0.5 scale-80 sm:scale-100">                {/* Bouton principal Télécharger */}
                <button
                    onClick={() => handleDownload(currentOption?.downloadUrl || '')}
                    disabled={isDownloading}
                    className={`${colors.bg} ${colors.hoverBg} text-white px-3 py-3 font-medium cursor-pointer transition-all duration-200 flex items-center justify-center rounded-l-full w-[8rem] h-[45px] disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {isDownloading ? (
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <span className="text-sm">Download</span>
                    )}
                </button>{/* Bouton avec flèche déroulante */}
                <div className="relative">                    <button
                        className={`${colors.bg} ${colors.hoverBg} text-white px-3 py-3 cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 rounded-r-full w-[16rem] h-[45px]`}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <span className="text-sm font-medium">
                            {currentOption?.format || ''} {currentOption?.platform ? `(${currentOption.platform})` : ''}
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
                        className={`absolute top-full right-0 mt-1 ${colors.containerBg} rounded-lg shadow-xl border ${colors.containerBorder} transition-all duration-200 z-50 ${
                            isExpanded ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                        }`}
                    >
                        {downloadOptions.map((option, index) => (
                            <button
                                key={`${option.platform}-${option.format}`}
                                onClick={() => handlePlatformSelect(index)}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-200 cursor-pointer outline-0 ${colors.optionHover} ${colors.optionText} ${
                                    index === 0 ? 'rounded-t-lg' : ''
                                } ${
                                    index === downloadOptions.length - 1 ? 'rounded-b-lg' : ''
                                } ${
                                    selectedPlatform === index ? 'bg-white dark:bg-gray-700' : ''
                                }`}
                            >
                                <span className="text-lg">{option?.icon || ''}</span>
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-black dark:text-white">
                                        {option?.format || ''}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {option?.platform || ''}
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
