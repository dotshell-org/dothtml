import NavLink from "./NavLink";

const NavBar = () => {
    const elements = [
        {href: "/home", text: "Home"},
        {href: "/projects", text: "Projects"},
        {href: "/contact", text: "Contact"}
    ]

    return (
        <div className="w-full mt-16 mb-8 flex">
            <div className="relative left-1/2 -translate-x-[calc(50%-10px)]">
                {
                    elements.map(element =>
                        <NavLink href={element.href} key={element.href}>
                            {element.text}
                        </NavLink>
                    )
                }
            </div>
        </div>
    )
}

export default NavBar;