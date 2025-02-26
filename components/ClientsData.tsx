'use client';

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import BarChartComponent with SSR disabled
const BarChartComponent = dynamic(() => import("./BarChartComponent"), { ssr: false });

const ClientData = () => {
  const data = [
    { date: "2nd", oldClients: 50, newClients: 30 },
    { date: "4th", oldClients: 40, newClients: 25 },
    { date: "6th", oldClients: 30, newClients: 20 },
    { date: "8th", oldClients: 60, newClients: 35 },
    { date: "10th", oldClients: 70, newClients: 40 },
    { date: "12th", oldClients: 80, newClients: 45 },
    { date: "14th", oldClients: 70, newClients: 50 },
    { date: "16th", oldClients: 70, newClients: 55 },
    { date: "18th", oldClients: 70, newClients: 60 },
    { date: "20th", oldClients: 70, newClients: 65 },
    { date: "22nd", oldClients: 70, newClients: 60 },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
    className="flex lg:w-96 lg:h-60 items-center">
      <BarChartComponent data={data} />
    </div>
  );
};

export default ClientData;