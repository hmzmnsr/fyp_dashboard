import React from 'react';

// Helper function to extract file name from the full path
const getFileName = (filePath) => filePath.split(/(\\|\/)/).pop();

const DownloadTable = ({ documents, onEdit, onDelete }) => {
    return (
        <div className="py-5">
            <table className="min-w-full table-fixed bg-white">
                <thead className="bg-gray-200 text-center">
                    <tr>
                        <th className="w-1/3 px-4 py-2">Document Name</th>
                        <th className="w-1/3 px-4 py-2">Attachment</th>
                        <th className="w-1/3 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {documents.length > 0 ? (
                        documents.map((doc, index) => (
                            <tr key={index} className="border-b">
                                <td className="px-4 py-2">{doc.documentName}</td>
                                <td className="px-4 py-2">
                                    {doc.attachment ? (
                                        <a
                                            href={`http://localhost:8001/uploads/${doc.attachment}`} // Ensure correct path
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            {getFileName(doc.attachment)} {/* Show only the file name */}
                                        </a>
                                    ) : (
                                        'No attachment'
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    <button
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
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="py-4 text-center">
                                No documents available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DownloadTable;
