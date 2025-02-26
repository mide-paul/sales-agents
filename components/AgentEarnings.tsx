import React from 'react'
import AgentBonusEarned from './AgentBonusEarned'
import AgentCommisionEarned from './AgentCommisionEarned'
import AgentRevenue from './AgentRevenue'
import AgentUpcomingPayouts from './AgentUpcomingPayouts'

const AgentEarnings = () => {
    return (
        <div>
            <AgentBonusEarned />
            <AgentCommisionEarned />
            <h3 className='text-sm mt-7 ml-8 text-blue-950'>Revenue</h3>
            <div className='mt-10 ml-8 shadow-md'>
                <AgentRevenue />
            </div>
            <h3 className='text-sm mt-7 ml-8 text-blue-950'>Upcoming payouts</h3>
            <div className='mt-10 ml-8 shadow'>
                <AgentUpcomingPayouts />
            </div>
        </div>
    )
}

export default AgentEarnings