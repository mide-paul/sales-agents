'use client';
import { useState } from "react";
import Image from "next/image";
import arrow_left from './../public/icons/arrow_left.svg';
import arrow_right from './../public/icons/arrow_right.svg';

type RowData = {
    id: number;
    adname: string;
    adlead: string;
    companyname: string;
    industry: string;
    amount: string;
};

export default function Advertisers() {
    const [filter, setFilter] = useState({
        industry: "",
    });

    // Constants
    const clientsPerPage = 10; // Show 10 clients per page

    // Mock data
    const mockData: RowData[] = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        adname: "Wealth management service",
        adlead: "Lana Steiner",
        companyname: ["Claritas Wealth Advisors", "Beulah and Steve Ltd", "Roger's Commission",][i % 3],
        industry: ["Financial service", "Logistics service"][i % 2],
        amount: `$${(Math.random() * 1000).toFixed(2)}`,
    }));

    // State for the current page
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

    // Filtered clients based on selected filters
    const filteredClients = mockData.filter((client) => {
        return (
            (filter.industry ? client.industry === filter.industry : true)
        );
    });

    const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

    // Pagination logic
    const paginatedClients = filteredClients.slice(
        (currentPage - 1) * clientsPerPage,
        currentPage * clientsPerPage
    );

    // Handlers for page navigation
    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>, field: string) => {
        setFilter({ ...filter, [field]: e.target.value });
    };

    return (
        <div className="p-3 lg:p-6 pl-2 lg:pl-7">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xs lg:text-sm font-medium">
                    Advertisers List <span className="bg-blue-100 rounded-full text-xs p-0.5 lg:p-1 ml-2">
                        {filteredClients.length} Users</span>
                </h1>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowFilterModal(true)}
                        className="px-2 py-2 text-xs bg-white text-gray-700 border border-gray-300 rounded-md"
                    >
                        Filters
                    </button>
                </div>
            </div>
            <div>
                <table className="table-auto w-full lg:w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-xs text-left">
                            <th className="px-1 lg:px-4 py-2 border-gray-200">Ad name</th>
                            <th className="px-1 lg:px-4 py-2 border-gray-200">Ad lead</th>
                            <th className="px-1 lg:px-4 py-2 border-gray-200">Company name</th>
                            <th className="px-1 lg:px-4 py-2 border-gray-200">Industry</th>
                            <th className="px-1 lg:px-4 py-2 border-gray-200">Ad spend</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedClients.map((row) => (
                            <tr key={row.id} className="text-center border">
                                <td className="px-1 lg:px-4 py-3 border-gray-200 text-xs text-left">{row.adname}</td>
                                <td className="px-1 lg:px-4 py-3 border-gray-200 text-xs text-left">{row.adlead}</td>
                                <td className="px-1 lg:px-4 py-3 border-gray-200 text-xs text-left">{row.companyname}</td>
                                <td className="px-1 lg:px-4 py-3 border-gray-200 text-xs text-left">{row.industry}</td>
                                <td className="px-1 lg:px-4 py-3 border-gray-200 text-xs text-left">{row.amount}</td>
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

            {/* Filter Modal */}
            {showFilterModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xs font-semibold mb-4">Filter Ads</h2>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="industry" className="block text-xs font-medium text-gray-700">
                                    Industry
                                </label>
                                <select
                                    id="companysize"
                                    value={filter.industry}
                                    onChange={(e) => handleFilterChange(e, "industry")}
                                    className="w-full border rounded-md p-2 mt-4 text-xs"
                                >
                                    <option value="">All</option>
                                    <option value="Financial service">Financial service</option>
                                    <option value="Logistics service">Logistics service</option>
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowFilterModal(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-md text-xs"
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}