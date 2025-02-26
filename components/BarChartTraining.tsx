'use client'
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface DataPoint {
    time: string;
    drivers: number;
    enterpriseClients: number;
}

interface BarChartComponentProps {
    data: DataPoint[];
}

const BarChartTraining: React.FC<BarChartComponentProps> = ({ data }) => {
    return (
        <ResponsiveContainer className="lg:max-w-[1010px] pr-5" height={240}>
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
                    value: "No. of drivers and enterprise clients",
                    angle: -90, // Rotates the label vertically
                    position: "insideLeft", // Positions label inside the axis
                    offset: 15, // Adjusts distance from the axis
                    dy: 80,
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
                    fontSize: "10px", // Adjusted font size for the legend
                }} />
            <Bar dataKey="drivers" fill="#036" name="Drivers" />
            <Bar dataKey="enterpriseClients" fill="#0f6" name="Enterprise Clients" />
        </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartTraining;