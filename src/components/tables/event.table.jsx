import React from 'react';

const EventTable = ({ events, onEdit, onDelete }) => {
    return (
        <div className='py-5'>
            <table className='min-w-full table-fixed bg-white'>
                <thead>
                    <tr className='bg-gray-200 text-left'>
                        <th className='w-1/4 px-4 py-2'>Event Name</th>
                        <th className='w-1/4 px-4 py-2'>Venue</th>
                        <th className='w-1/4 px-4 py-2'>Date & Time</th>
                        <th className='w-1/6 px-4 py-2'>Image</th>
                        <th className='w-1/6 px-4 py-2'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.length > 0 ? (
                        events.map((event, index) => (
                            <tr key={index} className='border-b'>
                                <td className='px-4 py-2'>{event.name}</td>
                                <td className='px-4 py-2'>{event.venue}</td>
                                <td className='px-4 py-2'>{event.date}</td>
                                <td className='px-4 py-2'>
                                    {event.image ? event.image.name : 'No Image'}
                                </td>
                                <td className='px-4 py-2'>
                                    <button
                                        className='mr-2 px-6 py-2 bg-secondary-color hover:bg-blue-800 text-white rounded'
                                        onClick={() => onEdit(event)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded'
                                        onClick={() => onDelete(event)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="py-4 text-center">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EventTable;
