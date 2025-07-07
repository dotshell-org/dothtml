"use client";

import NavLink from "./NavLink";
import ProjectsNavLink from "./ProjectsNavLink";

const NavBar = () => {    const elements = [
        {href: "/home", text: "Home"},
        {href: "/projects", text: "Projects"},
        {href: "/contact", text: "Contact"}
    ];    return (
        <div className="w-full mt-16 mb-8 flex relative z-30">
            <div className="relative left-1/2 -translate-x-[calc(50%-10px)] flex items-center">
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