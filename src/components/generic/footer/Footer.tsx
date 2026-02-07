"use client";

import SemiBold from "@/components/generic/SemiBold";
import { useState, useEffect } from "react";
import { FaGithub, FaInstagram, FaYoutube, FaXTwitter, FaThreads } from "react-icons/fa6";
import { useI18n } from "@/i18n/useI18n";

const Footer = () => {
    const { t } = useI18n();
    const [currentYear, setCurrentYear] = useState(2025); // Default year to prevent hydration mismatch

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="w-full text-center text-base sm:text-lg md:text-xl font-light py-10 sm:py-20 bg-neutral-100 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400 px-4">
            <p className="mb-4">
                {t("footer.madeBy")} <SemiBold>Dotshell</SemiBold> 🇪🇺 {t("footer.europe")}
            </p>
            <div className="flex justify-center gap-4 mb-4 text-2xl">
                <a href="https://github.com/dotshell-org" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <FaGithub className="hover:text-black dark:hover:text-white transition-colors" />
                </a>
                <a href="https://www.instagram.com/dotshell.eu/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FaInstagram className="hover:text-pink-500 transition-colors" />
                </a>
                <a href="https://www.youtube.com/@dotshell-eu" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <FaYoutube className="hover:text-red-600 transition-colors" />
                </a>
                <a href="https://x.com/dotshelleu" target="_blank" rel="noopener noreferrer" aria-label="X">
                    <FaXTwitter className="hover:text-black transition-colors" />
                </a>
                <a href="https://www.threads.com/@dotshell.eu" target="_blank" rel="noopener noreferrer" aria-label="Threads">
                    <FaThreads className="hover:text-black transition-colors" />
                </a>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 mt-4">
                © {currentYear} Dotshell — {t("footer.license")}
            </p>
        </footer>
    );
};

export default Footer;
