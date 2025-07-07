import React from "react";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
    return (
        <a
            href={href}
            className="relative inline-block text-center text-base sm:text-lg font-light mx-4 sm:mx-8 group"
        >
            <span className="">{children}</span>
            <span
                className="absolute left-0 bottom-1 h-0.5 w-0 bg-black dark:bg-white transition-all duration-300 group-hover:w-full"
            ></span>
        </a>
    )
}

export default NavLink;