"use client";

import NavLink from "./NavLink";
import { useI18n } from "@/i18n/useI18n";

const NavBar = () => {
    const { t } = useI18n();
    return (
        <div className="w-full mt-16 mb-4 sm:mb-8 flex relative z-30 px-2">
            <div className="mx-auto flex flex-row items-center gap-12 sm:gap-24">
                <NavLink href="/home" key="/home">
                    {t("nav.home")}
                </NavLink>
                <a
                    href="/documentation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-block text-center text-base md:text-lg lg:text-xl font-light group"
                >
                    <span>{t("nav.documentation")}</span>
                    <span
                        className="absolute left-0 bottom-0 h-0.5 w-0 bg-current transition-all duration-300 group-hover:w-full"
                    ></span>
                </a>
                <NavLink href="/archives" key="/archives">
                    {t("nav.archives")}
                </NavLink>
                <NavLink href="/contact" key="/contact">
                    {t("nav.contact")}
                </NavLink>
            </div>
        </div>
    )
}

export default NavBar;
