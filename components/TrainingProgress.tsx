'use client';
import React from "react";

type TrainingProgressProps = {
    percentage: number;
};

const TrainingProgress: React.FC<TrainingProgressProps> = ({ percentage }) => {
    const radius = 50;
    const stroke = 10;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset =
        circumference - (percentage / 100) * circumference;

    return (
        <div className="flex gap-14">
            <div className="flex pt-10 items-center justify-center w-32 h-32">
                <svg
                    className="rotate-[-90deg]"
                    width={radius * 2}
                    height={radius * 2}
                >
                    <circle
                        stroke="#e5e7eb"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    <circle
                        stroke="#036"
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset }}
                        strokeLinecap="round"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                </svg>
                <div className="absolute flex flex-col items-center justify-center w-full h-full">
                    <h3 className="text-sm text-center font-semibold text-gray-800">
                        {percentage}%
                    </h3>
                    <span className="text-xs text-center text-black">Complete</span>
                </div>
                <h3 className="absolute mt-36 text-left text-blue-950 text-sm">Professional</h3>
            </div>

            <div className="flex pt-10 items-center justify-center w-32 h-32">
                <svg
                    className="rotate-[-90deg]"
                    width={radius * 2}
                    height={radius * 2}
                >
                    <circle
                        stroke="#e5e7eb"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    <circle
                        stroke="#036"
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset }}
                        strokeLinecap="round"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                    <h3 className="text-sm text-center font-semibold text-gray-800">
                        {percentage}%
                    </h3>
                    <span className="text-xs text-center text-black">Complete</span>
                </div>
                <h3 className="absolute mt-36 text-left text-blue-950 text-sm">Platinum</h3>
            </div>

            <div className="flex pt-10 items-center justify-center w-32 h-32">
                <svg
                    className="rotate-[-90deg]"
                    width={radius * 2}
                    height={radius * 2}
                >
                    <circle
                        stroke="#e5e7eb"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    <circle
                        stroke="#036"
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset }}
                        strokeLinecap="round"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                    <h3 className="text-sm text-center font-semibold text-gray-800">
                        {percentage}%
                    </h3>
                    <span className="text-xs text-center text-black">Complete</span>
                </div>
                <h3 className="absolute mt-36 text-left text-blue-950 text-sm">Enterprise</h3>
            </div>
        </div>
    );
};

export default TrainingProgress;
