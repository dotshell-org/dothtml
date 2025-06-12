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

    const [lineChartData, setLineChartData] = useState<ChartDataPoint[]>([]);
    const [pieChartData, setPieChartData] = useState<PieChartDataPoint[]>([]);

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
    };

    const generateFakePieData = (): PieChartDataPoint[] => {
        return [
            { id: 1, value: 35, label: 'Coffee' },
            { id: 2, value: 28, label: 'Sandwiches' },
            { id: 3, value: 22, label: 'Pastries' },
            { id: 4, value: 15, label: 'Beverages' }
        ];
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
    }, [startDate, endDate]);

    return (
        <>
            <div className="h-full flex flex-col">
                <motion.div
                    className="h-full flex flex-col p-8 pb-0 overflow-y-scroll"
                    initial={{opacity: 0, y: 40}}
                    animate="enter"
                    exit="exit"
                    variants={variants}
                >
                    <h1 className="text-3xl font-bold mt-4">📊 {t("stats")}</h1>

                    <h2 className="text-2xl font-bold mt-10">📈 {t("evolution")}</h2>
                    <div
                        className="w-full p-4 mt-4 border border-gray-200 dark:border-gray-600 rounded-lg min-h-[25rem]">
                        {lineChartData.length === 0 ? (
                            <div className="flex justify-center items-center h-[300px] text-gray-500">
                                {t("noData")}
                            </div>
                        ) : (
                            <LineChart
                                xAxis={[{
                                    data: lineChartData.map(point => point.x),
                                    scaleType: 'point'
                                }]}
                                series={[
                                    {
                                        data: lineChartData.map(point => point.y),
                                        label: selectedCurve === 'revenue' ? t("revenue") + " (€)" : t("orderCount"),
                                        color: '#006dea'
                                    },
                                ]}
                                height={300}
                            />
                        )}
                        <div className="flex gap-4 mb-4 w-full">
                            <FormControl className="flex-1">
                                <InputLabel id="curve-type-label">{t("selectCurveType")}</InputLabel>
                                <Select
                                    labelId="curve-type-label"
                                    value={selectedCurve}
                                    label={t("selectCurveType")}
                                    onChange={(e) => setSelectedCurve(e.target.value as 'revenue' | 'orders')}
                                >
                                    <MenuItem value="revenue">{t("revenue")} (€)</MenuItem>
                                    <MenuItem value="orders">{t("orderCount")}</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className="flex-1">
                                <InputLabel id="timeframe-label">{t("timeframe")}</InputLabel>
                                <Select
                                    labelId="timeframe-label"
                                    value={timeframe}
                                    label={t("timeframe")}
                                    onChange={(e) => setTimeframe(e.target.value as TimeFrame)}
                                >
                                    <MenuItem value={TimeFrame.DAY}>{t("day")}</MenuItem>
                                    <MenuItem value={TimeFrame.WEEK}>{t("week")}</MenuItem>
                                    <MenuItem value={TimeFrame.MONTH}>{t("month")}</MenuItem>
                                    <MenuItem value={TimeFrame.YEAR}>{t("year")}</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mt-10">📦 {t("products")}</h2>
                    <div
                        className="w-full p-4 mt-4 mb-8 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden min-h-[26rem] cursor-pointer">
                        {pieChartData.length === 0 ? (
                            <div className="flex justify-center items-center h-[300px] text-gray-500">
                                {t("noData")}
                            </div>
                        ) : (
                            <PieChart
                                margin={{right: 250}}
                                series={[{
                                    data: pieChartData,
                                    innerRadius: 1,
                                    paddingAngle: 2,
                                    cornerRadius: 4,
                                    valueFormatter: (item) => `${item.value}%`,
                                    arcLabelMinAngle: 45,
                                    highlightScope: {
                                        fade: 'global',
                                        highlight: 'item'
                                    }
                                }]}
                                height={300}
                                colors={rainbowColors}
                            />
                        )}
                        <div className="mt-4 flex gap-2">
                            <TextField
                                label={t("startDate")}
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className="flex-1"
                            />
                            <TextField
                                label={t("endDate")}
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className="flex-1"
                            />
                        </div>
                    </div>

                </motion.div>
            </div>
        </>
    );
}

export default FakeStats;
