'use client';
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { Header } from '@/components/header';
import LeadsTable from '@/components/Leads';

const Leads = () => {

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
                    <div className='w-screen h-full lg:h-full lg:max-w-5xl bg-white pt-1 pb-1 pr-5 mr-8 mt-8 lg:mt-14 md:ml-64 lg:ml-72 2xl:w-max-w-7xl rounded'>
                        <div className='mt-3 ml-0 lg:ml-4 mr-0 h-full lg:w-max-w-xl lg:h-full bg-white shadow-md rounded'>
                            <LeadsTable />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Leads
export const dynamic = "force-dynamic";