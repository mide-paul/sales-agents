'use client';
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Header } from '@/components/header';
import TrainingPackages from '@/components/TrainingPackages';
import Adsales from '@/components/Adsales';

const PipelinesCampaign = () => {
    const [currentView, setCurrentView] = useState('TrainingPackages');
    const [showDragFrame, setShowDragFrame] = useState(true);

    return (
        <div className='bg-gray-100'>
            <div className='pr-10'>
                <Sidebar />
            </div>
            <div className='pb-10'>
                <Header />
            </div>
            {showDragFrame && (
                <div className='absolute flex gap-96 mt-10 ml-64 h-8 min-w-[1092px] bg-yellow-400 rounded'>
                    <h3 className='p-1 ml-3 pr-16 text-sm text-black font-medium'>
                        Drag to move cards
                    </h3>
                    <button
                        className='ml-20 pl-96 mt-1 text-sm'
                        onClick={() => setShowDragFrame(false)}
                    >
                        X
                    </button>
                </div>
            )}
            <div>
                <div>
                    <div className='w-screen h-full lg:h-full lg:max-w-5xl bg-white pt-1 pb-1 pr-5 mr-8 mt-8 lg:mt-14 md:ml-64 lg:ml-72 2xl:w-max-w-7xl rounded'>
                        <div className="flex flex-col">
                            <div>
                                <div className="pt-1 pb-1 pr-5 mr-8 mt-5 lg:mt-5 md:ml-64 lg:ml-5 2xl:w-max-w-7xl rounded">
                                    <div className="flex gap-6 mt-4 ml-4">
                                        <h3 className={`font-normal text-xs mt-5 ml-6 lg:ml-7 ${currentView === 'TrainingPackages' ? 'text-blue-950 font-semibold' : 'text-gray-500'}`} onClick={() => setCurrentView('TrainingPackages')} style={{ cursor: 'pointer' }}>Training Packages</h3>
                                        <h3 className={`font-normal text-xs mt-5 ml-6 lg:ml-7 ${currentView === 'Adsales' ? 'text-blue-950 font-semibold' : 'text-gray-500'}`} onClick={() => setCurrentView('Adsales')} style={{ cursor: 'pointer' }}>Ad sales</h3>
                                    </div>
                                    <div className="mt-3 ml-0 mr-0 h-full lg:w-max-w-xl lg:h-full bg-white">
                                        {currentView === 'TrainingPackages' ? <TrainingPackages /> : <Adsales />}
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

export default PipelinesCampaign
export const dynamic = "force-dynamic";