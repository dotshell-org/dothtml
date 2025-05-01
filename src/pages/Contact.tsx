import NavBar from "@/components/home/nav/NavBar";
import SemiBold from "@/components/style/SemiBold";
import React from "react";

interface ContactFieldProps {
    name: string;
    type: string;
    placeholder?: string;
}
const ContactField: React.FC<ContactFieldProps> = ({ name, type, placeholder }) => {
    return (
        <div>
            <p className="text-center text-xl font-light">{name}</p>
            <input className="relative left-1/2 -translate-x-1/2 text-light w-80 pl-2 py-1 mt-2 mb-5.5 rounded-lg border border-gray-300 dark:border-gray-700" type={type} placeholder={placeholder} />
        </div>
    )
}

const Contact = () => {
    return (
        <div className="h-screen relative">
            <NavBar />
            <h1 className="my-20 text-center text-7xl font-black">
                Contact <span className="text-blue-500">Us</span>
            </h1>

            <ContactField name="Name" type="text" />
            <ContactField name="Email" type="text" placeholder="email@example.com" />
            <ContactField name="Country/Region" type="text"/>
            <ContactField name="Phone number (optional)" type="text"/>
            <ContactField name="Company (optional)" type="text"/>
            <p className="text-center text-xl font-light">Message</p>
            <textarea
                className="relative left-1/2 -translate-x-1/2 text-light w-80 min-h-50 px-2 py-1 mt-2 mb-5.5 rounded-lg border border-gray-300 dark:border-gray-700 resize-none overflow-y-auto">
            </textarea>
            <p/>

            <button className="relative left-1/2 -translate-x-1/2 rounded-lg bg-blue-500 hover:bg-blue-400 text-white text-center mt-7 mb-10 p-2 w-80 cursor-pointer transition-all">Submit</button>

            <footer className="w-full text-center text-xl font-light mt-20 py-20 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                <p className="mb-4">
                    Made with 🥐 by <SemiBold>Dotshell</SemiBold>, France • Open Source &amp; Privacy First
                </p>
                <p className="mb-2">
                    Follow us on
                    <a href="https://github.com/dotshell-org" className="text-blue-500 hover:underline mx-1" target="_blank" rel="noopener noreferrer">GitHub</a>
                </p>
                <p className="text-sm text-neutral-400 mt-4">
                    © {new Date().getFullYear()} Dotshell. All rights reserved.
                </p>
            </footer>
        </div>
    )
}

export default Contact