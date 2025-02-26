import React from 'react'
import Image from 'next/image';
import money_bag from './../public/icons/money_bag.svg';
import line_dark from './../public/icons/line_dark.png';

const AgentCommisionEarned = () => {
    return (
        <div>
            <div>
                <h3 className='font-normal text-blue-950 text-sm pt-16 ml-6 lg:pt-8 lg:ml-7'>Commission earned</h3>
                <div className='ml-6 lg:ml-8 mt-4 pt-1 pl-4 bg-white w-80 lg:min-w-[920px] h-64 lg:h-32 shadow rounded'>
                    <div className='flex flex-col lg:flex-row gap-7'>
                        <div className='w-72 lg:min-w-[425px] h-24 bg-gray-50 rounded-md mt-3 ml-0 lg:ml-1 pt-3 pr-8'>
                            <div className='flex items-center gap-2'>
                                <Image
                                    src={money_bag}
                                    alt=""
                                    className="w-4 h-4 ml-7 object-cover"
                                />
                                <h3 className='font-normal text-black text-xs max-w-44'>Total commission earned from training sales</h3>
                            </div>
                            <Image
                                src={line_dark}
                                alt=""
                                className="max-w-[195px] lg:max-w-[370px] h-0.1 mt-2 ml-7 object-cover"
                            />
                            <h3 className='text-black font-medium ml-7 mt-2 text-sm lg:text-sm'>$800</h3>
                        </div>
                        <div className='w-72 lg:min-w-[425px] h-24 bg-gray-50 rounded-md mt-0 lg:mt-3 ml-0 lg:ml-0 pt-3 pr-8'>
                            <div className='flex items-center gap-2'>
                                <Image
                                    src={money_bag}
                                    alt=""
                                    className="w-4 h-4 ml-7 object-cover"
                                />
                                <h3 className='font-normal text-black text-xs max-w-44'>Total commission earned from ad sales</h3>
                            </div>
                            <Image
                                src={line_dark}
                                alt=""
                                className="max-w-[195px] lg:max-w-[370px] h-0.1 mt-2 ml-7 object-cover"
                            />
                            <h3 className='text-black font-medium ml-7 mt-2 text-sm lg:text-sm'>$800</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AgentCommisionEarned