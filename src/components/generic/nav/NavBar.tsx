"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";
import { useI18n } from "@/i18n/useI18n";

const NavBar = () => {
    const { t } = useI18n();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Determine current page name, defaults to empty or app name
    let currentPageName = "";
    if (pathname?.includes("/home")) currentPageName = t("nav.home");
    else if (pathname?.includes("/archives")) currentPageName = t("nav.archives");
    else if (pathname?.includes("/contact")) currentPageName = t("nav.contact");

    return (
        <div className="w-full relative z-50">
            {/* MOBILE NAVBAR */}
            <div className="md:hidden flex items-center justify-between px-6 py-6 w-full">
                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="z-[60] p-2 -ml-2 focus:outline-none"
                    aria-label="Toggle menu"
                >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
                <div className="text-xl font-light tracking-widest uppercase">
                    {currentPageName}
                </div>
                <div className="w-7"></div> {/* Placeholder for flex-between balance */}
            </div>

            {/* MOBILE FULLSCREEN MENU */}
            <div className={`
                md:hidden fixed inset-0 bg-neutral-900 text-white flex flex-col items-center justify-center gap-10 transition-opacity duration-300 z-[55]
                ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            `}>
                <div onClick={() => setIsOpen(false)}>
                    <a href="/home" className="relative inline-block text-center text-3xl font-light group">
                        <span>{t("nav.home")}</span>
                    </a>
                </div>
                <div onClick={() => setIsOpen(false)}>
                    <a
                        href="/documentation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative inline-block text-center text-3xl font-light group"
                    >
                        <span>{t("nav.documentation")}</span>
                    </a>
                </div>
                <div onClick={() => setIsOpen(false)}>
                    <a href="/archives" className="relative inline-block text-center text-3xl font-light group">
                        <span>{t("nav.archives")}</span>
                    </a>
                </div>
                <div onClick={() => setIsOpen(false)}>
                    <a href="/contact" className="relative inline-block text-center text-3xl font-light group">
                        <span>{t("nav.contact")}</span>
                    </a>
                </div>
            </div>

            {/* DESKTOP NAVBAR */}
            <div className="hidden md:flex w-full mt-16 mb-8 relative z-30 px-4">
                <div className="mx-auto flex flex-row justify-center items-center gap-12 lg:gap-24">
                    <NavLink href="/home">
                        {t("nav.home")}
                    </NavLink>
                    <a
                        href="/documentation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative inline-block text-center md:text-lg lg:text-xl font-light group"
                    >
                        <span>{t("nav.documentation")}</span>
                        <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <NavLink href="/archives">
                        {t("nav.archives")}
                    </NavLink>
                    <NavLink href="/contact">
                        {t("nav.contact")}
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
