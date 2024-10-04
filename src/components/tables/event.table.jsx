import React from 'react';

const EventTable = ({ events, onEdit, onDelete }) => {
    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true, // Enables AM/PM format
        };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    return (
        <div className="py-5">
            <table className="min-w-full table-fixed bg-white shadow-md rounded-lg">
                <thead className="bg-gray-200 text-center">
                    <tr>
                        <th className="w-1/6 px-4 py-2">Image</th>
                        <th className="w-1/4 px-4 py-2">Event Name</th>
                        <th className="w-1/4 px-4 py-2">Venue</th>
                        <th className="w-1/4 px-4 py-2">Date & Time</th>
                        <th className="w-1/4 px-4 py-2">About</th>
                        <th className="w-1/6 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {events.length > 0 ? (
                        events.map((event, index) => (
                            <tr key={event._id} className="bg-gray-50 hover:bg-gray-100 border-b">
                                <td className="px-4 py-2">
                                    {event.image ? (
                                        <img
                                            src={`http://localhost:8001/uploads/${event.image.split('\\').pop()}`}
                                            alt={event.name}
                                            className="w-16 h-16 object-cover mx-auto"
                                        />
                                    ) : (
                                        'No Image'
                                    )}
                                </td>
                                <td className="px-4 py-2">{event.name}</td>
                                <td className="px-4 py-2">{event.venue}</td>
                                <td className="px-4 py-2">{formatDate(event.date)}</td>
                                <td className="px-4 py-2">{event.about}</td>
                                <td className="px-4 py-2">
                                    <div className="flex justify-center space-x-4">
                                        <button
                                            className='px-6 py-2 bg-secondary-color hover:bg-blue-800 text-white rounded'
                                            onClick={() => onEdit(index)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                                            onClick={() => onDelete(index)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="py-4 text-center">
                                No events available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EventTable; 
