'use client';
import React, { useState } from 'react';
import Image from "next/image";
import Sidebar from '@/components/Sidebar';
import { Header } from '@/components/header';
import client_details_frame from '../../public/images/client_details_frame.svg';
import AgentClients from '@/components/agent-clients';
import AgentEarnings from '@/components/AgentEarnings';

const AgentDetails = () => {
    const [currentView, setCurrentView] = useState('AgentClients');
    const [agent, setAgent] = useState({
        name: "Orlando Diggs",
        email: "orlando@gmail.com",
        status: "Active",
        dateJoined: "23-01-2025",
        accountName: "Orlando Diggs",
        accountNumber: "9078567809",
        bank: "Wells Fargo Bank"
    });
    const [isDeleted, setIsDeleted] = useState(false);

    const toggleBlockAgent = () => {
        setAgent((prev) => ({
            ...prev,
            status: prev.status === "Active" ? "Blocked" : "Active"
        }));
    };

    const deleteAgent = () => {
        setIsDeleted(true);
    };

    if (isDeleted) {
        return <div className="text-center text-red-600 font-semibold mt-10">Agent has been deleted.</div>;
    }

    // const API_BASE_URL = "https://your-api.com/api"; // Replace with actual API URL

    // const updateAgentStatus = async (agentId: number, status: "Active" | "Blocked") => {
    //     try {
    //         const response = await fetch(`${API_BASE_URL}/agents/${agentId}/status`, {
    //             method: "PATCH",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
    //             },
    //             body: JSON.stringify({ status }),
    //         });

    //         if (!response.ok) throw new Error("Failed to update agent status");

    //         return await response.json();
    //     } catch (error) {
    //         console.error("Error updating agent status:", error);
    //     }
    // };

    // const deleteAgent = async (agentId: number) => {
    //     try {
    //         const response = await fetch(`${API_BASE_URL}/agents/${agentId}`, {
    //             method: "DELETE",
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
    //             },
    //         });

    //         if (!response.ok) throw new Error("Failed to delete agent");

    //         return await response.json();
    //     } catch (error) {
    //         console.error("Error deleting agent:", error);
    //     }
    // };

    return (
        <div className="bg-gray-100 min-h-[840px]">
            <div className="pr-10">
                <Sidebar />
            </div>
            <div className="pb-10">
                <Header />
            </div>
            <div className="flex flex-col">
                <div>
                    <div className="w-screen h-full lg:min-h-[730px] lg:max-w-5xl bg-white pt-0 pb-1 pr-0 mr-8 mt-8 lg:mt-14 md:ml-64 lg:ml-72 2xl:w-max-w-7xl rounded">
                        <div>
                            <Image src={client_details_frame} alt="frame" className="w-full h-28 mr-0" />
                            <div className='absolute -mt-16 ml-9 w-32 h-32 bg-gray-400 border-4 border-white rounded-md shadow-md'></div>
                            <div className='flex gap-96'>
                                <div className='flex lg:flex-col gap-1 ml-44 mt-3'>
                                    <h3 className='text-blue-950 text-normal text-xs font-bold'>{agent.name}</h3>
                                    <h3 className='text-black text-normal text-sm font-normal'>{agent.email}</h3>
                                </div>
                                <div>
                                    <button onClick={toggleBlockAgent} className='relative h-8 w-32 ml-6 mt-5 text-xs font-semibold text-blue-950 bg-white border border-blue-950 rounded cursor-pointer z-10'>
                                        {agent.status === "Active" ? "Block Agent" : "Unblock Agent"}
                                    </button>
                                    <button onClick={deleteAgent} className='relative h-8 w-32 ml-6 mt-5 text-xs font-semibold text-red-600 bg-white border border-red-600 rounded cursor-pointer z-10'>
                                        Delete Agent
                                    </button>
                                    {/* <button
                                        onClick={async () => {
                                            await updateAgentStatus(1, "Blocked"); // Replace 1 with agent's ID
                                        }}
                                        className="h-8 w-32 ml-6 mt-5 text-xs font-semibold text-blue-950 bg-white border border-blue-950 rounded cursor-pointer"
                                    >
                                        Block Agent
                                    </button>

                                    <button
                                        onClick={async () => {
                                            await deleteAgent(1); // Replace 1 with agent's ID
                                        }}
                                        className="h-8 w-32 ml-6 mt-5 text-xs font-semibold text-red-600 bg-white border border-red-600 rounded cursor-pointer"
                                    >
                                        Delete Agent
                                    </button> */}
                                </div>
                            </div>
                            <div className='relative flex lg:gap-28 ml-9 mt-8 z-10'>
                                <div className='flex flex-row gap-28'>
                                    <div className='flex flex-col gap-1'>
                                        <label className='text-gray-400 font-normal text-xs'>Account status</label>
                                        <h3 className={`font-semibold text-xs p-0.5 w-12 rounded-full ${agent.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                            {agent.status}
                                        </h3>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label className='text-gray-400 font-normal text-xs'>Date joined</label>
                                        <h3 className='text-black font-semibold text-xs'>{agent.dateJoined}</h3>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label className='text-gray-400 font-normal text-xs'>Account name</label>
                                        <h3 className='text-black font-semibold text-xs'>{agent.accountName}</h3>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label className='text-gray-400 font-normal text-xs'>Account number</label>
                                        <h3 className='text-black font-semibold text-xs'>{agent.accountNumber}</h3>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label className='text-gray-400 font-normal text-xs'>Bank</label>
                                        <h3 className='text-black font-semibold text-xs'>{agent.bank}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div>
                                <div className="pt-1 pb-1 pr-5 mr-8 mt-5 lg:mt-5 md:ml-64 lg:ml-5 2xl:w-max-w-7xl rounded">
                                    <div className="flex gap-6 mt-4 ml-4">
                                        <h3 className={`font-normal text-xs mt-5 ml-6 lg:ml-7 ${currentView === 'AgentClients' ? 'text-blue-950 font-semibold' : 'text-gray-500'}`} onClick={() => setCurrentView('AgentClients')} style={{ cursor: 'pointer' }}>Clients</h3>
                                        <h3 className={`font-normal text-xs mt-5 ml-6 lg:ml-7 ${currentView === 'AgentEarnings' ? 'text-blue-950 font-semibold' : 'text-gray-500'}`} onClick={() => setCurrentView('AgentEarnings')} style={{ cursor: 'pointer' }}>Earnings</h3>
                                    </div>
                                    <div className="mt-3 ml-0 mr-0 h-full lg:w-max-w-xl lg:h-full bg-white">
                                        {currentView === 'AgentClients' ? <AgentClients /> : <AgentEarnings />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentDetails;
export const dynamic = "force-dynamic";