import React from 'react';
import Image from 'next/image';
import user from './../public/icons/user.svg';

const LeadsForIndividuals = () => {
    const sales = [
        {
            title: 'Total number of leads for individual sales',
            leadStages: [
                { stage: 'New lead', count: 34, color: 'bg-blue-900' },
                { stage: 'Qualified', count: 44, color: 'bg-green-300' },
                { stage: 'Proposal sent', count: 47, color: 'bg-purple-400' },
                { stage: 'Closed', count: 57, color: 'bg-cyan-300' }
            ]
        }
    ];

    // Find max count to normalize progress bar width
    const maxLeads = Math.max(...sales[0].leadStages.map(stage => stage.count));

    return (
        <div>
            {sales.map((sale) => (
                <div key={sale.title} className="pt-7">
                    <div className="flex gap-2 items-center">
                        <Image src={user} alt="user" className="w-4 h-4 object-cover" />
                        <h2 className="text-xs text-gray-900 font-medium">{sale.title}</h2>
                    </div>
                    
                    {sale.leadStages.map((stage, index) => (
                        <div key={index} className="mt-6">
                            {/* Progress Bar */}
                            <div className="relative w-full h-2 rounded-full bg-gray-200 mb-1">
                                <div 
                                    className={`h-2 rounded-full ${stage.color}`} 
                                    style={{ width: `${(stage.count / maxLeads) * 100}%` }}
                                ></div>
                            </div>

                            {/* Lead Stage Text */}
                            <h3 className="text-xs text-black font-normal">
                                {stage.stage} - {stage.count}
                            </h3>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default LeadsForIndividuals;