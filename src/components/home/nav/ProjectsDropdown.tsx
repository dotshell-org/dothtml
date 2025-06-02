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
        {imageSrc: "specto.svg", title: "Specto", description: "Your centralized server for your logging and monitoring needs"},    ];

    return (
        <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-96 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm z-50 ${
            isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}>
            {/* Petite flèche pointant vers le haut */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-900 border-l border-t border-gray-200 dark:border-gray-700 rotate-45 z-51"></div>
            
            <div className="p-6 relative z-10">
                <h3 className="text-lg font-semibold text-center mb-5 text-gray-800 dark:text-gray-200">
                    Nos Projets
                </h3>                <div className="space-y-1">
                    {projects.map((project) => (
                        <a
                            key={project.title}
                            href={`/${project.title.toLowerCase().replace(' ', '-')}`}
                            className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 group hover:shadow-sm"
                        >
                            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors duration-200 group-hover:scale-105">                                <Image 
                                    src={`/softwares/${project.imageSrc}`} 
                                    alt={project.title}
                                    width={24}
                                    height={24}
                                    className="dark:invert"
                                />
                            </div>
                            <div className="ml-3 flex-1">
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                    {project.title}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
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
