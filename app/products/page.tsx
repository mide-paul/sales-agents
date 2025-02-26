import { Header } from '@/components/header'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const page = () => {
    return (
        <div className='bg-gray-100'>
            <div className='pr-10'>
                <Sidebar />
            </div>
            <div className='pb-10'>
                <Header />
            </div>
            <div className='max-w-6xl min-h-[880px] ml-64 top-14 bg-white'>

            </div>
        </div>
    )
}

export default page