// tailwind.config.js
module.exports = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontSize: {
                'xxs': '0.62rem', // custom value, smaller than text-xs
            },
        },
    },
    plugins: [],
};
