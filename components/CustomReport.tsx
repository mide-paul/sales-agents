'use client'
import { useState } from "react";
import Image from "next/image";
import arrow_left from './../public/icons/arrow_left.svg';
import arrow_right from './../public/icons/arrow_right.svg';
import avatar from './../public/images/avatar.svg';
// import axios from "axios";


// Define types
type Client = {
    imageUrl: string;
    id: number;
    name: string;
    compliance: "Compliant" | "Non-compliant";
    performance: "High" | "Low";
    loadingPercentage: number; // Each partnership will have its unique loading percentage
};

const initialClients: Client[] = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Client ${i + 1}`,
    compliance: Math.random() > 0.5 ? "Compliant" : "Non-compliant", // Randomly assign compliance
    performance: Math.random() > 0.5 ? "High" : "Low", // Randomly assign performance
    loadingPercentage: Math.floor(Math.random() * 100), // Unique random loading percentage for each deal
    imageUrl: `https://ui-avatars.com/api/?name=Client+${i + 1}&background=random&size=128`, // Generate headshot
}));

const PAGE_SIZE = 10;

export default function CustomReport() {
    const [clients, setClients] = useState<Client[]>(initialClients);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filterSize, setFilterSize] = useState<string>("");
    // const [isLoading, setIsLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    //     const fetchClients = async () => {
    //       setIsLoading(true);
    //       setError(null);
    //       try {
    //         const response = await axios.get("/api/clients"); // Replace with your backend API URL
    //         setClients(response.data);
    //       } catch (err) {
    //         setError("Failed to fetch clients. Please try again.");
    //       } finally {
    //         setIsLoading(false);
    //       }
    //     };

    //     fetchClients();
    //   }, []);

    // Determine the background color based on compliance
    const getComplianceBgColor = (compliance: Client["compliance"]) => {
        switch (compliance) {
            case "Compliant":
                return "bg-green-100 text-green-700";
            case "Non-compliant":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    // Determine the background color based on compliance
    const getPerformanceBgColor = (performance: Client["performance"]) => {
        switch (performance) {
            case "High":
                return "bg-green-100 text-green-700";
            case "Low":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const filteredClients = filterSize
        ? clients.filter((client) => client.performance === filterSize)
        : clients;

    const paginatedClients = filteredClients.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const updateFilteredClients = (filterSize: string) => {
        if (filterSize) {
            setClients(initialClients.filter((client) => client.performance === filterSize));
        } else {
            setClients(initialClients); // Reset to the initial list if no filter is selected
        }
    };

    return (
        <div className="p-3 lg:p-6">
            {/* Header with total users */}
            <div className="flex justify-between mb-4">
                <h1 className="text-xs lg:text-sm font-medium">
                    Client List <span className="bg-blue-100 rounded-full text-xs p-0.5 lg:p-1 ml-2">
                        {filteredClients.length} Users</span>
                </h1>
                <select
                    className="border border-slate-300 px-1 lg:px-4 py-2 rounded-lg text-xs"
                    onChange={(e) => {
                        const selectedFilter = e.target.value;
                        setFilterSize(selectedFilter); // Update the selected filter state
                        updateFilteredClients(selectedFilter); // Update the filtered clients
                    }}
                    value={filterSize}
                >
                    <option value="">Filter by performance</option>
                    <option value="High">High</option>
                    <option value="Low">Low</option>
                </select>
            </div>

            {/* Client Table */}
            <table className="w-full border-collapse border border-gray-200">
                <thead className="bg-gray-100 text-xs text-left">
                    <tr>
                        <th className="px-1 lg:px-4 py-2 font-normal">Client Name</th>
                        <th className="px-1 lg:px-4 py-2 font-normal">Client compliance</th>
                        <th className="px-1 lg:px-4 py-2 font-normal">Sales performance</th>
                        <th className="px-1 lg:px-4 py-2 font-normal">Partnership progress</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedClients.map((client) => (
                        <tr key={client.id}>
                            <td className="border-b px-1 lg:px-4 py-2 flex flex-col lg:flex-row items-center space-x-3 text-left">
                                <Image
                                    src={avatar}
                                    alt={`${client.name} Logo`}
                                    className="w-6 h-6 rounded-full"
                                    width={6}
                                    height={6}
                                />
                                <span className="text-xs">{client.name}</span>
                            </td>
                            <td className="border-y px-1 lg:px-4 py-0">
                                <span className={`border px-2 py-0.5 rounded-2xl text-xs text-left ${getComplianceBgColor(
                                    client.compliance
                                )}`}>{client.compliance}
                                </span>
                            </td>
                            <td className="border-b px-1 lg:px-4 py-0 text-xs">
                                <span className={`border px-2 py-0.5 rounded-2xl text-xs text-left ${getPerformanceBgColor(
                                    client.performance
                                )}`}>{client.performance}
                                </span>
                            </td>
                            <td className="border-b px-1 lg:px-4 py-0">
                                <div className="relative items-center">
                                    <div className="w-14 lg:w-36 bg-gray-200 rounded-lg h-4 relative text-left">
                                        <div
                                            className="bg-blue-500 h-4 rounded-lg"
                                            style={{ width: `${client.loadingPercentage}%` }}
                                        ></div>
                                        <span
                                            className="absolute inset-0 flex items-center justify-center text-white font-medium text-xs"
                                            style={{
                                                color: client.loadingPercentage > 50 ? "white" : "black",
                                            }}
                                        >
                                            {client.loadingPercentage}%
                                        </span>
                                    </div>
                                </div>
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
                        width={4}
                        height={4}
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