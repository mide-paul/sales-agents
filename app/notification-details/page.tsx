"use client";

import Sidebar from '@/components/Sidebar';
import { Header } from '@/components/header';

const NotificationDetails: React.FC = () => {
    return (
        <div>
            <div className='pr-10'>
                <Sidebar />
            </div>
            <div className='pb-10'>
                <Header />
            </div>
            <div className="max-w-[320px] lg:max-w-2xl ml-6 lg:ml-72 mt-20 p-5 bg-white shadow-md rounded-md">
                <h1 className="text-sm font-semibold">New message from Admin</h1>
                <p className="text-gray-700 mt-2 text-xs">You have received a new message from the admin regarding your account status.</p>
                <a href="/dashboard" className="block mt-4 text-xs text-blue-900 hover:text-blue-950">Go Back</a>
            </div>
        </div>
    );
};

export default NotificationDetails;