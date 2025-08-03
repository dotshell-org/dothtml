import { LineChart as MuiLineChart } from "@mui/x-charts";
import { useMemo, useState, useEffect } from "react";
// Import createTheme and ThemeProvider, useMediaQuery from '@mui/material'
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';

// This random data generation function remains unchanged.
const generateFakeSeriesData = () => [
    Array.from({ length: 12 }, () => Math.floor(Math.random() * 2000)), // Credit
    Array.from({ length: 12 }, () => Math.floor(Math.random() * 2000)), // Debit
];

// Your custom dark theme for charts
const darkTheme = createTheme({
    palette: {
        mode: 'dark', // Explicitly dark mode
        background: {
            default: '#101828',
            paper: '#1a202c',
        },
        text: {
            primary: '#E0E0E0', // Light text for dark backgrounds
            secondary: '#A0A0A0',
        },
    },
});

const LineChart = () => {
    // Determine if the user prefers dark mode
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    // Detect screen width for responsive height calculation and mobile interaction
    const isSmallScreen = useMediaQuery('(max-width: 640px)');
    const isMediumScreen = useMediaQuery('(max-width: 768px)');
    const isMobile = useMediaQuery('(max-width: 768px)');

    // Memoize the default light theme creation to avoid re-creating it on every render
    const lightTheme = useMemo(() => createTheme(), []); // <--- NEW: Create a default light theme

    // Generate random data on the client side only to avoid hydration mismatch
    const [seriesData, setSeriesData] = useState<number[][]>([[], []]);

    useEffect(() => {
        setSeriesData(generateFakeSeriesData());
    }, []);

    // useMemo is used to calculate the dates only once on the component mount.
    const chartData = useMemo(() => {
        const labels = [];
        const now = new Date();

        // Logic to generate the last 12 months
        for (let i = 11; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthName = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
            labels.push(monthName);
        }

        return {
            xAxisData: labels,
            seriesData: seriesData,
        };
    }, [seriesData]);

    // Choose the theme to apply: your custom darkTheme if preferred, otherwise the default lightTheme
    const currentTheme = prefersDarkMode ? darkTheme : lightTheme; // <--- CHANGED: Use lightTheme instead of null

    // Calculate responsive height - reduce height on small screens to maintain an aspect ratio
    const chartHeight = useMemo(() => {
        if (isSmallScreen) {
            return 250; // Reduced height for very small screens
        } else if (isMediumScreen) {
            return 300; // Slightly reduced height for medium screens
        }
        return 400; // Default height for larger screens
    }, [isSmallScreen, isMediumScreen]);

    return (
        <ThemeProvider theme={currentTheme}> {/* Always provide a valid theme object */}
            <div className="w-full max-w-full">
                <div className="min-w-[300px] h-68 md:h-88 lg:h-96 bg-white dark:bg-gray-900 rounded-2xl pr-4 sm:pl-2 sm:pr-6 md:pl-4 md:pr-8">
                <MuiLineChart
                    xAxis={[
                        {
                            data: chartData.xAxisData,
                            scaleType: "point",
                        },
                    ]}
                    series={[
                        { label: "Debit", data: chartData.seriesData[1], color: "#3b82f6" },
                        { label: "Credit", data: chartData.seriesData[0], color: "#ef4444" },
                    ]}
                    height={chartHeight}
                    disableAxisListener={isMobile}
                    sx={isMobile ? { pointerEvents: 'none' } : undefined}
                />
                </div>
            </div>
        </ThemeProvider>
    );
};

export default LineChart;