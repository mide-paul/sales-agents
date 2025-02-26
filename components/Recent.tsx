import React from 'react';
import Image from 'next/image';
import vivian from './../public/images/vivian.svg';
import sarah from './../public/images/sarah.svg';
import line from './../public/icons/line_vertical.png';

const Recent = () => {
  const activities = [
    { type: 'Call', time: '09:30 AM', date: '30 minutes ago', line: line, vivian: vivian, agentone: 'Vivian', sarah: sarah, agenttwo: 'Sarah', day: 'Thursday', datetwo: '12 June, 2024', status: 'completed' },
    { type: 'Call', time: '09:30 AM', date: '30 minutes ago', line: line, vivian: vivian, agentone: 'Vivian', sarah: sarah, agenttwo: 'Sarah', day: 'Thursday', datetwo: '12 June, 2024', status: 'follow up' },
    { type: 'Call', time: '09:30 AM', date: '30 minutes ago', line: line, vivian: vivian, agentone: 'Vivian', sarah: sarah, agenttwo: 'Sarah', day: 'Thursday', datetwo: '12 June, 2024', status: 'urgent' },
    { type: 'Call', time: '09:30 AM', date: '30 minutes ago', line: line, vivian: vivian, agentone: 'Vivian', sarah: sarah, agenttwo: 'Sarah', day: 'Thursday', datetwo: '12 June, 2024', status: 'urgent' },
    { type: 'Call', time: '09:30 AM', date: '30 minutes ago', line: line, vivian: vivian, agentone: 'Vivian', sarah: sarah, agenttwo: 'Sarah', day: 'Thursday', datetwo: '12 June, 2024', status: 'urgent' },
    { type: 'Call', time: '09:30 AM', date: '30 minutes ago', line: line, vivian: vivian, agentone: 'Vivian', sarah: sarah, agenttwo: 'Sarah', day: 'Thursday', datetwo: '12 June, 2024', status: 'urgent' },
  ];

  // Function to determine the status styles dynamically
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case 'follow up':
        return 'bg-orange-100 text-orange-700';
      case 'urgent':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-green-100 text-green-700';
    }
  };

  return (
    <div>
      <div className='flex flex-col gap-4 pb-8'>
        {activities.map((activity, index) => (
          <div 
            key={index} 
            className='flex gap-4 p-2.5 bg-white border rounded-md shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg'
          >
            {/* Call Type & Time Info */}
            <div className="flex flex-col gap-2">
              <h2 className="text-xs font-medium p-1 w-12 text-center bg-green-100 text-green-700 rounded-xl transition-all duration-300 ease-in-out">
                {activity.type}
              </h2>
              <h2 className="text-xs text-gray-900 font-medium">{activity.time}</h2>
              <h2 className="text-xs text-gray-500 font-medium">{activity.date}</h2>
            </div>

            {/* Vertical Separator Line */}
            <Image src={line} alt="separator" className="w-0.5 h-12 mt-3 ml-0 object-cover" />

            {/* Agents' Information */}
            <div className='flex gap-2 items-center'>
              <div className='flex flex-col text-xs text-black items-center'>
                <Image 
                  src={activity.vivian} 
                  alt="Vivian" 
                  className="w-8 h-8 object-cover rounded-full transition-transform duration-300 ease-in-out hover:scale-110"
                />
                <span className='font-semibold'>{activity.agentone}</span>
              </div>
              <div className='flex flex-col text-xs text-black items-center'>
                <Image 
                  src={sarah} 
                  alt="Sarah" 
                  className="w-8 h-8 object-cover rounded-full transition-transform duration-300 ease-in-out hover:scale-110"
                />
                <span className='font-semibold'>{activity.agenttwo}</span>
              </div>
            </div>

            {/* Vertical Separator Line */}
            <Image src={line} alt="separator" className="w-0.5 h-12 mt-3 ml-0 object-cover" />

            {/* Date & Status */}
            <div className='flex flex-col gap-2 text-xs text-black'>
              <span className='font-semibold text-gray-500'>{activity.day}</span>
              <span className='font-semibold'>{activity.datetwo}</span>
              <span className={`font-semibold p-1 text-center rounded-xl transition-all duration-300 ease-in-out ${getStatusStyles(activity.status)}`}>
                {activity.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recent;