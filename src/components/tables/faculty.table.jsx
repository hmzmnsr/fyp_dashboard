import React from 'react';

const FacultyTable = ({ data, onEdit, onDelete }) => {
    // Function to display only the first three words
    const getFirstThreeWords = (text) => {
        return text ? text.split(' ').slice(0, 3).join(' ') : '';
    };

    return (
        <div className='overflow-x-auto mt-2'>
            <table className='min-w-full table-fixed bg-white shadow-md rounded-lg'>
                <thead>
                    <tr className='bg-gray-200'>
                        <th className='w-24 py-2 px-4 text-center'>Image</th>
                        <th className='w-1/6 py-2 px-4 text-center'>Faculty Name</th>
                        <th className='w-1/6 py-2 px-4 text-center'>Position</th>
                        <th className='w-1/6 py-2 px-4 text-center'>Qualification</th>
                        <th className='w-1/6 py-2 px-4 text-center'>Email</th>
                        <th className='w-1/6 py-2 px-4 text-center'>Area of Interest</th>
                        <th className='w-1/6 py-2 px-4 text-center'>About</th>
                        <th className='w-1/6 py-2 px-4 text-center'>Status</th>
                        <th className='w-1/6 py-2 px-4 text-center'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={index} className='bg-gray-50 hover:bg-gray-100 border-b'>
                                <td className='py-2 px-4 text-center'>
                                    {item.image ? (
                                        <img
                                            src={`http://localhost:8001/uploads/${item.image.split('/').pop()}`}
                                            alt='Faculty'
                                            className='w-16 h-16 rounded-full object-cover mx-auto'
                                        />
                                    ) : (
                                        <span>No Image</span>
                                    )}
                                </td>
                                <td className='py-2 px-4 text-center'>{item.name}</td>
                                <td className='py-2 px-4 text-center'>{item.position}</td>
                                <td className='py-2 px-4 text-center'>{item.qualification}</td>
                                <td className='py-2 px-4 text-center'>{item.email}</td>
                                <td className='py-2 px-4 text-center'>{item.areaOfInterest}</td>
                                <td className='py-2 px-4 text-center'>{getFirstThreeWords(item.about)}</td> {/* Only first 3 words */}
                                <td className='py-2 px-4 text-center'>{item.status}</td>
                                <td className='py-2 px-4 text-center'>
                                    <div className="flex justify-center space-x-4">
                                        <button
                                            className='px-6 py-2 bg-secondary-color hover:bg-blue-800 text-white rounded'
                                            onClick={() => onEdit(item)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded'
                                            onClick={() => onDelete(item)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="py-4 text-center">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default FacultyTable;
