import React from 'react';

const GalleryTable = ({ albums = [], onEdit, onDelete }) => {
    return (
        <div className='py-5'>
            <table className='min-w-full table-fixed bg-white'>
                <thead>
                    <tr className='bg-gray-200 text-left'>
                        <th className='w-1/4 px-4 py-2 text-center'>Album Name</th>
                        <th className='w-1/4 px-4 py-2 text-center'>Cover Photo</th>
                        <th className='w-1/4 px-4 py-2 text-center'>Number of Images</th>
                        <th className='w-1/6 px-4 py-2 text-center'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {albums.length > 0 ? (
                        albums.map((album, index) => (
                            <tr key={index} className='border-b'>
                                <td className='px-4 py-2 text-center'>{album.name}</td>
                                <td className='px-4 py-2 text-center'>
                                    {album.coverPhoto ? (
                                        <img
                                            src={`http://localhost:8001/uploads/${album.coverPhoto.split('\\').pop()}`}
                                            alt={album.name}
                                            className='w-16 h-16 object-cover mx-auto'
                                        />
                                    ) : (
                                        'No Cover Photo'
                                    )}
                                </td>
                                <td className='px-4 py-2 text-center'>{album.images ? album.images.length : 0}</td>
                                <td className='px-4 py-2 text-center'>
                                    <button
                                        className='mr-2 px-6 py-2 bg-secondary-color hover:bg-blue-800 text-white rounded'
                                        onClick={() => onEdit(index)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded'
                                        onClick={() => onDelete(index)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="py-4 text-center">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default GalleryTable;
