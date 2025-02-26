'use client';
import React from 'react';
import Image from "next/image";
import Sidebar from '@/components/Sidebar';
import { Header } from '@/components/header';
import client_details_frame from '../../public/images/client_details_frame.svg';
import LeadDetailsComp from '@/components/LeadDetailsComp';

const LeadsDetails = () => {
    // const [currentView, setCurrentView] = useState('TrainingProgress');
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
                            <div className='flex lg:flex-row gap-1 ml-44 mt-3'>
                                    <button className='relative h-8 w-32 ml-6 mt-5 text-xs text-blue-950 font-semibold bg-white border border-blue-950 rounded hover:bg-blue-900 hover:text-white cursor-pointer z-10'>
                                        Send Email
                                    </button>
                                    <button className='relative h-8 w-32 ml-6 mt-5 text-xs text-blue-950 font-semibold bg-white border border-blue-950 rounded hover:bg-blue-900 hover:text-white cursor-pointer z-10'>
                                        Make a call
                                    </button>
                            </div>
                            <div className='relative flex lg:gap-16 ml-9 mt-8 z-10'>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-gray-400 font-normal text-xs'>Name</label>
                                    <h3 className='text-black font-semibold text-xs text-nowrap'>Emmanuel Henry</h3>
                                    <h3 className='font-semibold text-xs p-0.5 w-12 bg-green-100 text-green-700 rounded-full'>Hybrid</h3>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-gray-400 font-normal text-xs'>Email</label>
                                    <h3 className='text-black font-semibold text-xs'>emmanuel@gmail.com</h3>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-gray-400 font-normal text-xs'>Company</label>
                                    <h3 className='text-black font-semibold text-xs'>HOSOptima</h3>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-gray-400 font-normal text-xs'>Phone number</label>
                                    <h3 className='text-black font-semibold text-xs'>+191-212-456-7890</h3>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-gray-400 font-normal text-xs'>Number of downloads</label>
                                    <h3 className='text-black font-semibold text-xs'>7</h3>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-gray-400 font-normal text-xs'>Website visits</label>
                                    <h3 className='text-black font-semibold text-sm'>20</h3>
                                </div>
                            </div>
                        </div>
                        <div className='mt-8'>
                            <LeadDetailsComp />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadsDetails;
export const dynamic = "force-dynamic";