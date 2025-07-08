"use client";

import SemiBold from "@/components/generic/SemiBold";
import { useState, useEffect } from "react";

const Footer = () => {
    const [currentYear, setCurrentYear] = useState(2025); // Default year to prevent hydration mismatch

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="w-full text-center text-base sm:text-lg md:text-xl font-light py-10 sm:py-20 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 px-4">
            <p className="mb-4">
                Made with 🥐 by <SemiBold>Dotshell</SemiBold>, France • Open Source &amp; Privacy First
            </p>
            <p className="mb-2">
                Follow us on
                <a href="https://github.com/dotshell-org" className="text-blue-500 hover:underline mx-1" target="_blank" rel="noopener noreferrer">GitHub</a>
            </p>
            <p className="text-xs sm:text-sm text-neutral-400 mt-4">
                © {currentYear} Dotshell. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
