import React from 'react';
import { BarChart as VisxBarChart } from '@mui/x-charts';

const sampleInventory = [
    { name: 'Coca', quantity: 50 },
    { name: 'Water', quantity: 75 },
    { name: 'Kinder bueno', quantity: 30 },
    { name: 'Chips', quantity: 45 },
    { name: 'Kit Kat', quantity: 60 },
    { name: 'Fanta', quantity: 25 },
];

const BarChart: React.FC = () => {
    return (
        <div className="w-full h-96 bg-white dark:bg-gray-900 p-4 sm:p-6 md:p-8">
            <VisxBarChart
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
                margin={{ left: 50, right: 50 }}
            />
        </div>
    );
};

export default BarChart;
