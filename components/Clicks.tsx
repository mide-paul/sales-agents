'use client'
import React, { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface DataPoint {
    time: string;
    marketplaceads: number;
    leaderboardads: number;
    hosAssesmentsponsorship: number;
}

type Data = {
    [month: string]: DataPoint[];
};

const data: Data = {
    January: [
        { time: "Jan", marketplaceads: 70, leaderboardads: 50, hosAssesmentsponsorship: 60 },
        { time: "Feb", marketplaceads: 65, leaderboardads: 55, hosAssesmentsponsorship: 65 },
        { time: "Mar", marketplaceads: 80, leaderboardads: 60, hosAssesmentsponsorship: 70 },
        { time: "Apr", marketplaceads: 75, leaderboardads: 62, hosAssesmentsponsorship: 68 },
        { time: "May", marketplaceads: 45, leaderboardads: 62, hosAssesmentsponsorship: 48 },
        { time: "Jun", marketplaceads: 65, leaderboardads: 62, hosAssesmentsponsorship: 28 },
        { time: "Jul", marketplaceads: 15, leaderboardads: 32, hosAssesmentsponsorship: 78 },
        { time: "Aug", marketplaceads: 45, leaderboardads: 72, hosAssesmentsponsorship: 38 },
        { time: "Sep", marketplaceads: 75, leaderboardads: 82, hosAssesmentsponsorship: 78 },
        { time: "Oct", marketplaceads: 25, leaderboardads: 32, hosAssesmentsponsorship: 18 },
        { time: "Nov", marketplaceads: 85, leaderboardads: 12, hosAssesmentsponsorship: 68 },
        { time: "Dec", marketplaceads: 35, leaderboardads: 52, hosAssesmentsponsorship: 88 },
    ],
    February: [
        { time: "Jan", marketplaceads: 68, leaderboardads: 48, hosAssesmentsponsorship: 58 },
        { time: "Feb", marketplaceads: 66, leaderboardads: 50, hosAssesmentsponsorship: 60 },
        { time: "Mar", marketplaceads: 72, leaderboardads: 53, hosAssesmentsponsorship: 62 },
        { time: "Apr", marketplaceads: 70, leaderboardads: 55, hosAssesmentsponsorship: 65 },
    ],
    // Add more months as needed
};

// Helper function to calculate average percentages
const calculateAverages = (dataPoints: DataPoint[]) => {
    const totals = dataPoints.reduce(
        (acc, point) => ({
            marketplaceads: acc.marketplaceads + point.marketplaceads,
            leaderboardads: acc.leaderboardads + point.leaderboardads,
            hosAssesmentsponsorship: acc.hosAssesmentsponsorship + point.hosAssesmentsponsorship,
        }),
        { marketplaceads: 0, leaderboardads: 0, hosAssesmentsponsorship: 0 }
    );

    const count = dataPoints.length;
    return {
        marketplaceads: (totals.marketplaceads / count).toFixed(1),
        leaderboardads: (totals.leaderboardads / count).toFixed(1),
        hosAssesmentsponsorship: (totals.hosAssesmentsponsorship / count).toFixed(1),
    };
};

const CustomLegend = ({
    averages,
}: {
    averages: { marketplaceads: string; leaderboardads: string; hosAssesmentsponsorship: string };
}) => {
    return (
        <div className="flex justify-center space-x-0.5 lg:space-x-3 mb-4 text-[10px]">
            <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                Marketplace Ads: {averages.marketplaceads}%
            </div>
            <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
                Leaderboard Ads: {averages.leaderboardads}%
            </div>
            <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                HOS Assesment Sponsorship: {averages.hosAssesmentsponsorship}%
            </div>
        </div>
    );
};

const Clicks: React.FC = () => {
    const [selectedMonth, setSelectedMonth] = useState<string>("January");

    const averages = calculateAverages(data[selectedMonth]);

    return (
        <div className="p-4">
            {/* Header Section */}
            <div className="float-right mb-4">
                <select
                    className="border border-gray-300 rounded-md p-1 text-xs"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    {Object.keys(data).map((month) => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>

            {/* Legend Section */}
            <CustomLegend averages={averages} />

            {/* Chart Section */}
            <ResponsiveContainer className={`w-80 lg:w-96 pr-1`} height={180}>
                <LineChart data={data[selectedMonth]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="time"
                        label={{
                            value: "Time",
                            position: "bottom",
                            offset: -5,
                            fill: "#555",
                            fontSize: "12px",
                        }}
                        fontSize={10} 
                    />
                    <YAxis
                        label={{
                            value: "Number of clicks",
                            angle: -90,
                            position: "insideLeft",
                            offset: 5,
                            dy: 50,
                            fill: "#555",
                            fontSize: "12px",
                        }}
                        fontSize={10} 
                    />
                    <Tooltip
                    contentStyle={{
                        fontSize: "10px",
                      }}
                    />
                    <Line
                        type="monotone"
                        dataKey="marketplaceads"
                        stroke="#3B82F6" // Blue
                        strokeWidth={2}
                    />
                    <Line
                        type="monotone"
                        dataKey="leaderboardads"
                        stroke="#A855F7" // Purple
                        strokeWidth={2}
                    />
                    <Line
                        type="monotone"
                        dataKey="hosAssesmentsponsorship"
                        stroke="#22C55E" // Green
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Clicks;