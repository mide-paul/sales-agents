'use client'
import { useState } from "react";
import Image from "next/image";
import arrow_left from './../public/icons/arrow_left.svg';
import arrow_right from './../public/icons/arrow_right.svg';
import avatar from './../public/images/avatar.svg';

// Define types
type Client = {
    imageUrl: string;
    id: number;
    name: string;
    monthlyData: {
        [key: string]: {
            revenue: number;
            expenses: number;
            clientAcquisitionCost: number;
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
                revenue: parseFloat((Math.random() * 10000).toFixed(2)), // Random revenue in dollars
                expenses: parseFloat((Math.random() * 8000).toFixed(2)), // Random expenses in dollars
                clientAcquisitionCost: parseFloat((Math.random() * 2000).toFixed(2)), // Random client acquisition cost in dollars
            }
        ])
    ),
    imageUrl: `https://ui-avatars.com/api/?name=Client+${i + 1}&background=random&size=128`, // Generate headshot
}));

const PAGE_SIZE = 10;

export default function FinancialReports() {
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

    return (
        <div className="p-3 lg:p-6">
            {/* Header with total users */}
            <div className="flex justify-between mb-4">
                <h1 className="text-xs lg:text-sm font-medium">
                    Client List <span className="bg-blue-100 rounded-full text-xs p-1 ml-2">
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
                        <th className="px-1 lg:px-4 py-2 font-normal">Client Name</th>
                        <th className="px-1 lg:px-4 py-2 font-normal">Revenue</th>
                        <th className="px-1 lg:px-4 py-2 font-normal">Expenses</th>
                        <th className="px-1 lg:px-4 py-2 font-normal">Client Acquisition Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedClients.map((client) => (
                        <tr key={client.id}>
                            <td className="border-b px-1 lg:px-4 py-2 flex items-center space-x-3">
                                <Image
                                    src={avatar}
                                    alt={`${client.name} Logo`}
                                    className="w-6 h-6 rounded-full"
                                />
                                <span className="text-xs items-center">{client.name}</span>
                            </td>
                            <td className="border-y px-1 lg:px-4 py-2 text-xs text-left">
                                ${client.monthlyData[selectedMonth].revenue.toFixed(2)}
                            </td>
                            <td className="border-y px-1 lg:px-4 py-2 text-xs text-left">
                                ${client.monthlyData[selectedMonth].expenses.toFixed(2)}
                            </td>
                            <td className="border-y px-1 lg:px-4 py-2 text-xs text-left">
                                ${client.monthlyData[selectedMonth].clientAcquisitionCost.toFixed(2)}
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