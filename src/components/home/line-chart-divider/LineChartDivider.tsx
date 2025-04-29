"use client";

import LineChartDividerPeriod from "@/components/home/line-chart-divider/LineChartDividerPeriod";
import React from "react";

interface LineChartDividerProps {
    color: string;
}

const LineChartDivider: React.FC<LineChartDividerProps> = ({ color }) => {
    return (
        <div className="scroller bg-transparent">
            <div className="track">
                {
                   new Array(10).fill(0).map((_, index) => {
                       return <LineChartDividerPeriod
                           key={index}
                           width={400}
                           height={100}
                           style={{ color: color }}
                       />
                   })
                }
            </div>
        </div>
    );
};

export default LineChartDivider;
