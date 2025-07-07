import React from 'react';
import { LineChart } from '@mui/x-charts';
import dayjs from 'dayjs';

const StockLineChart: React.FC = () => {

    const xAxisData = Array.from({ length: 12 }, (_, i) =>
        dayjs().subtract(11 - i, 'month').toDate()
    );


    const seriesData = [20, 35, 45, 30, 50, 60, 55, 70, 65, 80, 75, 90];

    return (
        <div style={{ marginLeft: 120, marginRight: 120 }} className="mt-4">
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
                margin={{ left: 50, right: 50 }}
            />
        </div>
    );
};

export default StockLineChart;
