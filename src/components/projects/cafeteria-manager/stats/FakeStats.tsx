"use client";

import {motion, Easing} from "framer-motion";
import React, {useEffect, useState} from "react";
import {LineChart, PieChart} from "@mui/x-charts";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import dayjs from "dayjs";

// Fake enum for TimeFrame
enum TimeFrame {
    DAY = 'day',
    WEEK = 'week',
    MONTH = 'month',
    YEAR = 'year'
}

// Fake translation function
const t = (key: string) => {
    const translations: Record<string, string> = {
        'stats': 'Statistics',
        'evolution': 'Evolution',
        'products': 'Products',
        'revenue': 'Revenue',
        'orderCount': 'Order Count',
        'selectCurveType': 'Select Curve Type',
        'timeframe': 'Time Frame',
        'day': 'Day',
        'week': 'Week',
        'month': 'Month',
        'year': 'Year',
        'startDate': 'Start Date',
        'endDate': 'End Date',
        'noData': 'No data available'
    };
    return translations[key] || key;
};

interface ChartDataPoint {
    x: string | number;
    y: number;
}

interface PieChartDataPoint {
    id: number;
    value: number;
    label: string;
}

const FakeStats: React.FC = () => {
    const [selectedCurve, setSelectedCurve] = useState<'revenue' | 'orders'>('revenue');
    const [timeframe, setTimeframe] = useState<TimeFrame>(TimeFrame.WEEK);
    const today = dayjs().format('YYYY-MM-DD');
    const [startDate, setStartDate] = useState<string>(today);
    const [endDate, setEndDate] = useState<string>(today);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const [lineChartData, setLineChartData] = useState<ChartDataPoint[]>([]);
    const [pieChartData, setPieChartData] = useState<PieChartDataPoint[]>([]);

    // Check for dark mode
    useEffect(() => {
        const checkDarkMode = () => {
            const isDark = document.documentElement.classList.contains('dark') || 
                          window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(isDark);
        };
        
        checkDarkMode();
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addListener(checkDarkMode);
        
        // Also check for manual theme changes
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        return () => {
            mediaQuery.removeListener(checkDarkMode);
            observer.disconnect();
        };
    }, []);

    // Animation variants for both entering and exiting
    const variants = {
        enter: {
            opacity: 1,
            y: 0,
            transition: {duration: 0.4, ease: "easeOut" as Easing, delay: 0.3}
        },
        exit: {
            opacity: 0,
            y: 40,
            transition: {duration: 0.3, ease: "easeIn" as Easing}
        }
    };

    const rainbowColors = [
        "#7ec8ff", "#5abeff", "#36a3ff", "#1288ff", "#006dea",
        "#005bb5", "#004a9f", "#003a88", "#002971", "#00185a"
    ];

    // Fake data generation
    const generateFakeLineData = (type: 'revenue' | 'orders', timeframe: TimeFrame) => {
        const dataPoints: ChartDataPoint[] = [];
        const baseValue = type === 'revenue' ? 300 : 25;
        const variation = type === 'revenue' ? 100 : 10;
        const now = dayjs();
        
        switch (timeframe) {
            case TimeFrame.DAY:
                // Last 24 hours
                for (let i = 23; i >= 0; i--) {
                    const hour = now.subtract(i, 'hour');
                    const randomValue = Math.random() * variation;
                    const trendValue = ((23 - i) / 24) * baseValue * 0.3;
                    
                    dataPoints.push({
                        x: hour.format('HH:00'),
                        y: Math.round(baseValue + randomValue + trendValue)
                    });
                }
                break;
                
            case TimeFrame.WEEK:
                // Last 7 days
                for (let i = 6; i >= 0; i--) {
                    const day = now.subtract(i, 'day');
                    const randomValue = Math.random() * variation;
                    const trendValue = ((6 - i) / 7) * baseValue * 0.4;
                    
                    dataPoints.push({
                        x: day.format('ddd DD'),
                        y: Math.round(baseValue + randomValue + trendValue)
                    });
                }
                break;
                
            case TimeFrame.MONTH:
                // Last 4 weeks
                for (let i = 3; i >= 0; i--) {
                    const weekStart = now.subtract(i, 'week').startOf('week');
                    const weekEnd = now.subtract(i, 'week').endOf('week');
                    const randomValue = Math.random() * variation;
                    const trendValue = ((3 - i) / 4) * baseValue * 0.5;
                    
                    dataPoints.push({
                        x: `${weekStart.format('DD-MM')} - ${weekEnd.format('DD-MM')}`,
                        y: Math.round(baseValue + randomValue + trendValue)
                    });
                }
                break;
                
            case TimeFrame.YEAR:
                // Last 12 months
                for (let i = 11; i >= 0; i--) {
                    const month = now.subtract(i, 'month');
                    const randomValue = Math.random() * variation;
                    const trendValue = ((11 - i) / 12) * baseValue * 0.6;
                    
                    dataPoints.push({
                        x: month.format('MMM YYYY'),
                        y: Math.round(baseValue + randomValue + trendValue)
                    });
                }
                break;
        }
        
        return dataPoints;
    };    const generateFakePieData = (): PieChartDataPoint[] => {
        return [
            { id: 1, value: 35, label: 'Coffee' },
            { id: 2, value: 28, label: 'Sandwiches' },
            { id: 3, value: 22, label: 'Pastries' },
            { id: 4, value: 15, label: 'Beverages' }
        ];
    };

    // Chart theme configuration
    const chartTheme = {
        textColor: isDarkMode ? '#ffffff' : '#000000',
        gridColor: isDarkMode ? '#374151' : '#e5e7eb',
        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff'
    };

    // Simulate loading and data fetching
    useEffect(() => {
        const fakeData = generateFakeLineData(selectedCurve, timeframe);
        setLineChartData(fakeData);
    }, [timeframe, selectedCurve]);

    // Fetch pie chart data (product sales)
    useEffect(() => {
        const fakeData = generateFakePieData();
        setPieChartData(fakeData);
    }, [startDate, endDate]);    // Apply theme to chart legends after render
    useEffect(() => {
        const applyLegendStyles = () => {
            // Apply to PieChart legends
            const pieChartTexts = document.querySelectorAll('.pie-chart-container text');
            pieChartTexts.forEach((text) => {
                (text as SVGElement).style.fill = chartTheme.textColor;
            });
            
            // Apply to LineChart legends
            const lineChartTexts = document.querySelectorAll('.line-chart-container text');
            lineChartTexts.forEach((text) => {
                (text as SVGElement).style.fill = chartTheme.textColor;
            });
        };
        
        // Apply styles after component mounts and when theme changes
        const timer = setTimeout(applyLegendStyles, 100);
        return () => clearTimeout(timer);
    }, [chartTheme.textColor, pieChartData, lineChartData]);

    return (
        <>
            <div className="h-full flex flex-col">
                <motion.div
                    className="h-full flex flex-col p-8 pb-0 overflow-y-hidden"
                    initial={{opacity: 0, y: 40}}
                    animate="enter"
                    exit="exit"
                    variants={variants}
                >                    <h1 className="text-3xl font-bold mt-4 text-black dark:text-white">📊 {t("stats")}</h1>

                    <h2 className="text-2xl font-bold mt-10 text-black dark:text-white">📈 {t("evolution")}</h2>                    <div
                        className="w-full p-4 mt-4 border border-gray-200 dark:border-gray-600 rounded-lg min-h-[25rem] line-chart-container">
                        {lineChartData.length === 0 ? (
                            <div className="flex justify-center items-center h-[300px] text-gray-500 dark:text-gray-400">
                                {t("noData")}
                            </div>
                        ) : (
                            <LineChart                                
                                xAxis={[{
                                    data: lineChartData.map(point => point.x),
                                    scaleType: 'point',
                                    tickLabelStyle: {
                                        fill: chartTheme.textColor,
                                        fontSize: 12
                                    },
                                    labelStyle: {
                                        fill: chartTheme.textColor
                                    }
                                }]}
                                yAxis={[{
                                    tickLabelStyle: {
                                        fill: chartTheme.textColor,
                                        fontSize: 12
                                    },
                                    labelStyle: {
                                        fill: chartTheme.textColor
                                    }
                                }]}
                                margin={{ left: 0 }}
                                series={[
                                    {
                                        data: lineChartData.map(point => point.y),
                                        label: selectedCurve === 'revenue' ? t("revenue") + " (€)" : t("orderCount"),
                                        color: '#006dea'
                                    },
                                ]}
                                height={300}
                                sx={{
                                    '& .MuiChartsAxis-tickLabel': {
                                        fill: `${chartTheme.textColor} !important`
                                    },
                                    '& .MuiChartsAxis-line': {
                                        stroke: `${chartTheme.textColor} !important`
                                    },
                                    '& .MuiChartsAxis-tick': {
                                        stroke: `${chartTheme.textColor} !important`
                                    },                                    '& .MuiLineElement-root': {
                                        '& circle': {
                                            fill: `${isDarkMode ? '#1f2937' : '#ffffff'} !important`,
                                            stroke: '#006dea !important'
                                        }
                                    },
                                    '& .MuiMarkElement-root': {
                                        fill: `${isDarkMode ? '#1f2937' : '#ffffff'} !important`,
                                        stroke: '#006dea !important'
                                    },
                                    '& .MuiChartsLegend-label': {
                                        fill: `${chartTheme.textColor} !important`,
                                        color: `${chartTheme.textColor} !important`
                                    },
                                    '& .MuiChartsLegend-root': {
                                        '& text': {
                                            fill: `${chartTheme.textColor} !important`,
                                            color: `${chartTheme.textColor} !important`
                                        }
                                    },
                                    '& text': {
                                        fill: `${chartTheme.textColor} !important`,
                                        color: `${chartTheme.textColor} !important`
                                    },
                                    '& .MuiChartsLegend-series text': {
                                        fill: `${chartTheme.textColor} !important`,
                                        color: `${chartTheme.textColor} !important`
                                    }
                                }}
                            />
                        )}
                        <div className="flex gap-4 mb-4 w-full">
                            <FormControl className="flex-1" sx={{ 
                                '& .MuiInputLabel-root': { color: 'inherit' },                                '& .MuiOutlinedInput-root': { 
                                    color: 'inherit',
                                    '& fieldset': {
                                        borderColor: isDarkMode ? '#4b5563' : 'rgba(0, 0, 0, 0.23)'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: isDarkMode ? '#9ca3af' : 'rgba(0, 0, 0, 0.87)'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: isDarkMode ? '#ffffff' : '#1976d2'
                                    }
                                },
                                '& .MuiSelect-icon': {
                                    color: isDarkMode ? '#ffffff' : 'rgba(0, 0, 0, 0.54)'
                                }
                            }}>
                                <InputLabel id="curve-type-label" className="text-black dark:text-white">{t("selectCurveType")}</InputLabel>
                                <Select
                                    labelId="curve-type-label"
                                    value={selectedCurve}
                                    label={t("selectCurveType")}
                                    onChange={(e) => setSelectedCurve(e.target.value as 'revenue' | 'orders')}
                                    className="text-black dark:text-white"
                                    sx={{ '& .MuiSelect-select': { color: 'inherit' } }}
                                >
                                    <MenuItem value="revenue" className="text-black dark:text-white">{t("revenue")} (€)</MenuItem>
                                    <MenuItem value="orders" className="text-black dark:text-white">{t("orderCount")}</MenuItem>
                                </Select>
                            </FormControl>                            <FormControl className="flex-1" sx={{ 
                                '& .MuiInputLabel-root': { color: 'inherit' },                                '& .MuiOutlinedInput-root': { 
                                    color: 'inherit',
                                    '& fieldset': {
                                        borderColor: isDarkMode ? '#4b5563' : 'rgba(0, 0, 0, 0.23)'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: isDarkMode ? '#9ca3af' : 'rgba(0, 0, 0, 0.87)'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: isDarkMode ? '#ffffff' : '#1976d2'
                                    }
                                },
                                '& .MuiSelect-icon': {
                                    color: isDarkMode ? '#ffffff' : 'rgba(0, 0, 0, 0.54)'
                                }
                            }}>
                                <InputLabel id="timeframe-label" className="text-black dark:text-white">{t("timeframe")}</InputLabel>
                                <Select
                                    labelId="timeframe-label"
                                    value={timeframe}
                                    label={t("timeframe")}
                                    onChange={(e) => setTimeframe(e.target.value as TimeFrame)}
                                    className="text-black dark:text-white"
                                    sx={{ '& .MuiSelect-select': { color: 'inherit' } }}
                                >
                                    <MenuItem value={TimeFrame.DAY} className="text-black dark:text-white">{t("day")}</MenuItem>
                                    <MenuItem value={TimeFrame.WEEK} className="text-black dark:text-white">{t("week")}</MenuItem>
                                    <MenuItem value={TimeFrame.MONTH} className="text-black dark:text-white">{t("month")}</MenuItem>
                                    <MenuItem value={TimeFrame.YEAR} className="text-black dark:text-white">{t("year")}</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mt-10 text-black dark:text-white">📦 {t("products")}</h2>                    <div
                        className="w-full p-4 mt-4 mb-8 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden min-h-[26rem] cursor-pointer pie-chart-container">{pieChartData.length === 0 ? (
                            <div className="flex justify-center items-center h-[300px] text-gray-500 dark:text-gray-400">
                                {t("noData")}
                            </div>
                        ) : (                            <PieChart
                                series={[{
                                    data: pieChartData,
                                    innerRadius: 1,
                                    paddingAngle: 2,
                                    cornerRadius: 4,
                                    valueFormatter: (item) => `${item.value}`,
                                    arcLabelMinAngle: 45,
                                    highlightScope: {
                                        fade: 'global',
                                        highlight: 'item'
                                    }
                                }]}
                                height={300}
                                colors={rainbowColors}
                                sx={{
                                    '& .MuiChartsLegend-label': {
                                        fill: `${chartTheme.textColor} !important`,
                                        color: `${chartTheme.textColor} !important`
                                    },
                                    '& .MuiChartsLegend-root': {
                                        '& text': {
                                            fill: `${chartTheme.textColor} !important`,
                                            color: `${chartTheme.textColor} !important`
                                        }
                                    },
                                    '& .MuiChartsPieArc-arc': {
                                        stroke: 'none !important',
                                        strokeWidth: '0 !important',
                                        '& text': {
                                            fill: `${chartTheme.textColor} !important`,
                                            fontWeight: 'bold'
                                        }
                                    },
                                    '& path': {
                                        stroke: 'none !important',
                                        strokeWidth: '0 !important'
                                    },
                                    '& path[stroke]': {
                                        stroke: 'none !important'
                                    },
                                    '& g path': {
                                        stroke: 'none !important',
                                        strokeWidth: '0 !important'
                                    },
                                    '& .MuiChartsSector-root': {
                                        stroke: 'none !important',
                                        strokeWidth: '0 !important'
                                    },
                                    '& text': {
                                        fill: `${chartTheme.textColor} !important`,
                                        color: `${chartTheme.textColor} !important`
                                    },
                                    '& .MuiChartsLegend-series text': {
                                        fill: `${chartTheme.textColor} !important`,
                                        color: `${chartTheme.textColor} !important`
                                    },
                                    '& .MuiChartsLegend-mark + text': {
                                        fill: `${chartTheme.textColor} !important`,
                                        color: `${chartTheme.textColor} !important`
                                    }
                                }}
                            />
                        )}                        <div className="mt-4 flex gap-2">                            <TextField
                                label={t("startDate")}
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className="flex-1 text-black dark:text-white"                                sx={{ 
                                    '& .MuiInputLabel-root': { color: 'inherit' }, 
                                    '& .MuiOutlinedInput-root': { 
                                        color: 'inherit',
                                        '& fieldset': {
                                            borderColor: isDarkMode ? '#4b5563' : 'rgba(0, 0, 0, 0.23)'
                                        },
                                        '&:hover fieldset': {
                                            borderColor: isDarkMode ? '#9ca3af' : 'rgba(0, 0, 0, 0.87)'
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: isDarkMode ? '#ffffff' : '#1976d2'
                                        }
                                    },
                                    '& .MuiOutlinedInput-input': { color: 'inherit' },
                                    '& input[type="date"]::-webkit-calendar-picker-indicator': {
                                        filter: isDarkMode ? 'invert(1)' : 'none'
                                    }
                                }}
                            />
                            <TextField
                                label={t("endDate")}
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className="flex-1 text-black dark:text-white"                                sx={{ 
                                    '& .MuiInputLabel-root': { color: 'inherit' }, 
                                    '& .MuiOutlinedInput-root': { 
                                        color: 'inherit',
                                        '& fieldset': {
                                            borderColor: isDarkMode ? '#4b5563' : 'rgba(0, 0, 0, 0.23)'
                                        },
                                        '&:hover fieldset': {
                                            borderColor: isDarkMode ? '#9ca3af' : 'rgba(0, 0, 0, 0.87)'
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: isDarkMode ? '#ffffff' : '#1976d2'
                                        }
                                    },                                    '& .MuiOutlinedInput-input': { color: 'inherit' },
                                    '& input[type="date"]::-webkit-calendar-picker-indicator': {
                                        filter: isDarkMode ? 'invert(1)' : 'none'
                                    }
                                }}
                            />
                        </div>
                    </div>

                </motion.div>
            </div>
        </>
    );
}

export default FakeStats;
