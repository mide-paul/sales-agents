'use client';

import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";

interface LeadOption {
    id: number;
    name: string;
}

const AddNewLead = () => {
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        company: '',
        companySize: '',
        leadType: '',
        email: '',
        phone: '',
        sourceID: '',
        stageID: '',
        status: 'open',
        assignedTo: '',
        notes: '',
    });

    const [leadSources, setLeadSources] = useState<LeadOption[]>([]);
    const [leadStages, setLeadStages] = useState<LeadOption[]>([]);
    const [assignedTo, setAssignedTo] = useState<LeadOption[]>([]);
    const [emailError, setEmailError] = useState("");

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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

    // Fetch Lead Stages
    const fetchAssignedTo = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/sales-agents");
            setAssignedTo(response.data);
        } catch (error) {
            console.error("Failed to fetch lead stages:", error);
        }
    };

    useEffect(() => {
        fetchLeadSources();
        fetchLeadStages();
        fetchAssignedTo();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddLead = async (e: React.FormEvent) => {
        e.preventDefault();

        // Ensure companySize is a valid number
        const validatedFormData = {
            ...formData,
            companySize: Number(formData.companySize), // Convert to number
        };

        console.log("Submitting Lead:", validatedFormData);

        // Validate email before submission
        if (!validateEmail(validatedFormData.email)) {
            setEmailError("Please provide a valid email address");
            return;
        }

        try {
            if (typeof window === "undefined") {
                throw new Error("Client-side only logic. `window` is not available.");
            }

            const token = localStorage.getItem("token");
            if (!token) {
                alert("Authentication required. Please log in again.");
                return;
            }

            const response = await fetch('https://api.hosoptima.com/api/v1/crm/leads/new', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(validatedFormData),
            });

            if (response.ok) {
                alert('Lead created successfully');
                // Reset form or do additional handling
            } else {
                const errorData = await response.json();
                alert('Error creating lead: ' + errorData.message);
            }
            setShowAddModal(false);
        } catch (error: unknown) {
            // Type assertion to narrow the error type to an instance of Error
            if (error instanceof Error) {
                alert('Error creating lead: ' + error.message);
            } else {
                alert('An unknown error occurred');
            }
        }
    };

    return (
        <div>
            <button
                onClick={() => setShowAddModal(true)}
                className="px-2 lg:px-2 py-2 text-xs bg-white text-blue-950 border border-blue-950 rounded-md hover:bg-gray-100"
            >
                + Add New Lead
            </button>
            {/* Add New Lead Modal */}
            {showAddModal && (
                <div className="fixed inset-0 lg:mt-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-scroll z-30">
                    <div className="bg-white p-6 mt-20 rounded-lg shadow-lg max-w-lg w-96">
                        <h2 className="text-sm font-semibold mb-4">Add New Lead</h2>
                        <form onSubmit={handleAddLead} className="space-y-3">
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="First Name"
                                className="w-full border rounded-md p-2 text-xs"
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Last Name"
                                className="w-full border rounded-md p-2 text-xs  mt-2"
                                required
                            />
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                placeholder="Company Name (optional)"
                                className="w-full border rounded-md p-2 text-xs  mt-2"
                                required
                            />
                            <input
                                type="number"
                                name="companySize"
                                value={formData.companySize} // Ensure it remains a string
                                onChange={(e) => setFormData({ ...formData, companySize: e.target.value })} // Store as string
                                placeholder="Company Size (optional)"
                                className="w-full border rounded-md p-2 text-xs  mt-2"
                                required
                            />
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Phone Number"
                                className="w-full border rounded-md p-2 text-xs  mt-2"
                            />
                            <select
                                name="leadType"
                                value={formData.leadType}
                                onChange={handleInputChange}
                                required
                                className="w-full border rounded-md p-2 text-xs  mt-2">
                                <option value="">Lead Type</option>
                                <option value="individual">Individual</option>
                                <option value="company">Company</option>
                            </select>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                className={`w-full border rounded-md p-2 text-xs  mt-2 ${emailError ? "border-red-500" : ""}`}
                                required
                            />
                            {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
                            <select
                                name="sourceID"
                                value={formData.sourceID}
                                onChange={handleInputChange}
                                className="w-full border rounded-md p-2 text-xs mt-2"
                                required
                            >
                                <option value="">Select Lead Source</option>
                                {leadSources.map((source) => (
                                    <option key={source.id} value={source.id}>
                                        {source.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                name="stageID"
                                value={formData.stageID}
                                onChange={handleInputChange}
                                className="w-full border rounded-md p-2 text-xs mt-2"
                                required
                            >
                                <option value="">Select Lead Stage</option>
                                {leadStages.map((stage) => (
                                    <option key={stage.id} value={stage.id}>
                                        {stage.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                required
                                className="w-full border rounded-md p-2 text-xs mt-2">
                                <option value="">Lead Status</option>
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                            </select>
                            <select
                                name="assignedTo"
                                value={formData.assignedTo}
                                onChange={handleInputChange}
                                required
                                className="w-full border rounded-md p-2 text-xs mt-2">
                                <option value="">Assign Lead</option>
                                {assignedTo.map((assign) => (
                                    <option key={assign.id} value={assign.id}>
                                        {assign.name}
                                    </option>
                                ))}
                            </select>
                            <textarea
                                name="notes"
                                placeholder="Notes"
                                value={formData.notes} // Assuming "notes" would map to some field
                                onChange={handleInputChange}
                                className="w-full border rounded-md p-2 text-xs mt-2 resize-none"
                            ></textarea>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-md text-xs"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-950 text-white rounded-md text-xs hover:bg-blue-900"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddNewLead