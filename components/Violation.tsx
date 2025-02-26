"use client";

import React, { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Label,
} from "recharts";

// Define the shape of the data for each year
interface ChartData {
    month: string;
    violationRate: number;
}

// Define the overall chart data type
type ChartDataByYear = Record<string, ChartData[]>

const chartData: ChartDataByYear = {
    2023: [
        { month: 'Jan', violationRate: 5 },
        { month: 'Feb', violationRate: 8 },
        { month: 'Mar', violationRate: 6 },
        { month: 'Apr', violationRate: 7 },
        { month: 'May', violationRate: 9 },
        { month: 'Jun', violationRate: 10 },
        { month: 'Jul', violationRate: 6 },
        { month: 'Aug', violationRate: 7 },
        { month: 'Sep', violationRate: 8 },
        { month: 'Oct', violationRate: 5 },
        { month: 'Nov', violationRate: 4 },
        { month: 'Dec', violationRate: 6 },
    ],
    2024: [
        { month: 'Jan', violationRate: 4 },
        { month: 'Feb', violationRate: 7 },
        { month: 'Mar', violationRate: 8 },
        { month: 'Apr', violationRate: 9 },
        { month: 'May', violationRate: 10 },
        { month: 'Jun', violationRate: 6 },
        { month: 'Jul', violationRate: 7 },
        { month: 'Aug', violationRate: 8 },
        { month: 'Sep', violationRate: 9 },
        { month: 'Oct', violationRate: 5 },
        { month: 'Nov', violationRate: 3 },
        { month: 'Dec', violationRate: 4 },
    ],
    2025: [
        { month: 'Jan', violationRate: 6 },
        { month: 'Feb', violationRate: 8 },
        { month: 'Mar', violationRate: 7 },
        { month: 'Apr', violationRate: 5 },
        { month: 'May', violationRate: 6 },
        { month: 'Jun', violationRate: 9 },
        { month: 'Jul', violationRate: 10 },
        { month: 'Aug', violationRate: 8 },
        { month: 'Sep', violationRate: 7 },
        { month: 'Oct', violationRate: 6 },
        { month: 'Nov', violationRate: 5 },
        { month: 'Dec', violationRate: 7 },
    ],
};

const Violation: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState(Object.keys(chartData)[0]);
    // const [chartData, setChartData] = useState<ChartDataByYear>({});
    // const [selectedYear, setSelectedYear] = useState<string | null>(null);

    // Fetch data from the API
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('/api/violation-data');
    //             const data: ChartDataByYear = await response.json();
    //             setChartData(data);
    //             setSelectedYear(Object.keys(data)[0]); // Set the first year as default
    //         } catch (error) {
    //             console.error('Error fetching chart data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(event.target.value);
    };

    if (!selectedYear || !chartData[selectedYear]) {
        return <p className="text-center text-gray-500">Loading chart data...</p>;
    }

    const customTickStyle = { fontSize: 10, fill: '#555' }; // Reduced font size and gray color


    return (
        <div className="flex flex-col items-center">
            {/* Year Selector */}
            <div className="flex justify-center mb-4">
                <select
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="px-2 py-1 border rounded text-xs text-gray-700 bg-white focus:outline-none focus:ring focus:ring-blue-500"
                >
                    {Object.keys(chartData).map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            {/* Line Chart */}
            <ResponsiveContainer className="w-80 lg:min-w-[1010px]" height={240}>
                <LineChart data={chartData[selectedYear]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ style: customTickStyle }}>
                        <Label
                        value="Month"
                        offset={2}
                        position="insideBottom"
                        fontSize={12} />
                    </XAxis>
                    <YAxis domain={[0, 12]} tickFormatter={(value) => `${value}%`} tick={{ style: customTickStyle }}>
                        <Label
                            value="Violation in %"
                            angle={-90}
                            position="insideLeft"
                            style={{ textAnchor: 'middle' }}
                            fontSize={12}
                            offset= {15}
                        />
                    </YAxis>
                    <Tooltip
                        contentStyle={{
                            fontSize: "10px",
                        }}
                        formatter={(value) => `${value}%`} />
                    <Legend verticalAlign="top"
                    wrapperStyle={{
                        paddingLeft: "10px",
                        fontSize: "10px", // Adjusted font size for the legend
                    }}
                    />
                    <Line
                        type="monotone"
                        dataKey="violationRate"
                        stroke="#036"
                        activeDot={{ r: 8 }}
                        name="Violation Rate"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Violation;