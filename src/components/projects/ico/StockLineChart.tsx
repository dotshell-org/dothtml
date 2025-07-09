import React from 'react';
import { LineChart } from '@mui/x-charts';
import { useMediaQuery } from '@mui/material';
import dayjs from 'dayjs';

const StockLineChart: React.FC = () => {
    // Detect mobile for disabling interactions
    const isMobile = useMediaQuery('(max-width: 768px)');
    
    const xAxisData = Array.from({ length: 12 }, (_, i) =>
        dayjs().subtract(11 - i, 'month').toDate()
    );


    const seriesData = [20, 35, 45, 30, 50, 60, 55, 70, 65, 80, 75, 90];

    return (
        <div className="w-full h-96 bg-white dark:bg-gray-900 p-4 sm:p-6 md:p-8">
            <LineChart
                xAxis={[
                    {
                        data: xAxisData,
                        tickInterval: xAxisData,
                        scaleType: 'time',
                        valueFormatter: (date: Date) => dayjs(date).format('MMM'),
                    },
                ]}
                series={[
                    {
                        data: seriesData,
                        label: 'Stocks',
                        color: '#eab308',
                    },
                ]}
                height={300}
                margin={{ left: 0, right: 20 }}
                disableAxisListener={isMobile}
                sx={isMobile ? { pointerEvents: 'none' } : undefined}
            />
        </div>
    );
};

export default StockLineChart;
