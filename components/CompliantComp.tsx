"use client";

import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const CompliantComp = () => {
  const data = [
    { name: "Compliant", value: 65 },
    { name: "Non-Compliant", value: 35 },
  ];

  // Define the colors for the chart
  const COLORS = ["#036", "#22c55e"]; // Blue for Compliant, Green for Non-Compliant

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-sm font-semibold mb-7 mt-5">Compliance Status</h2>
      <ResponsiveContainer width={384} height={240}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            // label={(entry) => `${entry.name}: ${entry.value}%`}
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#f9f9f9",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "10px",
              fontSize: "10px",
            }}
            labelStyle={{
              color: "#333",
              fontWeight: "bold",
            }}
            itemStyle={{
              color: "#666",
            }}
          />
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{
              fontSize: "12px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompliantComp;