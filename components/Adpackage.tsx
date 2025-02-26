import React from 'react'
import Adpackagetable from './Adpackagetable'
import Clickthroughrate from './Clickthroughrate'
import Clicks from './Clicks'
import Impressions from './Impressions'

const Adpackage = () => {
    return (
        <div className='pb-9'>
            <div className="w-80 h-full lg:min-w-[1025px] lg:h-full pl-0 bg-white shadow rounded-md ml-6 lg:ml-7 mt-6">
                <Adpackagetable />
            </div>
            <div className='flex flex-col lg:flex-row'>
                <div>
                    <h3 className="text-black text-sm ml-6 lg:ml-7 mt-6">CTR (Click-through rate)</h3>
                    <div className="w-80 h-full lg:min-w-[500px] lg:max-h-[270px] pl-0 bg-white shadow rounded-md ml-6 lg:ml-7 mt-4">
                        <Clickthroughrate />
                    </div>
                </div>
                <div>
                    <h3 className="text-black text-sm ml-6 lg:ml-7 mt-6">Clicks</h3>
                    <div className="w-80 h-full lg:min-w-[500px] lg:max-h-[270px] pl-0 bg-white shadow rounded-md ml-6 lg:ml-7 mt-4">
                        <Clicks />
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-black text-sm ml-6 lg:ml-7 mt-9">Impressions</h3>
                <div className="w-80 h-full lg:min-w-[1025px] lg:max-h-[270px] pl-0 bg-white shadow rounded-md ml-6 lg:ml-7 mt-4 pb-4">
                    <Impressions />
                </div>
            </div>
        </div>
    )
}

export default Adpackage