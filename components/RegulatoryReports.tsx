'use client';
import { useState } from "react";
import Image from "next/image";
import arrow_left from './../public/icons/arrow_left.svg';
import arrow_right from './../public/icons/arrow_right.svg';

// Define types
type Client = {
    imageUrl: string | undefined;
    id: number;
    name: string;
    monthlyData: {
        [key: string]: {
            driversFailingHOS: number; // Ratio (e.g., 0.15)
            hosKnowledgeDeficits: string; // Either "The Sleeper Berth" or "30-Minute Break"
            postTrainingMetrics: number; // Exact amount in $
            csaScore: number;
        };
    };
};

const initialClients: Client[] = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Client ${i + 1}`,
    monthlyData: Object.fromEntries(
        ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(month => [
            month,
            {
                driversFailingHOS: parseFloat((Math.random() * 0.5).toFixed(2)), // Random percentage (0-50%)
                hosKnowledgeDeficits: Math.random() > 0.5 ? "The Sleeper Berth" : "30-Minute Break", // Randomly pick one of the two
                postTrainingMetrics: Math.floor(Math.random() * 10000), // Random exact amount in $
                csaScore: Math.floor(Math.random() * 100), // Random CSA score (0-100)
            }
        ])
    ),
    imageUrl: `https://ui-avatars.com/api/?name=Client+${i + 1}&background=random&size=128`,
}));

const PAGE_SIZE = 10;

export default function RegulatoryReports() {
    const [clients, ] = useState<Client[]>(initialClients);
    // const [clients, setClients] = useState<Client[]>(initialClients);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedMonth, setSelectedMonth] = useState<string>("January");

    // // Fetch client data from the API
    // useEffect(() => {
    //     const fetchClientData = async () => {
    //         const res = await fetch("/api/clients");
    //         const data = await res.json();
    //         setClients(data);
    //     };

    //     fetchClientData();
    // }, []); // Only run on mount

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const filteredClients = clients;

    const paginatedClients = filteredClients.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const formatPercentage = (value: number) => `${Math.round(value * 100)}%`;

    return (
        <div className="p-3 lg:p-6">
            {/* Header with total users */}
            <div className="flex justify-between mb-4">
                <h1 className="text-xs lg:text-sm font-medium">
                    Driver&apos;s List <span className="bg-blue-100 rounded-full text-xs p-1 ml-2">
                        {filteredClients.length} Users</span>
                </h1>
                <select
                    className="border border-slate-300 px-1 lg:px-4 py-2 rounded-lg text-xs"
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    value={selectedMonth}
                >
                    {months.map((month, index) => (
                        <option key={index} value={month}>{month}</option>
                    ))}
                </select>
            </div>

            {/* Client Table */}
            <table className="w-full border-collapse border border-gray-200">
                <thead className="bg-gray-100 text-xs text-left">
                    <tr>
                        <th className="px-1 lg:px-4 py-2 font-normal">% of drivers failing HOS assessment</th>
                        <th className="px-1 lg:px-4 py-2 font-normal">HOS Knowledge Deficits</th>
                        <th className="px-1 lg:px-4 py-2 font-normal">Post training metrics</th>
                        <th className="px-1 lg:px-4 py-2 font-normal">CSA Scores</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedClients.map((client) => (
                        <tr key={client.id}>
                            <td className="border-y px-4 py-2 text-xs text-left">
                                {formatPercentage(client.monthlyData[selectedMonth].driversFailingHOS)}
                            </td>
                            <td className="border-b px-4 py-2 text-xs text-left">
                                {client.monthlyData[selectedMonth].hosKnowledgeDeficits}
                            </td>
                            <td className="border-b px-4 py-2 text-xs text-left">
                                ${client.monthlyData[selectedMonth].postTrainingMetrics.toLocaleString()}
                            </td>
                            <td className="border-b px-4 py-2 text-xs text-left">
                                {client.monthlyData[selectedMonth].csaScore}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                    <Image
                        src={arrow_left}
                        alt=""
                        className="absolute w-4 h-4 ml-3 object-cover"
                    />
                    <button
                        className="px-4 py-2 pl-8 text-xs bg-white text-blue-900 shadow rounded"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                        Previous
                    </button>
                </div>
                <span className="text-xs">
                    Page {currentPage} of {Math.ceil(filteredClients.length / PAGE_SIZE)}
                </span>
                <div className="flex items-center">
                    <button
                        className="px-4 py-2 pr-8 text-xs bg-white text-blue-900 shadow rounded"
                        disabled={currentPage === Math.ceil(filteredClients.length / PAGE_SIZE)}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        Next
                    </button>
                    <Image
                        src={arrow_right}
                        alt=""
                        className="absolute w-4 h-4 ml-12 object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
