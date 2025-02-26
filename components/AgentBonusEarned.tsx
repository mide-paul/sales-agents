import React from 'react'
import Image from 'next/image';
import money_bag from './../public/icons/money_bag.svg';
import line_dark from './../public/icons/line_dark.png';

const AgentBonusEarned = () => {
    return (
        <div>
            <h3 className='font-normal text-blue-950 text-sm pt-16 ml-6 lg:pt-8 lg:ml-7'>Bonuses earned</h3>
            <div className='flex flex-col lg:flex-row gap-4'>
                <div className='w-60 h-24 bg-gray-50 rounded-md mt-5 ml-6 lg:ml-7 pt-3 pr-3'>
                    <div className='flex items-center gap-2'>
                        <Image
                            src={money_bag}
                            alt=""
                            className="w-4 h-4 ml-3 object-cover"
                        />
                        <h3 className='font-normal text-black text-xs'>Total bonus earned from client aquition</h3>
                    </div>
                    <Image
                        src={line_dark}
                        alt=""
                        className="w-48 h-0.1 mt-2 ml-3.5 object-cover"
                    />
                    <h3 className='text-black font-medium ml-3 mt-2 text-sm lg:text-sm'>$800</h3>
                </div>
                <div className='w-60 h-24 bg-gray-50 rounded-md mt-5 ml-6 lg:ml-0 pt-3'>
                    <div className='flex items-center gap-2'>
                        <Image
                            src={money_bag}
                            alt=""
                            className="w-4 h-4 ml-3 object-cover"
                        />
                        <h3 className='font-normal text-black text-xs'>Total bonus earned from CDL program partnership</h3>
                    </div>
                    <Image
                        src={line_dark}
                        alt=""
                        className="w-48 h-0.1 mt-2 ml-3.5 object-cover"
                    />
                    <h3 className='text-black font-medium ml-3 mt-2 text-sm lg:text-sm'>$800</h3>
                </div>
                <div className='w-60 h-24 bg-gray-50 rounded-md mt-5 ml-6 lg:ml-0 pt-3'>
                    <div className='flex items-center gap-2'>
                        <Image
                            src={money_bag}
                            alt=""
                            className="w-4 h-4 ml-3 object-cover"
                        />
                        <h3 className='font-normal text-black text-xs'>Total bonus earned from ELD API integrations</h3>
                    </div>
                    <Image
                        src={line_dark}
                        alt=""
                        className="w-48 h-0.1 mt-2 ml-3.5 object-cover"
                    />
                    <h3 className='text-black font-medium ml-3 mt-2 text-sm lg:text-sm'>$800</h3>
                </div>
                <div className='w-60 h-24 bg-gray-50 rounded-md mt-5 ml-6 lg:ml-0 pt-3'>
                    <div className='flex items-center gap-2'>
                        <Image
                            src={money_bag}
                            alt=""
                            className="w-4 h-4 ml-3 object-cover"
                        />
                        <h3 className='font-normal text-black text-xs'>Regulatory achievements</h3>
                    </div>
                    <Image
                        src={line_dark}
                        alt=""
                        className="w-48 h-0.1 mt-7 ml-3.5 object-cover"
                    />
                    <h3 className='text-black font-medium ml-3 mt-2 text-sm lg:text-sm'>$800</h3>
                </div>
            </div>
        </div>
    )
}

export default AgentBonusEarned