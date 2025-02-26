'use client'
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface DataPoint {
    time: string;
    marketplaceads: number;
    leaderboardads: number;
    hosAssesmentsponsorship: number;
}

interface BarChartComponentProps {
    data: DataPoint[];
}

const BarChartClick: React.FC<BarChartComponentProps> = ({ data }) => {
    return (
        <ResponsiveContainer className="lg:max-w-[1010px] pr-5 pt-1" height={240}>
        <BarChart
            data={data}
            barCategoryGap="30%"
            barSize={5}
            margin={{
                top: 20,
                right: 0,
                left: 0,
                bottom: 0,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
                dataKey="time"
                label={{
                    value: "Time",
                    position: "bottom", // Position the label below the X-axis
                    offset: -5, // Adjusts the position closer to the axis
                    fontSize: "12px"
                }}
                fontSize={10}
            />
            <YAxis
                label={{
                    value: "Rate in %",
                    angle: -90, // Rotates the label vertically
                    position: "insideLeft", // Positions label inside the axis
                    offset: 15, // Adjusts distance from the axis
                    dy: 20,
                    fontSize: "10px"
                }}
                fontSize={10}
            />
            <Tooltip
            contentStyle={{
                fontSize: "10px",
            }}
                cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />
            <Legend align="left"
                wrapperStyle={{
                    paddingLeft: "10px",
                    paddingTop: "10px",
                    fontSize: "10px", // Adjusted font size for the legend
                }} />
            <Bar dataKey="marketplaceads" fill="#036" name="Market place Ads" />
            <Bar dataKey="leaderboardads" fill="#CA7CFF" name="Leaderboard Ads" />
            <Bar dataKey="hosAssesmentsponsorship" fill="#0f6" name="HOS Assesment Sponsorship" />
        </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartClick;