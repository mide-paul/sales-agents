'use client';
import React, { useState } from "react";
import dynamic from 'next/dynamic';
import { Header } from "@/components/header";
import Sidebar from "@/components/Sidebar";
import Profile from "@/components/Profile";
import Security from "@/components/SecurityAndPrivacy";
import BankDetails from "@/components/BankDetails";

const Page = () => {
    const [currentView, setCurrentView] = useState('Profile');

    return (
        <div className="h-full w-full bg-gray-200 overflow-hidden">
            <div>
                <Sidebar />
            </div>

            <Header />

            <div className=" bg-white ml-0 lg:ml-64 mt-24 w-full h-50 rounded">
                <div className="flex gap-5 pt-6 ml-7">
                    <h3
                        className={`font-normal text-xs ${currentView === 'Profile' ? 'text-blue-950 font-semibold' : 'text-gray-500'
                            }`}
                        onClick={() => setCurrentView('Profile')}
                        style={{ cursor: 'pointer' }}
                    >
                        Profile
                    </h3>
                    <h3
                        className={`font-normal text-xs ${currentView === 'SecurityAndPrivacy' ? 'text-blue-950 font-semibold' : 'text-gray-500'
                            }`}
                        onClick={() => setCurrentView('SecurityAndPrivacy')}
                        style={{ cursor: 'pointer' }}
                    >
                        Security & Privacy
                    </h3>
                    <h3
                        className={`font-normal text-xs ${currentView === 'BankDetails' ? 'text-blue-950 font-semibold' : 'text-gray-500'
                            }`}
                        onClick={() => setCurrentView('BankDetails')}
                        style={{ cursor: 'pointer' }}
                    >
                        Bank details
                    </h3>
                </div>
                <div>
                    {currentView === 'Profile' ? (
                        <Profile />
                    ) : currentView === 'SecurityAndPrivacy' ?
                        (
                            <Security />
                        ) : (
                            <BankDetails />
                        )}
                </div>
            </div>
        </div>
    )
}

export default dynamic(() => Promise.resolve(Page), { ssr: false });