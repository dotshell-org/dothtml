"use client";

import React, { useState, useRef } from "react";
import ProjectsDropdown from "./ProjectsDropdown";

interface ProjectsNavLinkProps {
    children: React.ReactNode;
}

const ProjectsNavLink: React.FC<ProjectsNavLinkProps> = ({ children }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        setIsDropdownVisible(true);
    };

    const handleMouseLeave = (event: React.MouseEvent) => {
        // Vérifier si la souris va vers le dropdown
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const { clientX, clientY } = event;
        
        // Zone étendue incluant le dropdown
        const extendedRect = {
            left: rect.left - 20,
            right: rect.right + 20,
            top: rect.top,
            bottom: rect.bottom + 420 // Hauteur approximative du dropdown + marge
        };        // Si la souris va vers le dropdown, on garde le menu ouvert temporairement
        if (
            clientX >= extendedRect.left &&
            clientX <= extendedRect.right &&
            clientY >= extendedRect.top &&
            clientY <= extendedRect.bottom
        ) {
            // Délai réduit pour permettre d'atteindre le dropdown
            hoverTimeoutRef.current = setTimeout(() => {
                setIsDropdownVisible(false);
            }, 150);
        } else {
            // Fermeture immédiate si on sort complètement de la zone
            setIsDropdownVisible(false);
        }
    };

    const handleDropdownMouseEnter = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        setIsDropdownVisible(true);
    };

    const handleDropdownMouseLeave = () => {
        setIsDropdownVisible(false);
    };

    return (
        <div 
            ref={containerRef}
            className="relative z-40"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <a
                className="relative inline-block text-center text-base sm:text-lg font-light group"
            >
                <span className="">{children}</span>
                <span
                    className={`absolute left-0 bottom-[-2px] sm:bottom-0 h-0.5 bg-black dark:bg-white transition-all duration-300 ${
                        isDropdownVisible ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                ></span>
            </a>
            <div
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
            >
                <ProjectsDropdown isVisible={isDropdownVisible} />
            </div>
        </div>
    );
};

export default ProjectsNavLink;
