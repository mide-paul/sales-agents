'use client'
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import edit_icon from './../public/icons/edit_icon.svg';
// import axios from "axios";

// Define types
type Client = {
    id: number;
    adpackage: string;
    pricing: string;
    duration: string;
    availableslot: "Financial service" | "Logistics service";
};

// Constants
const rowsPerPage = 3; // Number of rows per page
const totalPages = 1; // Total number of pages

const initialClients: Client[] = Array.from({ length: rowsPerPage * totalPages }, (_, i) => ({
    id: i + 1,
    adpackage: ["Market place Ads", "Leaderboard Ads", "HOS Assessment Sponsorship"][i % 3],
    pricing: "$5,000",
    duration: "3 months",
    availableslot: ["Financial service", "Logistics service"][i % 2] as Client["availableslot"],
}));

export default function Adpackagetable() {
    const [clients, setClients] = useState<Client[]>(initialClients);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editableClient, setEditableClient] = useState<Client | null>(null);

    const handleEditClick = (client: Client) => {
        setEditableClient(client);
        setIsModalOpen(true);
    };

    const handleUpdateClient = () => {
        if (editableClient) {
            setClients((prev) =>
                prev.map((client) =>
                    client.id === editableClient.id ? editableClient : client
                )
            );
        }
        setIsModalOpen(false);
    };

    return (
        <div className="p-0 lg:p-6">

            {/* Client Table */}
            <table className="w-full lg:w-full border-collapse border border-gray-200">
                <thead className="bg-gray-100 text-xs text-left">
                    <tr>
                        <th className="px-1 lg:px-4 py-2 font-normal">Ad package</th>
                        <th className="px-1 lg:px-4 py-2 font-normal">Pricing</th>
                        <th className="px-1 lg:px-4 py-2 font-normal">Duration</th>
                        <th className="px-4 py-2 font-normal">Available slot</th>
                        <th className="px-1 lg:px-4 py-2 font-normal">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client.id}>
                            <td className="border-b px-1 py-5 lg:px-4 lg:py-3 flex flex-col lg:flex-row items-center space-x-3">
                                <span className="text-xs">{client.adpackage}</span>
                            </td>
                            <td className="border-y px-1 lg:px-4 py-2">
                                <span className="text-xs">
                                    {client.pricing}
                                </span>
                            </td>
                            <td className="border-b px-1 lg:px-4 py-2">
                                <div className="relative flex flex-col lg:flex-row gap-6 items-center">
                                    <div className="text-xs text-left text-gray-700 mb-1">
                                        {client.duration}
                                    </div>
                                </div>
                            </td>
                            <td className="border-b px-4 py-2 text-xs">{client.availableslot}</td>
                            <td className="border-b px-1 lg:px-4 py-2">
                                <button
                                    className="text-blue-500 hover:underline"
                                    onClick={() => handleEditClick(client)}
                                >
                                    <Image
                                        src={edit_icon}
                                        alt=""
                                        className="w-4 h-4 ml-3 object-cover"
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Modal */}
            {isModalOpen && editableClient && (
                <Dialog
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    className="fixed z-30 inset-0 flex items-center justify-center bg-black bg-opacity-50"
                >
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-sm font-bold mb-4">Edit Package</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                className="w-full border px-4 py-2 rounded text-sm"
                                value={editableClient.adpackage}
                                onChange={(e) =>
                                    setEditableClient({ ...editableClient, adpackage: e.target.value })
                                }
                                placeholder="Client Name"
                            />
                            <select
                                className="w-full border px-4 py-2 rounded text-sm"
                                value={editableClient.pricing}
                                onChange={(e) =>
                                    setEditableClient({
                                        ...editableClient,
                                        pricing: e.target.value as Client["pricing"],
                                    })
                                }
                            >
                                <option value="Pricing">Pricing</option>
                                <option value="$5000">$5,000</option>
                                <option value="$10,000">$10,000</option>
                            </select>
                            <input
                                type="date"
                                className="w-full border px-4 py-2 rounded text-sm"
                                value={editableClient.duration}
                                onChange={(e) =>
                                    setEditableClient({
                                        ...editableClient,
                                        duration: e.target.value,
                                    })
                                }
                            />
                            <select
                                className="w-full border px-4 py-2 rounded text-sm"
                                value={editableClient.availableslot}
                                onChange={(e) =>
                                    setEditableClient({
                                        ...editableClient,
                                        availableslot: e.target.value as Client["availableslot"],
                                    })
                                }
                            >
                                <option value="Financial service">Financial service</option>
                                <option value="Logistics service">Logistics service</option>
                            </select>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded text-sm"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded text-sm"
                                onClick={handleUpdateClient}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </Dialog>
            )}
        </div>
    );
}