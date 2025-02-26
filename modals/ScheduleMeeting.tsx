'use client';

import React from 'react'
import { useState } from 'react';

const ScheduleMeeting = () => {
    const [showAddModal, setShowAddModal] = useState<boolean>(false);

    return (
        <div>
            <button
                onClick={() => setShowAddModal(true)}
                className="px-2 lg:px-2 py-2 text-xs bg-white text-blue-950 border border-blue-950 rounded-md hover:bg-gray-100"
            >
                Schedule Meeting
            </button>
            {/* Add New Lead Modal */}
            {showAddModal && (
                <div className="fixed inset-0 lg:mt-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-scroll z-30">
                    <div className="bg-white p-6 mt-20 rounded-lg shadow-lg max-w-lg w-96">
                        <h2 className="text-sm font-semibold mb-4">Schedule Meeting</h2>
                        
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => setShowAddModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded-md text-xs"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-950 text-white rounded-md text-xs hover:bg-blue-900"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ScheduleMeeting