"use client";

import LineChartDividerPeriod from "@/components/generic/line-chart-divider/LineChartDividerPeriod";
import React from "react";
import {Direction} from "@/types/home/Direction";

interface LineChartDividerProps {
    color: string;
    direction: Direction;
}

const LineChartDivider: React.FC<LineChartDividerProps> = ({ color, direction }) => {
    return (
        <div className="scroller">
            <div className={direction === Direction.Right ? "track-right" : "track-left"}>
                {
                   new Array(10).fill(0).map((_, index) => {
                       return <LineChartDividerPeriod
                           key={index}
                           width={200}
                           height={60}
                           style={{ color: color }}
                           className="w-50 h-15 sm:w-75 sm:h-20 md:w-96 md:h-24"
                       />
                   })
                }
            </div>
        </div>
    );
};

export default LineChartDivider;
