'use client';
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Header } from '@/components/header';
import CustomReport from '@/components/CustomReport';
import FinancialReports from '@/components/FinancialReports';
import RegulatoryReports from '@/components/RegulatoryReports';

const Reports = () => {
    const [currentView, setCurrentView] = useState('CustomReport');

    return (
        <div className='bg-gray-100'>
            <div className='pr-10'>
                <Sidebar />
            </div>
            <div className='pb-10'>
                <Header />
            </div>
            <div className="flex flex-col">
                <div>
                    <div className='w-screen h-full lg:max-w-5xl  bg-white pt-1 pb-1 pr-5 mr-8 mt-8 lg:mt-14 md:ml-64 lg:ml-72 2xl:w-max-w-7xl rounded'>
                        <div className="flex gap-8 mt-4 ml-4">
                            {/* Revenue and Upcoming Payouts links */}
                            <h3
                                className={`font-normal text-xs ${currentView === 'CustomReport' ? 'text-blue-950 font-semibold' : 'text-gray-500'
                                    }`}
                                onClick={() => setCurrentView('CustomReport')}
                                style={{ cursor: 'pointer' }}
                            >
                                Custom Report Generation
                            </h3>
                            <h3
                                className={`font-normal text-xs ${currentView === 'FinancialReports' ? 'text-blue-950 font-semibold' : 'text-gray-500'
                                    }`}
                                onClick={() => setCurrentView('FinancialReports')}
                                style={{ cursor: 'pointer' }}
                            >
                                Financial Reports
                            </h3>
                            <h3
                                className={`font-normal text-xs ${currentView === 'RegulatoryReports' ? 'text-blue-950 font-semibold' : 'text-gray-500'
                                    }`}
                                onClick={() => setCurrentView('RegulatoryReports')}
                                style={{ cursor: 'pointer' }}
                            >
                                Regulatory Reports
                            </h3>
                        </div>
                        <h3 className="font-medium text-blue-950 text-sm mt-4 ml-6 lg:ml-7">
                            {currentView === 'CustomReport'
                                ? 'Custom Report Generation'
                                : currentView === 'FinancialReports'
                                    ? 'Financial Reports'
                                    : 'Regulatory Reports'}
                        </h3>
                        <div className='mt-3 ml-4 mr-0 h-full lg:w-max-w-xl lg:h-screen bg-white shadow-md rounded'>
                            {currentView === 'CustomReport' ? (
                                <CustomReport />
                            ) : currentView === 'FinancialReports' ?
                                (
                                    <FinancialReports />
                                ) : (
                                    <RegulatoryReports />
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reports
export const dynamic = "force-dynamic";