const AlumniTable = ({ alumnis = [], onEdit, onDelete }) => {
    return (
        <div className='py-5'>
            <table className='min-w-full table-fixed bg-white shadow-md rounded-lg'>
                <thead>
                    <tr className='bg-gray-200 text-center'>
                        <th className='w-1/6 px-4 py-2'>Class</th>
                        <th className='w-1/4 px-4 py-2'>Batch</th>
                        <th className='w-1/4 px-4 py-2'>Total Students</th>
                        <th className='w-1/6 px-4 py-2'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {alumnis.length > 0 ? (
                        alumnis.map((alumni, index) => (
                            <tr key={index} className='border-b text-center'>
                                <td className='px-4 py-2'>{alumni.class}</td>
                                <td className='px-4 py-2'>{alumni.batch}</td>
                                <td className='px-4 py-2'>{alumni.totalStudents}</td>
                                <td className='px-4 py-2'>
                                    <button
                                        className='mr-2 px-6 py-2 bg-secondary-color hover:bg-blue-800 text-white rounded'
                                        onClick={() => onEdit(alumni)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded'
                                        onClick={() => onDelete(alumni._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="py-4 text-center text-gray-500">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AlumniTable;
