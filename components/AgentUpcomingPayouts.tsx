'use client';
import { useState } from "react";
import Image from "next/image";
import arrow_left from './../public/icons/arrow_left.svg';
import arrow_right from './../public/icons/arrow_right.svg';

type RowData = {
    id: number;
    amount: string;
    payoutDate: string;
    earningType: string;
    status: "Paid" | "Pending";
};

export default function AgentUpcomingPayouts() {
    // Constants
    const rowsPerPage = 10; // Number of rows per page
    const totalPages = 10; // Total number of pages

    // Mock data
    const mockData: RowData[] = Array.from({ length: rowsPerPage * totalPages }, (_, i) => ({
        id: i + 1,
        amount: `$${(Math.random() * 1000).toFixed(2)}`,
        payoutDate: new Date(Date.now() - i * 100000000).toLocaleDateString(),
        earningType: ["Ad sales", "Bonus", "Commission", "Other"][i % 4],
        status: i % 2 === 0 ? "Paid" : "Pending",
    }));

    // State for the current page
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Calculate the start and end index of the current page
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentData = mockData.slice(startIndex, endIndex);

    // Handlers for page navigation
    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    return (
        <div className="p-3 lg:p-6 pl-2 lg:pl-7">
            <div>
                <table className="table-auto w-full lg:w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-xs text-left">
                            <th className="px-1 lg:px-4 py-2 border border-gray-200">ID</th>
                            <th className="px-1 lg:px-4 py-2 border border-gray-200">Amount</th>
                            <th className="px-1 lg:px-4 py-2 border border-gray-200">Payout Date</th>
                            <th className="px-1 lg:px-4 py-2 border border-gray-200">Earning Type</th>
                            <th className="px-1 lg:px-4 py-2 border border-gray-200">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((row) => (
                            <tr key={row.id} className="text-center odd:bg-white even:bg-gray-50">
                                <td className="px-1 lg:px-4 py-2 border border-gray-200 text-xs text-left">{row.id}</td>
                                <td className="px-1 lg:px-4 py-2 border border-gray-200 text-xs text-left">{row.amount}</td>
                                <td className="px-1 lg:px-4 py-2 border border-gray-200 text-xs text-left">{row.payoutDate}</td>
                                <td className="px-1 lg:px-4 py-2 border border-gray-200 text-xs text-left">{row.earningType}</td>
                                <td
                                    className="px-1 lg:px-4 py-2 border border-gray-200 text-xs text-left"
                                >
                                    <span className={`${row.status === "Paid" ? "text-green-600 bg-green-100 px-2 py-0.5 rounded-full" : "text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full"
                                        }`}>
                                        {row.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                    <Image
                        src={arrow_left}
                        alt=""
                        className="absolute w-4 h-4 ml-3 object-cover"
                    />
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 pl-8 text-sm bg-white text-blue-900 shadow rounded ${currentPage === 1 && "opacity-50 cursor-not-allowed"
                            }`}
                    >
                        Previous
                    </button>
                </div>
                <span className="text-gray-700 text-xs">
                    Page {currentPage} of {totalPages}
                </span>
                <div className="flex items-center pr-0">
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 pr-8 text-sm bg-white text-blue-900 shadow rounded ${currentPage === totalPages && "opacity-50 cursor-not-allowed"
                            }`}
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