import { PieChart as MuiPieChart, useDrawingArea } from "@mui/x-charts";
import { useMemo, useState, useEffect } from "react";
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import { styled } from "@mui/material/styles";
import SemiBold from "@/components/generic/SemiBold";

// Génère des valeurs aléatoires pour chaque catégorie et trie par ordre croissant
const generateFakePieData = () => {
    const data = [
        { label: "Category A", value: Math.floor(Math.random() * 2000) + 100 },
        { label: "Category B", value: Math.floor(Math.random() * 2000) + 100 },
        { label: "Category C", value: Math.floor(Math.random() * 2000) + 100 },
        { label: "Category D", value: Math.floor(Math.random() * 2000) + 100 },
        { label: "Category E", value: Math.floor(Math.random() * 2000) + 100 },
    ];
    return data.sort((a, b) => b.value - a.value);
};

// Custom dark theme for charts
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#101828',
            paper: '#1a202c',
        },
        text: {
            primary: '#E0E0E0',
            secondary: '#A0A0A0',
        },
    },
});

// Format number function
function formatNumber(n: number): string {
    if (n >= 1e12) {
        return `${(n / 1e12).toFixed(1)}T`;
    } else if (n >= 1e9) {
        return `${(n / 1e9).toFixed(1)}B`;
    } else if (n >= 1e6) {
        return `${(n / 1e6).toFixed(1)}M`;
    } else if (n >= 1e3) {
        return `${(n / 1e3).toFixed(1)}k`;
    } else {
        return `${n.toFixed(1)}`;
    }
}

const StyledText = styled("text")(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: "middle",
    dominantBaseline: "central",
    fontSize: 48,
    '@media (min-width: 640px)': {
        fontSize: 64,
    },
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
    const { width, height, left, top } = useDrawingArea();
    return (
        <StyledText x={left + width / 2} y={top + height / 2}>
            {children}
        </StyledText>
    );
}

const PieCharts = () => {
    // Determine if the user prefers dark mode
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    
    // Detect mobile for disabling interactions
    const isMobile = useMediaQuery('(max-width: 768px)');

    // Memoize the default light theme creation
    const lightTheme = useMemo(() => createTheme(), []);

    // Génère les données aléatoires uniquement côté client pour éviter l'hydration mismatch
    const [chartData, setChartData] = useState<{ label: string; value: number }[]>([]);
    useEffect(() => {
        setChartData(generateFakePieData());
    }, []);

    // Red color palette for the pie chart
    const redColors = [
        "#ff7f7f", "#ff6b6b", "#ff5757", "#ff4343", "#ff2f2f",
        "#ff1b1b", "#ff0707", "#e50000", "#cc0000", "#b20000"
    ];

    // Calculate total value for center label
    const totalValue = chartData.reduce((acc, item) => acc + item.value, 0);

    // Pie chart series configuration
    const series = [
        {
            innerRadius: 110, // plus fin
            cornerRadius: 10,
            paddingAngle: 1,
            data: chartData,
        },
    ];

    // Choose the theme to apply
    const currentTheme = prefersDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={currentTheme}>
            <div className="w-full grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 mb-[8rem] sm:mb-0">
                <div className="w-full h-72 sm:h-96 bg-white dark:bg-gray-900 rounded-2xl p-2 sm:p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center">
                    <h3 className="text-center text-base sm:text-lg font-light sm:mb-4 mt-40 sm:mt-0">📈 <SemiBold>Credit</SemiBold></h3>
                    <MuiPieChart
                        series={series}
                        height={400}
                        colors={redColors}
                        sx={{ 
                            '& .MuiChartsLegend-root': { display: 'none' },
                            ...(isMobile && { pointerEvents: 'none' }),
                            innerRadius: 500
                        }}
                    >
                        <PieCenterLabel>€{formatNumber(totalValue)}</PieCenterLabel>
                    </MuiPieChart>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default PieCharts;