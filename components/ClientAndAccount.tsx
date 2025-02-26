'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import avatar from './../public/images/avatar.svg';
import arrow_left from './../public/icons/arrow_left.svg';
import arrow_right from './../public/icons/arrow_right.svg';

interface Client {
    id: number;
    name: string;
    companysize: string;
    lastcontact: string;
    training: string;
    image: string; // Image URL for the client
}

const ClientsAndAccountsTable: React.FC = () => {
    const [filter, setFilter] = useState({
        companysize: "",
        lastcontact: "",
    });

    // Increased number of clients to 100
    const clients: Client[] = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `Client ${i + 1}`,
        companysize: i % 2 === 0 ? "30" : "50",
        lastcontact: i % 2 === 0 ? "25-01-2025" : "28-01-2025",
        training: i % 2 === 0 ? "Completed" : "In progress",
        image: "https://via.placeholder.com/50",
    }));

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

    const clientsPerPage = 10; // Show 10 clients per page
    // const totalClients = clients.length;

    const getStatusBgColor = (training: Client["training"]) => {
        switch (training) {
            case "Completed":
                return "bg-green-100 text-green-700";
            case "In progress":
                return "bg-orange-100 text-orange-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    // Filtered clients based on selected filters
    const filteredClients = clients.filter((client) => {
        return (
            (filter.companysize ? client.companysize === filter.companysize : true) &&
            (filter.lastcontact ? client.lastcontact === filter.lastcontact : true)
        );
    });

    const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

    // Pagination logic
    const paginatedClients = filteredClients.slice(
        (currentPage - 1) * clientsPerPage,
        currentPage * clientsPerPage
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>, field: string) => {
        setFilter({ ...filter, [field]: e.target.value });
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xs lg:text-sm font-medium">
                    Client List <span className="bg-blue-100 rounded-full text-xs p-0.5 lg:p-1 ml-2">
                        {filteredClients.length} Users</span>
                </h1>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowFilterModal(true)}
                        className="px-2 py-1 text-xs bg-white text-gray-700 border border-gray-300 rounded-md"
                    >
                        Filters
                    </button>
                </div>
            </div>

            {/* Lead Table */}
            <table className="min-w-full bg-white border">
                <thead>
                    <tr className="bg-gray-100 text-left text-xs">
                        <th className="p-2">Client Name</th>
                        <th className="p-2">Company size</th>
                        <th className="p-2">Last contact date</th>
                        <th className="p-2">Training completion</th>
                        <th className="p-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedClients.map((client) => (
                        <tr key={client.id} className="border-b hover:bg-gray-50">
                            <td className="px-2 py-3 flex gap-3 items-center text-xs">
                                <Image
                                    src={avatar}
                                    alt={"source logo"}
                                    className="w-6 h-6 rounded-full mr-0"
                                />
                                {client.name}
                            </td>
                            <td className="px-2 text-xs">{client.companysize}</td>
                            <td className="px-2 py-1 flex text-xs">
                                {client.lastcontact}
                            </td>
                            <td
                                className={`p-2 font-medium text-xs ${client.training === "Open" ? "text-green-600" : "text-red-600"
                                    }`}
                            >
                                <span className={` px-2 py-0.5 rounded-2xl text-xs ${getStatusBgColor(
                                    client.training
                                )}`}>
                                    {client.training}
                                </span>
                            </td>
                            <td className="px-1 py-2 text-sm">
                                <Link href="/client-details"><button
                                    className="text-blue-500 hover:underline text-xs"
                                >
                                    View details
                                </button></Link>
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
                        className="absolute w-4 h-4 ml-2 object-cover"
                    />
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-1 pl-7 rounded-md text-xs border border-blue-950 ${currentPage === 1
                            ? "bg-white text-gray-500 cursor-not-allowed"
                            : "bg-white text-blue-950 hover:bg-blue-700"
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
                        className={`px-4 py-1 pr-7 rounded-md text-xs border border-blue-950 ${currentPage === totalPages
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-white text-blue-950 hover:bg-blue-700"
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
                        <h2 className="text-xs font-semibold mb-4">Filter Leads</h2>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="companysize" className="block text-xs font-medium text-gray-700">
                                    Company size
                                </label>
                                <select
                                    id="companysize"
                                    value={filter.companysize}
                                    onChange={(e) => handleFilterChange(e, "companysize")}
                                    className="w-full border rounded-md p-2 text-xs"
                                >
                                    <option value="">All</option>
                                    <option value="30">30</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="lastcontact" className="block text-xs font-medium text-gray-700">
                                    Last contact date
                                </label>
                                <select
                                    id="lastcontact"
                                    value={filter.lastcontact}
                                    onChange={(e) => handleFilterChange(e, "lastcontact")}
                                    className="w-full border rounded-md p-2 text-xs"
                                >
                                    <option value="">All</option>
                                    <option value="25-01-2025">25-01-2025</option>
                                    <option value="28-01-2025">28-01-2025</option>
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
};

export default ClientsAndAccountsTable;