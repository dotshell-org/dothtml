import React from 'react';
import { BarChart as MUIBarChart } from '@mui/x-charts';
import { useMediaQuery } from '@mui/material';

const sampleInventory = [
    { name: 'Soda', quantity: 50 },
    { name: 'Water', quantity: 75 },
    { name: 'Chocolate', quantity: 30 },
    { name: 'Crisps', quantity: 45 },
    { name: 'Juice', quantity: 60 },
    { name: 'Muffin', quantity: 25 },
];

const BarChart: React.FC = () => {
    // Detect mobile for disabling interactions
    const isMobile = useMediaQuery('(max-width: 768px)');
    
    return (
        <div className="w-full h-96 bg-white dark:bg-gray-900 p-4 sm:p-6 md:p-8">
            <MUIBarChart
                xAxis={[
                    {
                        data: sampleInventory.map((item) => item.name),
                        scaleType: 'band',
                        colorMap: {
                            type: 'ordinal',
                            colors: [
                                '#ccebc5',
                                '#a8ddb5',
                                '#7bccc4',
                                '#4eb3d3',
                                '#2b8cbe',
                                '#08589e',
                            ],
                        },
                    },
                ]}
                series={[
                    {
                        data: sampleInventory.map((item) => item.quantity),
                        label: "Inventory",
                    },
                ]}
                height={400}
                margin={{ left: 0, right: 20 }}
                disableAxisListener={isMobile}
                sx={isMobile ? { pointerEvents: 'none' } : undefined}
            />
        </div>
    );
};

export default BarChart;
