import React from "react";
import Image from "next/image";
import { SoftwareCardType } from "@/types/home/SoftwareCardType";

interface ProjectsDropdownProps {
    isVisible: boolean;
}

const ProjectsDropdown: React.FC<ProjectsDropdownProps> = ({ isVisible }) => {
    const projects: SoftwareCardType[] = [
        {imageSrc: "cafeteria-manager.svg", title: "Cafeteria Manager", description: "Your companion to manage your cafeteria business"},
        {imageSrc: "ico.svg", title: "Ico", description: "Your powerful space to manage accounting, stocks and sales"},
        {imageSrc: "specto.svg", title: "Specto", description: "Your centralized server for your logging and monitoring needs"},    ];    return (
        <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[800px] bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm z-50 ${
            isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}>
            {/* Petite flèche pointant vers le haut */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-900 border-l border-t border-gray-200 dark:border-gray-700 rotate-45 z-51"></div>
            
            <div className="p-6 relative z-10">
                <h3 className="text-lg font-semibold text-center mb-4 text-gray-800 dark:text-gray-200">
                    Nos Projets
                </h3>
                <div className="flex gap-4 justify-center">
                    {projects.map((project) => (
                        <a
                            key={project.title}
                            href={`/${project.title.toLowerCase().replace(' ', '-')}`}
                            className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 group hover:shadow-sm w-56"
                        >
                            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors duration-200 group-hover:scale-105 mb-3">
                                <Image 
                                    src={`/softwares/${project.imageSrc}`} 
                                    alt={project.title}
                                    width={28}
                                    height={28}
                                    className="dark:invert"
                                />
                            </div>
                            <div className="text-center">
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 mb-1">
                                    {project.title}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                        </a>
                    ))}                </div>
                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <a
                        href="/projects"
                        className="block text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                        Voir tous les projets →
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProjectsDropdown;
