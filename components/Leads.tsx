'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import linkedin from './../public/icons/linkedin.svg';
import avatar from './../public/images/avatar.svg';
import action from './../public/icons/action.svg';
import arrow_left from './../public/icons/arrow_left.svg';
import arrow_right from './../public/icons/arrow_right.svg';
import AddNewLead from "@/modals/AddNewLead";

interface Lead {
    id: number;
    firstName: string;
    lastName: string;
    company: string;
    companySize: number;
    source: string | { id: number; name: string }; 
    stage: string | { id: number; name: string };
    status: string;
    image: string; // Image URL for the lead
    type: string;
    leadType: string;
    assign: string;
    assignedTo: string;
    notes: string;
}

interface LeadOption {
    id: number;
    name: string;
}

interface LeadApiResponse {
    data: Lead[];
    count: number;
}

const LeadsTable: React.FC = () => {

    // integrate endpoints
    const [leads, setLeads] = useState<Lead[]>([]);
    const [leadSources, setLeadSources] = useState<LeadOption[]>([]);
    const [leadStages, setLeadStages] = useState<LeadOption[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalLeads, setTotalLeads] = useState<number>(0);
    const [leadsPerPage] = useState<number>(10);
    const [filter, setFilter] = useState({
        leadType: "",
        sourceID: "",
        stageID: "",
        status: "",
    });

    const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
    const [showActionModal, setShowActionModal] = useState<boolean>(false);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [loading] = useState<boolean>(false);

    const fetchLeads = async () => {
        try {
            const token = "your_auth_token_here";
            const response = await axios.get<LeadApiResponse>("https://api.hosoptima.com/api/v1/crm/leads", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLeads(response.data.data);
            setTotalLeads(response.data.count);
        } catch (error) {
            console.error("Failed to fetch leads:", error);
        }
    };

    // Fetch Lead Sources
    const fetchLeadSources = async () => {
        try {
            const response = await axios.get("https://api.hosoptima.com/api/v1/crm-lead-source");
            setLeadSources(response.data);
        } catch (error) {
            console.error("Failed to fetch lead sources:", error);
        }
    };

    // Fetch Lead Stages
    const fetchLeadStages = async () => {
        try {
            const response = await axios.get("https://api.hosoptima.com/api/v1/crm-lead-stage");
            setLeadStages(response.data);
        } catch (error) {
            console.error("Failed to fetch lead stages:", error);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, [currentPage, filter]);

    useEffect(() => {
        fetchLeadSources();
        fetchLeadStages();
    }, []);

    // status bgcolor
    const getStatusBgColor = (dealStage: Lead["status"]) => {
        switch (dealStage) {
            case "Open":
                return "bg-green-100 text-green-700";
            case "Closed":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    // Filtered leads based on selected filters
    const filteredLeads = Array.isArray(leads) ? leads.filter((lead) => {
        return (
            (filter.leadType ? lead.type === filter.leadType : true) &&
            (filter.sourceID ? lead.source === filter.sourceID : true) &&
            (filter.status ? lead.status === filter.status : true)
        );
    }) : []; // Safe fallback

    const paginatedLeads = filteredLeads.slice(
        (currentPage - 1) * leadsPerPage,
        currentPage * leadsPerPage
    );

    const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

    const handleNextPage = () => {
        if (currentPage * leadsPerPage < totalLeads) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>, field: string) => {
        setFilter({ ...filter, [field]: e.target.value });
    };

    const handleActionModalClose = () => {
        setShowActionModal(false);
        setSelectedLead(null);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xs lg:text-sm font-medium">
                    Lead List <span className="bg-blue-100 rounded-full text-xs p-0.5 lg:p-1 ml-2">
                        {filteredLeads.length} Users</span>
                </h1>
                <div className="flex items-center gap-4">
                    <AddNewLead />
                    <button
                        onClick={() => setShowFilterModal(true)}
                        className="px-2 py-2 text-xs bg-white text-gray-700 border border-gray-300 rounded-md"
                    >
                        Filters
                    </button>
                </div>
            </div>

            {/* Lead Table */}
            <table className="min-w-[200px] lg:min-w-full bg-white border">
                <thead>
                    <tr className="bg-gray-100 text-left text-xs">
                        <th className="p-2">Lead Name</th>
                        <th className="p-2">Company</th>
                        <th className="p-2">Lead Source</th>
                        <th className="p-2">Stage</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={6} className="text-center p-4">Loading...</td>
                        </tr>
                    ) : (
                        paginatedLeads.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center p-4 text-sm">No leads available</td>
                            </tr>
                        ) : (
                            paginatedLeads.map((lead) => (
                                <tr key={lead.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 flex gap-3 items-center text-xs">
                                        <Image
                                            src={avatar}
                                            alt={"source logo"}
                                            className="w-6 h-6 rounded-full mr-0"
                                        />
                                        {lead.firstName} {lead.lastName}
                                    </td>
                                    <td className="p-2 text-xs">{lead.company}</td>
                                    <td className="p-4 flex gap-3 text-xs">
                                        <span>
                                            <Image
                                                src={linkedin}
                                                alt={"source logo"}
                                                className="w-6 h-6 rounded-full mr-0"
                                            />
                                        </span>
                                        {/* Ensure you are accessing the name property if source is an object */}
                                        {typeof lead.source === "object" && lead.source !== null
                                            ? lead.source.name
                                            : lead.source || "N/A"}
                                    </td>
                                    <td className="p-2 text-xs">
                                    {typeof lead.stage === "object" && lead.stage !== null
                                            ? lead.stage.name
                                            : lead.stage || "N/A"}
                                    </td>
                                    <td
                                        className={`p-2 font-medium text-xs ${lead.status === "Open" ? "text-green-600" : "text-red-600"}`}
                                    >
                                        <span className={`px-2 py-0.5 rounded-2xl text-xs ${getStatusBgColor(lead.status)}`}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="p-2 text-sm">
                                        <button
                                            onClick={() => {
                                                setSelectedLead(lead);
                                                setShowActionModal(true);
                                            }}
                                            className="text-blue-500 hover:underline text-sm"
                                        >
                                            <Image
                                                src={action}
                                                alt={""}
                                                className="w-6 h-6 ml-6"
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )
                    )}
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
                        className={`px-4 py-2 pl-8 rounded-md text-xs border border-blue-950 ${currentPage === 1
                            ? "bg-white text-gray-500 cursor-not-allowed"
                            : "bg-white text-blue-950"
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
                        className={`px-4 py-2 pr-8 rounded-md text-xs border border-blue-950 ${currentPage === totalPages
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-white text-blue-950"
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
                                <label htmlFor="type" className="block text-xs font-medium text-gray-700">
                                    Lead Type
                                </label>
                                <select
                                    id="type"
                                    value={filter.leadType}
                                    onChange={(e) => handleFilterChange(e, "type")}
                                    className="w-full border rounded-md p-2 text-xs"
                                >
                                    <option value="">All</option>
                                    <option value="individual">Single driver</option>
                                    <option value="company">Enterprise</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="source" className="block text-xs font-medium text-gray-700">
                                    Lead Source
                                </label>
                                <select
                                    id="source"
                                    value={filter.sourceID}
                                    onChange={(e) => handleFilterChange(e, "source")}
                                    className="w-full border rounded-md p-2 text-xs"
                                >
                                    <option value="">All</option>
                                    {leadSources.map((source) => (
                                        <option key={source.id} value={source.name}>
                                            {source.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="status" className="block text-xs font-medium text-gray-700">
                                    Lead Status
                                </label>
                                <select
                                    id="status"
                                    value={filter.status}
                                    onChange={(e) => handleFilterChange(e, "status")}
                                    className="w-full border rounded-md p-2 text-xs"
                                >
                                    <option value="">All</option>
                                    {leadStages.map((status) => (
                                        <option key={status.id} value={status.name}>
                                            {status.name}
                                        </option>
                                    ))}
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

            {/* Action Modal */}
            {showActionModal && selectedLead && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xs font-semibold mb-4">Lead Actions</h2>
                        <p className="mb-4 text-xs">What would you like to do with {selectedLead.firstName}?</p>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/lead-details"><button className="text-blue-500 hover:underline text-xs">View Lead Details</button></Link>
                            </li>
                            <li>
                                <button className="text-blue-500 hover:underline text-xs">Send Email</button>
                            </li>
                            <li>
                                <button className="text-blue-500 hover:underline text-xs">Schedule Meeting</button>
                            </li>
                        </ul>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={handleActionModalClose}
                                className="px-4 py-2 bg-gray-300 rounded-md text-xs"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeadsTable;