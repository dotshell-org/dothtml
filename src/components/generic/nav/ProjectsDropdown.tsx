import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SoftwareCardType } from "@/types/home/SoftwareCardType";

interface ProjectsDropdownProps {
    isVisible: boolean;
}

const ProjectsDropdown: React.FC<ProjectsDropdownProps> = ({ isVisible }) => {
    const projects: SoftwareCardType[] = [
        {imageSrc: "cafeteria-manager.svg", title: "Cafeteria Manager", description: "Companion to manage your cafeteria business"},
        {imageSrc: "ico.svg", title: "Ico", description: "Powerful space to manage accounting, stocks etc"},
    ];

    return (
        <div className={`absolute top-full right-0 sm:left-1/2 sm:-translate-x-1/2 mt-4 w-64 sm:w-72 md:w-80 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm z-50 projects-dropdown ${
            isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-900 border-l border-t border-gray-200 dark:border-gray-700 rotate-45 z-51"></div>
              <div className="p-3 sm:p-4 relative z-10">
                <div className="flex flex-col gap-2">                    
                    {projects.map((project) => (
                        <Link
                            key={project.title}
                            href={`/projects/${project.title.toLowerCase().replace(' ', '-')}`}
                            className="flex items-center p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 group hover:shadow-md w-full"
                        >
                            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors duration-300 mr-2 sm:mr-3">
                                <Image 
                                    src={`/softwares/${project.imageSrc}`} 
                                    alt={project.title}
                                    width={20}
                                    height={20}
                                    className="dark:invert sm:w-6 sm:h-6"
                                />
                            </div>
                            <div className="flex-1">
                                <h4 className={`text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 ${
                                    project.title === "Cafeteria Manager" ? "group-hover:text-blue-600 dark:group-hover:text-blue-400" : 
                                    project.title === "Ico" ? "group-hover:text-purple-600 dark:group-hover:text-purple-400" : 
                                    project.title === "Specto" ? "group-hover:text-red-600 dark:group-hover:text-red-400" : ""
                                } transition-colors duration-200 mb-1`}>
                                    {project.title}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectsDropdown;
