"use client";

import LineChartDividerPeriod from "@/components/home/line-chart-divider/LineChartDividerPeriod";
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
