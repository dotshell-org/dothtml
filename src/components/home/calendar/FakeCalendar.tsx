"use client"

import React, { useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';

// Format days: "Mon 12 April"
const formatDate = (date: string | number | dayjs.Dayjs | Date | null | undefined) => {
    return dayjs(date).format('ddd D MMMM');
};

// Generate an array of 7 days starting from a given date
const generateDays = (centralDate: dayjs.Dayjs) => {
    const startDate = centralDate.subtract(3, 'day');
    return Array.from({ length: 7 }, (_, i) => startDate.add(i, 'day'));
};

const FakeCalendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [displayedDays, setDisplayedDays] = useState(generateDays(currentDate));
    const [animDirection, setAnimDirection] = useState(0);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        setDisplayedDays(generateDays(currentDate));
    }, [currentDate]);

    const navigateToPreviousDays = () => {
        setAnimDirection(-1);
        setCurrentDate(currentDate.subtract(7, 'day'));
    };
    const navigateToNextDays = () => {
        setAnimDirection(1);
        setCurrentDate(currentDate.add(7, 'day'));
    };
    const goToToday = () => {
        setAnimDirection(0);
        setCurrentDate(dayjs());
    };

    const getDayBackgroundColor = (day: dayjs.Dayjs) => {
        if (day.day() === 0) {
            return 'bg-gray-100 text-gray-400 dark:bg-gray-600 dark:text-gray-500';
        } else if (day.day() === 6) {
            return 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500';
        } else {
            const lightColors = [
                'bg-blue-50 text-blue-300',
                'bg-blue-100 text-blue-400',
                'bg-blue-200 text-blue-400',
                'bg-blue-300 text-blue-500',
                'bg-blue-400 text-blue-600'
            ];
            const darkColors = [
                'dark:bg-blue-900 dark:text-blue-300',
                'dark:bg-blue-800 dark:text-blue-400',
                'dark:bg-blue-700 dark:text-blue-400',
                'dark:bg-blue-600 dark:text-blue-300',
                'dark:bg-blue-500 dark:text-blue-200'
            ];
            return `${lightColors[day.day() - 1]} ${darkColors[day.day() - 1]}`;
        }
    };

    const containerVariants = {
        hidden: {
            opacity: 1,
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
            },
        },
        exit: {
            opacity: 1,
            transition: {
                staggerChildren: 0.04,
                staggerDirection: animDirection > 0 ? 1 : -1,
            },
        },
    };
    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 30,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 30,
            },
        },
        exit: {
            opacity: 0,
            y: -30,
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 30,
            },
        },
    };
    const slideUpVariants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: { 
                type: 'spring',
                stiffness: 300,
                damping: 25,
            }
        },
    };
    const buttonVariants = {
        hidden: { 
            opacity: 0,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delay: 0.3,
                type: 'spring',
                stiffness: 300,
                damping: 25,
            }
        },
    };

    return (
        <motion.div
            className="h-[40rem] flex flex-col p-2"
            initial="hidden"
            animate="visible"
            variants={slideUpVariants}
        >
            <motion.div
                className="flex justify-between items-center mt-5 mb-2"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.button
                    onClick={navigateToPreviousDays}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-200 border border-transparent hover:border-[#646cff] focus:outline-4 focus:outline-auto focus:outline-[#646cff] transition-all cursor-pointer"
                    variants={buttonVariants}
                >
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                </motion.button>

                <motion.button
                    onClick={goToToday}
                    className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg border border-transparent hover:border-[#646cff] focus:outline-4 focus:outline-auto focus:outline-[#646cff] transition-all cursor-pointer"
                    variants={buttonVariants}
                >
                    Today
                </motion.button>

                <motion.button
                    onClick={navigateToNextDays}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-200 border border-transparent hover:border-[#646cff] focus:outline-4 focus:outline-auto focus:outline-[#646cff] transition-all cursor-pointer"
                    variants={buttonVariants}
                >
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                    </svg>
                </motion.button>
            </motion.div>

            <div className="mt-14 h-6 grid grid-cols-7 text-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentDate.format('YYYY-MM-DD') + '-header'}
                        className="col-span-7 grid grid-cols-7"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {displayedDays.map((day, index) => (
                            <motion.div
                                key={`header-${day.format('YYYY-MM-DD')}`}
                                className={
                                    day.isSame(dayjs(), 'day')
                                        ? 'font-bold text-blue-600 dark:text-blue-400'
                                        : 'dark:text-gray-300'
                                }
                                variants={itemVariants}
                            >
                                {formatDate(day)}
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div
                ref={scrollContainerRef}
                className="mt-2 flex-grow overflow-auto"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentDate.format('YYYY-MM-DD') + '-content'}
                        className="grid grid-cols-7 text-center h-[calc(100%-2rem)] pt-1"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {displayedDays.map((day, index) => {
                            const bgColor = getDayBackgroundColor(day);
                            return (
                                <motion.div
                                    key={`content-${day.format('YYYY-MM-DD')}`}
                                    variants={itemVariants}
                                    className={`p-5 m-1 my-0 ${
                                        index > 0 ? 'ml-1.5' : ''
                                    } ${
                                        index < 6 ? 'mr-1.5' : ''
                                    } rounded-lg h-full ${bgColor} hover:-mt-1 cursor-pointer shadow`}
                                    style={{ transition: 'margin-top 0.2s ease-out' }}
                                >
                                    <h1
                                        className="flex items-center justify-center h-full opacity-80"
                                        style={{fontSize: `calc(2rem + 0.8vw)`}}
                                    >
                                        €0.0
                                    </h1>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default FakeCalendar;
