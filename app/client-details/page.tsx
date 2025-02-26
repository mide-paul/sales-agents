'use client';
import React, { useState } from 'react';
import Image from "next/image";
import Sidebar from '@/components/Sidebar';
import { Header } from '@/components/header';
import TrainingProgress from '@/components/TrainingProgress';
import AdCampaign from '@/components/AdCampaign';
import EngagementHistory from '@/components/EngagementHistory';
import client_details_frame from '../../public/images/client_details_frame.svg';

const ClientsDetails = () => {
    const [currentView, setCurrentView] = useState('TrainingProgress');
    // const [percentage, setPercentage] = useState<number | null>(null);
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    //     const fetchProgress = async () => {
    //       try {
    //         setLoading(true);
    //         setError(null);
    //         const response = await fetch("/api/progress"); // Replace with your endpoint
    //         if (!response.ok) {
    //           throw new Error("Failed to fetch progress data");
    //         }
    //         const data = await response.json();
    //         setPercentage(data.percentage); // Assumes the endpoint returns { percentage: number }
    //       } catch (error) {
    //         setError(error instanceof Error ? error.message : "An unknown error occurred");
    //       } finally {
    //         setLoading(false);
    //       }
    //     };

    //     fetchProgress();

    //     // Polling example: Refresh progress every 5 seconds
    //     const interval = setInterval(fetchProgress, 5000);
    //     return () => clearInterval(interval);
    //   }, []);

    //   if (loading) {
    //     return (
    //       <div className="flex items-center justify-center min-h-screen bg-gray-100">
    //         <p className="text-xl font-medium text-gray-600">Loading...</p>
    //       </div>
    //     );
    //   }

    //   if (error) {
    //     return (
    //       <div className="flex items-center justify-center min-h-screen bg-gray-100">
    //         <p className="text-xl font-medium text-red-600">Error: {error}</p>
    //       </div>
    //     );
    //   }

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
                            <Image
                                src={client_details_frame}
                                alt="frame"
                                className="w-full h-28 mr-0"
                            />
                            <div className='absolute -mt-16 ml-9 w-32 h-32 bg-gray-400 border-4 border-white rounded-md shadow-md'></div>
                            <div className='flex'>
                                <div className='flex lg:flex-col gap-1 ml-44 mt-3'>
                                    <h3 className='text-blue-950 text-normal text-xs'>Package Expires:</h3>
                                    <h3 className='text-black text-normal text-sm font-semibold'>30-01-2025</h3>
                                </div>
                                <div>
                                    <button className='relative h-8 w-32 ml-6 mt-5 text-xs text-blue-950 bg-white border border-blue-950 rounded hover:bg-blue-900 hover:text-white cursor-pointer z-10'>
                                        Send reminder
                                    </button>
                                </div>
                            </div>
                            <div className='relative flex lg:gap-28 ml-9 mt-8 z-10'>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-gray-400 font-normal text-xs'>Name</label>
                                    <h3 className='text-black font-semibold text-xs'>HOSOptima</h3>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-gray-400 font-normal text-xs'>Contact info</label>
                                    <h3 className='text-black font-semibold text-xs'>+191-212-456-7890</h3>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-gray-400 font-normal text-xs'>Company size</label>
                                    <h3 className='text-black font-semibold text-xs'>44</h3>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-gray-400 font-normal text-xs'>Industry</label>
                                    <h3 className='text-black font-semibold text-xs'>Design</h3>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-gray-400 font-normal text-xs'>Account status</label>
                                    <h3 className='font-semibold text-xs p-0.5 w-12 bg-green-100 text-green-700 rounded-full'>Active</h3>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div>
                                <div className="pt-1 pb-1 pr-5 mr-8 mt-8 lg:mt-14 md:ml-64 lg:ml-5 2xl:w-max-w-7xl rounded">
                                    <div className="flex gap-8 mt-4 ml-4">
                                        {/* Client details links */}
                                        <h3
                                            className={`font-normal text-xs hover:text-blue-950 hover:font-semibold z-10 ${currentView === 'TrainingProgress' ? 'text-blue-950 font-semibold' : 'text-gray-500'}`}
                                            onClick={() => setCurrentView('TrainingProgress')}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Training Progress
                                        </h3>
                                        <h3
                                            className={`font-normal text-xs hover:text-blue-950 hover:font-semibold z-10 ${currentView === 'AdCampaign' ? 'text-blue-950 font-semibold' : 'text-gray-500'}`}
                                            onClick={() => setCurrentView('AdCampaign')}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Ad Campaign
                                        </h3>
                                        <h3
                                            className={`font-normal text-xs hover:text-blue-950 hover:font-semibold z-10 ${currentView === 'EngagementHistory' ? 'text-blue-950 font-semibold' : 'text-gray-500'}`}
                                            onClick={() => setCurrentView('EngagementHistory')}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Engagement History
                                        </h3>
                                    </div>
                                    {/* <h3 className="font-medium text-blue-950 text-sm mt-4 ml-6 lg:ml-7">
                                        {currentView === 'TrainingProgress'
                                            ? 'Training Progress'
                                            : currentView === 'AdCampaign'
                                                ? 'Ad Campaign'
                                                : 'Engagement History'}
                                    </h3> */}
                                    <div className="mt-3 ml-4 mr-0 h-full lg:w-max-w-xl lg:h-56 bg-white">
                                        {currentView === 'TrainingProgress' ? (
                                            <TrainingProgress percentage={55} />
                                            // percentage !== null && <TrainingProgress percentage={percentage} />
                                        ) : currentView === 'AdCampaign' ? (
                                            <AdCampaign />
                                        ) : (
                                            <EngagementHistory />
                                        )}
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

export default ClientsDetails;
export const dynamic = "force-dynamic";