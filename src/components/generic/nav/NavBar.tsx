"use client";

import NavLink from "./NavLink";

const NavBar = () => {
    const elements = [
        {href: "/home", text: "Home"},
        {href: "/documentation", text: "Documentation"},
        {href: "/archives", text: "Archives"},
        {href: "/contact", text: "Contact"}
    ];    return (
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