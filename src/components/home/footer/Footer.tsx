import SemiBold from "@/components/style/SemiBold";

const Footer = () => {
    return (
        <footer className="w-full text-center text-xl font-light py-20 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
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
    );
};

export default Footer;
