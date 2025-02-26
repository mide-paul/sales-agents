'use client'
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface DataPoint {
    date: string;
    oldClients: number;
    newClients: number;
}

interface BarChartComponentProps {
    data: DataPoint[];
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => {
    return (
        <BarChart
            width={384}
            height={240}
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
                dataKey="date"
                label={{
                    value: "Date",
                    position: "bottom", // Position the label below the X-axis
                    offset: -5, // Adjusts the position closer to the axis
                    fontSize: "12px"
                }}
                fontSize={10}
            />
            <YAxis
                label={{
                    value: "Number of Clients",
                    angle: -90, // Rotates the label vertically
                    position: "insideLeft", // Positions label inside the axis
                    offset: 10, // Adjusts distance from the axis
                    dy: 45,
                    fontSize: "12px"
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
                    fontSize: "12px", // Adjusted font size for the legend
                }} />
            <Bar dataKey="oldClients" fill="#CA7CFF" name="Old Clients" />
            <Bar dataKey="newClients" fill="#0f6" name="New Clients" />
        </BarChart>
    );
};

export default BarChartComponent;