import React from 'react';
import Image from 'next/image';
import speaker from './../public/icons/speaker.svg';
import line from './../public/icons/line_dark.png';

const AdCampaignOverview = () => {
    const adCampaign = [
        { title: 'Coca cola campaign', client: 'Coca cola', status: 'Active', line: line, speaker: speaker, spend: '$456', impressions: '8,456' },
        { title: 'Pepsi campaign', client: 'Pepsi', status: 'Active', line: line, speaker: speaker, spend: '$456', impressions: '8,456' },
        { title: 'Apple campaign', client: 'Apple', status: 'Active', line: line, speaker: speaker, spend: '$456', impressions: '8,456' },
        { title: 'Amazon campaign', client: 'Amazon', status: 'Active', line: line, speaker: speaker, spend: '$456', impressions: '8,456' },
    ];

    return (
        <div>
            <div className='flex flex-col gap-4 pb-8'>
                {adCampaign.map((ad, index) => (
                    <div key={index}
                        className='p-3 bg-white border rounded-md'>
                        <div className="flex gap-2 items-center">
                            <Image src={speaker} alt="user" className="w-4 h-4 object-cover" />
                            <h2 className="text-xs text-gray-900 font-medium">{ad.title}</h2>
                        </div>
                        <Image
                            src={line}
                            alt=""
                            className="w-64 h-0.1 mt-3 ml-0 object-cover"
                        />
                        <div className='text-xs mt-2.5 space-x-40 text-black'>
                            <label className='text-gray-600'>Client</label>
                            <span className='font-semibold'>{ad.client}</span>
                        </div>
                        <div className='text-xs mt-2.5 space-x-40 text-black'>
                            <label className='text-gray-600'>Status</label>
                            <span className='font-semibold p-1 bg-green-100 text-green-700 rounded-xl'>{ad.status}</span>
                        </div>
                        <div className='text-xs mt-2.5 space-x-40 text-black'>
                            <label className='text-gray-600'>Spend</label>
                            <span className='font-semibold'>{ad.spend}</span>
                        </div>
                        <div className='text-xs mt-2.5 space-x-32 text-black'>
                            <label className='text-gray-600'>Impressions</label>
                            <span className='font-semibold'>{ad.impressions}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdCampaignOverview