'use client';
import React, { useState } from 'react';
import { Header } from '@/components/header'
import Sidebar from '@/components/Sidebar'
import Advertisers from '@/components/Advertisers';
import Adpackage from '@/components/Adpackage';

const Page = () => {
    const [currentView, setCurrentView] = useState('Advertisers');

    return (
        <div className='bg-gray-100'>
            <div className='pr-10'>
                <Sidebar />
            </div>
            <div className='pb-10'>
                <Header />
            </div>
            <div className='max-w-6xl min-h-[880px] lg:ml-64 top-14 bg-white'>
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex flex-col">
                        <div className="flex mt-14 ml-4">
                            {/* Revenue and Upcoming Payouts links */}
                            <h3
                                className={`font-normal text-xs mt-5 ml-6 lg:ml-7 ${currentView === 'Advertisers' ? 'text-blue-950 font-semibold' : 'text-gray-500'
                                    }`}
                                onClick={() => setCurrentView('Advertisers')}
                                style={{ cursor: 'pointer' }}
                            >
                                Advertisers
                            </h3>
                            <h3
                                className={`font-normal text-xs mt-5 ml-6 lg:ml-7 ${currentView === 'Adpackage' ? 'text-blue-950 font-semibold' : 'text-gray-500'
                                    }`}
                                onClick={() => setCurrentView('Adpackage')}
                                style={{ cursor: 'pointer' }}
                            >
                                Ad package
                            </h3>
                        </div>
                        <div>
                            <div>
                                {currentView === 'Advertisers' ? (
                                    <div className="max-w-[340px] h-full lg:min-w-[1005px] lg:h-full pl-0 bg-white shadow rounded-md ml-4 lg:ml-7 mt-6">
                                        <Advertisers />
                                    </div>
                                ) : (
                                    <Adpackage />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page