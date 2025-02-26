'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';
import { Header } from '@/components/header';
import document from '../../public/icons/document.svg';
import speaker from '../../public/icons/speaker.svg';
import line_dark from '../../public/icons/line_dark.png';
import LeadsForIndividuals from '@/components/LeadsForIndividuals';
import AddNewLead from '@/modals/AddNewLead';
import LeadsForEnterprise from '@/components/LeadsForEnterprise';
import AdCampaignOverview from '@/components/AdCampaignOverview';
import Recent from '@/components/Recent';
import Upcoming from '@/components/Upcoming';
import Completed from '@/components/Completed';
import CreateNewCampaign from '@/modals/CreateNewCampaign';
import ScheduleMeeting from '@/modals/ScheduleMeeting';

const Dashboard = () => {
    const [currentView, setCurrentView] = useState('Recent');

    return (
        <div className='bg-gray-100 overflow-hidden'>
            <div className='pr-10'>
                <Sidebar />
            </div>
            <div className='pb-10'>
                <Header />
            </div>
            <div className='max-w-6xl min-h-[880px] pr-2 bg-white mt-12 lg:mt-14 md:ml-64 lg:ml-64 2xl:w-max-w-7xl rounded'>
                <div className='flex gap-2 justify-between items-center'>
                    <div className='pt-5 pl-3 lg:pl-5'>
                        <AddNewLead />
                    </div>
                    <div className='flex gap-2 lg:gap-4 pt-5 ml-auto'>
                        <div>
                            <CreateNewCampaign />
                        </div>
                        <div>
                            <ScheduleMeeting />
                        </div>
                    </div>
                </div>
                <div>
                    <div className='flex flex-col lg:flex-row gap-2'>
                        <div className='w-48 h-20 bg-gray-50 rounded-md mt-5 ml-8 lg:ml-5 pt-3'>
                            <div className='flex items-center gap-2'>
                                <Image
                                    src={document}
                                    alt=""
                                    className="w-4 h-4 ml-3 object-cover"
                                />
                                <h3 className='font-normal text-black text-xs'>Total Training package</h3>
                            </div>
                            <Image
                                src={line_dark}
                                alt=""
                                className="w-40 h-0.1 mt-2 ml-3.5 object-cover"
                            />
                            <h3 className='text-black font-medium ml-3 mt-2 text-xs lg:text-sm'>478</h3>
                        </div>
                        <div className='w-48 h-20 bg-gray-50 rounded-md mt-5 ml-8 lg:ml-0 pt-3'>
                            <div className='flex items-center gap-2'>
                                <Image
                                    src={speaker}
                                    alt=""
                                    className="w-4 h-4 ml-3 object-cover"
                                />
                                <h3 className='font-normal text-black text-xs'>Total Ad sales</h3>
                            </div>
                            <Image
                                src={line_dark}
                                alt=""
                                className="w-40 h-0.1 mt-2 ml-3.5 object-cover"
                            />
                            <h3 className='text-black font-medium ml-3 mt-2 text-sm lg:text-sm'>478</h3>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row gap-6'>
                    <div className='flex flex-col pb-24'>
                        <div>
                            <div className='w-80 lg:w-full lg:min-w-[370px] h-72 pl-5 pr-5 bg-white shadow rounded-md ml-6 lg:ml-5 mt-6'>
                                <LeadsForIndividuals />
                            </div>
                        </div>

                        <div>
                            <div className='w-80 lg:min-w-full h-72 pl-5 pr-5 bg-white shadow rounded-md ml-6 lg:ml-5 mt-6'>
                                <LeadsForEnterprise />
                            </div>
                        </div>
                    </div>

                    <div className='-mt-28 pt-2'>
                        <h3 className='font-normal text-blue-950 text-sm mt-5 ml-6 lg:ml-5'>Ad Campaign Overview - Top Ads</h3>
                        <div className='w-80 lg:w-72 min-h-[590px] pl-0 ml-6 lg:ml-5 mt-2'>
                            <AdCampaignOverview />
                        </div>
                    </div>

                    <div className='-mt-48 lg:-mt-28 pt-2'>
                        <h3 className='font-normal text-blue-950 text-sm mt-5 ml-6 lg:ml-0 pt-36 lg:pt-0'>My Activities</h3>
                        <div className='w-80 lg:w-32 min-h-[732px] pl-0 ml-6 lg:ml-0'>
                            <div className="flex flex-col">
                                <div>
                                    <div className='w-screen h-full lg:max-w-5xl bg-white pt-1 pb-1 pr-5 mr-8 mt-2 lg:mt-2 md:ml-64 lg:ml-0 2xl:w-max-w-7xl rounded'>
                                        <div className="flex gap-8 mt-2 ml-0">
                                            {/* Revenue and Upcoming Payouts links */}
                                            <h3
                                                className={`font-normal text-xs ${currentView === 'Recent' ? 'text-blue-950 font-semibold' : 'text-gray-500'
                                                    }`}
                                                onClick={() => setCurrentView('Recent')}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                Recent
                                            </h3>
                                            <h3
                                                className={`font-normal text-xs ${currentView === 'Upcoming' ? 'text-blue-950 font-semibold' : 'text-gray-500'
                                                    }`}
                                                onClick={() => setCurrentView('Upcoming')}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                Upcoming
                                            </h3>
                                            <h3
                                                className={`font-normal text-xs ${currentView === 'Completed' ? 'text-blue-950 font-semibold' : 'text-gray-500'
                                                    }`}
                                                onClick={() => setCurrentView('Completed')}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                Completed
                                            </h3>
                                        </div>
                                        <div className='mt-3 ml-0 mr-0 h-full max-w-[330px] lg:max-w-[340px] lg:h-screen'>
                                            {currentView === 'Recent' ? (
                                                <Recent />
                                            ) : currentView === 'Upcoming' ?
                                                (
                                                    <Upcoming />
                                                ) : (
                                                    <Completed />
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard