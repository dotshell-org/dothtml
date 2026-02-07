"use client";

import NavLink from "./NavLink";
import { useI18n } from "@/i18n/useI18n";

const NavBar = () => {
    const { t } = useI18n();
    const elements = [
        {href: "/home", text: t("nav.home")},
        {href: "/documentation", text: t("nav.documentation")},
        {href: "/archives", text: t("nav.archives")},
        {href: "/contact", text: t("nav.contact")}
    ];
    return (
        <div className="w-full mt-16 mb-4 sm:mb-8 flex relative z-30 px-2">
            <div className="mx-auto flex flex-row items-center gap-12 sm:gap-24">
                {
                    elements.map(element => {
                        return (
                            <NavLink href={element.href} key={element.href}>
                                {element.text}
                            </NavLink>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default NavBar;
