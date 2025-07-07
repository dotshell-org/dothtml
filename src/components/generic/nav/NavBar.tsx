"use client";

import NavLink from "./NavLink";
import ProjectsNavLink from "./ProjectsNavLink";

const NavBar = () => {    const elements = [
        {href: "/home", text: "Home"},
        {href: "/projects", text: "Projects"},
        {href: "/contact", text: "Contact"}
    ];    return (
        <div className="w-full mt-8 sm:mt-16 mb-4 sm:mb-8 flex relative z-30 px-2">
            <div className="mx-auto flex flex-row items-center gap-4 sm:gap-8">
                {
                    elements.map(element => {
                        if (element.text === "Projects") {
                            return (
                                <ProjectsNavLink key={element.href}>
                                    {element.text}
                                </ProjectsNavLink>
                            );
                        }
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