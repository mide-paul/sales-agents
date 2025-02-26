"use client";
import { useState } from "react";
import Image from "next/image";
import arrow_left from './../public/icons/arrow_left.svg';
import arrow_right from './../public/icons/arrow_right.svg';

interface Lead {
    id: number;
    name: string;
    call: string;
    proposal: string;
    duration: string;
    time: number;
}

const LeadDetailsComp: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const clientsPerPage = 3; // Show 3 clients per page

    // Function to format duration in "Xm Ys"
    const formatDuration = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    // Function to format time into seconds, minutes, hours, or days
    const formatTime = (timeInSeconds: number): string => {
        if (timeInSeconds < 60) {
            return `${timeInSeconds}s`; // Seconds
        } else if (timeInSeconds < 3600) {
            return `${Math.floor(timeInSeconds / 60)}m`; // Minutes
        } else if (timeInSeconds < 86400) {
            return `${Math.floor(timeInSeconds / 3600)}h`; // Hours
        } else {
            return `${Math.floor(timeInSeconds / 86400)}d`; // Days
        }
    };

    // Generate dynamic ads with current dates and duration
    const leads: Lead[] = Array.from({ length: 30 }, (_, i) => {
        const durationInSeconds = Math.floor(Math.random() * 3600); // Random duration up to 1 hour
        const timeInSeconds = Math.floor(Math.random() * 100000); // Random time

        return {
            id: i + 1,
            name: `olive@gmail.com`,
            call: 'Olive Rhye',
            proposal: "--",
            duration: formatDuration(durationInSeconds),
            time: timeInSeconds,
        };
    });

    const totalPages = Math.ceil(leads.length / clientsPerPage);

    // Pagination logic
    const paginatedClients = leads.slice(
        (currentPage - 1) * clientsPerPage,
        currentPage * clientsPerPage
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="p-6">
            {/* Lead Table */}
            <table className="min-w-full bg-white border rounded">
                <thead>
                    <tr className="bg-gray-100 text-gray-600 text-left text-xs font-normal">
                        <th className="p-2 py-2">Email</th>
                        <th className="p-2 py-2">Call</th>
                        <th className="p-2 py-2">Proposal</th>
                        <th className="p-2 py-2">Duration</th>
                        <th className="p-2 py-2">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedClients.map((lead) => (
                        <tr key={lead.id} className="border-b hover:bg-gray-50">
                            <td className="p-2 py-4 font-normal flex gap-3 items-center text-xs">
                                {lead.name}
                            </td>
                            <td className="px-2 py-4 font-normal text-xs">{lead.call}</td>
                            <td className="p-2 py-4 font-normal flex text-xs">
                                {lead.proposal}
                            </td>
                            <td className="p-2 py-4 font-normal text-xs text-black">
                                {lead.duration}
                            </td>
                            <td className="p-2 py-4 font-normal text-xs text-black">{formatTime(lead.time)}</td>
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
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className={`px-5 py-1 pl-7 rounded-md text-xs border border-blue-950 ${currentPage === 1
                            ? "bg-white text-gray-500 cursor-not-allowed"
                            : "bg-white text-blue-950 hover:bg-gray-100"
                            }`}
                    >
                        Previous
                    </button>
                </div>
                <span className="text-gray-700 text-xs">
                    Page {currentPage} of {totalPages}
                </span>
                <div className="flex items-center">
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-1 pr-6 rounded-md text-xs border border-blue-950 ${currentPage === totalPages
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-white text-blue-950 hover:bg-gray-100"
                            }`}
                    >
                        Next
                    </button>
                    <Image
                        src={arrow_right}
                        alt=""
                        className="absolute w-4 h-4 ml-11 object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default LeadDetailsComp;