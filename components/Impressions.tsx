'use client';

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import BarChartTraining with SSR disabled
const BarChartClick = dynamic(() => import("./BarChartClick"), { ssr: false });

const Impressions = () => {
  const data = [
    { time: "Jan", marketplaceads: 50, leaderboardads: 30, hosAssesmentsponsorship: 40 },
    { time: "Feb", marketplaceads: 40, leaderboardads: 25, hosAssesmentsponsorship: 20 },
    { time: "Mar", marketplaceads: 30, leaderboardads: 20, hosAssesmentsponsorship: 40 },
    { time: "Apr", marketplaceads: 60, leaderboardads: 35, hosAssesmentsponsorship: 60 },
    { time: "May", marketplaceads: 70, leaderboardads: 40, hosAssesmentsponsorship: 70 },
    { time: "Jun", marketplaceads: 80, leaderboardads: 45, hosAssesmentsponsorship: 80 },
    { time: "Jul", marketplaceads: 70, leaderboardads: 50, hosAssesmentsponsorship: 40 },
    { time: "Aug", marketplaceads: 70, leaderboardads: 55, hosAssesmentsponsorship: 20 },
    { time: "Sep", marketplaceads: 70, leaderboardads: 60, hosAssesmentsponsorship: 50 },
    { time: "Oct", marketplaceads: 70, leaderboardads: 65, hosAssesmentsponsorship: 60 },
    { time: "Nov", marketplaceads: 70, leaderboardads: 60, hosAssesmentsponsorship: 30 },
    { time: "Dec", marketplaceads: 50, leaderboardads: 60, hosAssesmentsponsorship: 70 },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
    className="flex lg:max-w-5xl lg:h-60 items-center pb-4">
      <BarChartClick data={data} />
    </div>
  );
};

export default Impressions;