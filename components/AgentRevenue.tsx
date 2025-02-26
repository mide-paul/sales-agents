"use client";

import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from "recharts";

// Define the data type
type RevenueData = {
  [year: string]: {
    [month: string]: { date: string; amount: number }[];
  };
};

// Revenue data organized by year and month
const revenueData: RevenueData = {
  2024: {
    Jan: [
      { date: "2nd", amount: 500 },
      { date: "4th", amount: 700 },
      { date: "6th", amount: 800 },
      { date: "8th", amount: 900 },
      { date: "10th", amount: 1000 },
      { date: "12th", amount: 200 },
    ],
    Feb: [
      { date: "2nd", amount: 450 },
      { date: "4th", amount: 620 },
      { date: "6th", amount: 730 },
      { date: "8th", amount: 200 },
      { date: "10th", amount: 600 },
    ],
    Mar: [
      { date: "2nd", amount: 920 },
      { date: "4th", amount: 880 },
      { date: "6th", amount: 1000 },
      { date: "8th", amount: 100 },
      { date: "10th", amount: 800 },
    ],
    Apr: [
        { date: "2nd", amount: 200 },
        { date: "4th", amount: 500 },
        { date: "6th", amount: 100 },
        { date: "8th", amount: 720 },
        { date: "10th", amount: 1000 },
      ],
      May: [
        { date: "2nd", amount: 450 },
        { date: "4th", amount: 620 },
        { date: "6th", amount: 730 },
        { date: "8th", amount: 200 },
        { date: "10th", amount: 600 },
      ],
      Jun: [
        { date: "2nd", amount: 500 },
        { date: "4th", amount: 700 },
        { date: "6th", amount: 800 },
        { date: "8th", amount: 900 },
        { date: "10th", amount: 1000 },
        { date: "12th", amount: 200 },
      ],
      Jul: [
        { date: "2nd", amount: 920 },
        { date: "4th", amount: 880 },
        { date: "6th", amount: 1000 },
        { date: "8th", amount: 100 },
        { date: "10th", amount: 800 },
      ],
      Aug: [
        { date: "2nd", amount: 450 },
        { date: "4th", amount: 620 },
        { date: "6th", amount: 730 },
        { date: "8th", amount: 200 },
        { date: "10th", amount: 600 },
      ],
      Sep: [
        { date: "2nd", amount: 200 },
        { date: "4th", amount: 500 },
        { date: "6th", amount: 100 },
        { date: "8th", amount: 720 },
        { date: "10th", amount: 1000 },
      ],
      Oct: [
        { date: "2nd", amount: 450 },
        { date: "4th", amount: 620 },
        { date: "6th", amount: 730 },
        { date: "8th", amount: 200 },
        { date: "10th", amount: 600 },
      ],
      Nov: [
        { date: "2nd", amount: 1000 },
        { date: "4th", amount: 300 },
        { date: "6th", amount: 730 },
        { date: "8th", amount: 600 },
        { date: "10th", amount: 100 },
      ],
      Dec: [
        { date: "2nd", amount: 450 },
        { date: "4th", amount: 620 },
        { date: "6th", amount: 730 },
        { date: "8th", amount: 200 },
        { date: "10th", amount: 600 },
      ],
  },
  2025: {
    Jan: [
      { date: "2nd", amount: 600 },
      { date: "4th", amount: 800 },
      { date: "6th", amount: 900 },
      { date: "8th", amount: 1000 },
    ],
    Feb: [
      { date: "2nd", amount: 500 },
      { date: "4th", amount: 700 },
      { date: "6th", amount: 850 },
      { date: "8th", amount: 300 },
    ],
    Mar: [
      { date: "2nd", amount: 750 },
      { date: "4th", amount: 600 },
      { date: "6th", amount: 950 },
      { date: "8th", amount: 800 },
    ],
  },
};

// Helper function to aggregate monthly data
const getYearlyData = (year: string) => {
  const dataForYear = revenueData[year];
  return Object.keys(dataForYear).map((month) => {
    const totalAmount = dataForYear[month].reduce((sum, entry) => sum + entry.amount, 0);
    return { month, amount: totalAmount };
  });
};

const AgentRevenue = () => {
  const [selectedYear, setSelectedYear] = useState<string>("2025");

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  const yearlyData = getYearlyData(selectedYear);

  return (
    <div className="flex flex-col items-center">
      {/* Year Selector */}
      <div className="mb-2">
        <label htmlFor="year-selector" className="mr-2 font-medium text-xs">
          Select Year:
        </label>
        <select
          id="year-selector"
          value={selectedYear}
          onChange={handleYearChange}
          className="p-1 text-xs border border-blue-950 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          {Object.keys(revenueData).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Line Chart */}
      <ResponsiveContainer className="w-80 lg:max-w-5xl pr-5" height={240}>
        <LineChart
          data={yearlyData}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#036" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#036" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            label={{
              value: "Month",
              position: "bottom",
              offset: -5,
              fontSize: "12px",
            }}
            fontSize={10}
          />
          <YAxis
            label={{
              value: "Amount ($)",
              angle: -90,
              position: "insideLeft",
              offset: 15,
              fontSize: "12px",
              dy: 30,
            }}
            fontSize={10}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#f9f9f9",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "10px",
              fontSize: "10px",
            }}
            labelStyle={{
              color: "#036",
              fontWeight: "bold",
            }}
            itemStyle={{
              color: "#036",
            }}
            cursor={{ stroke: "rgba(0, 0, 0, 0.1)", strokeWidth: 2 }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: "10px",
              fontSize: "12px",
            }}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#036"
            fill="url(#colorRevenue)"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#036"
            strokeWidth={2}
            dot={{ r: 4, fill: "#036" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AgentRevenue;