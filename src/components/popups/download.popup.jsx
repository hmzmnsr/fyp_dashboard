import React, { useState } from 'react';

const AddDownloadPopup = ({ setShowPopup, addDocument, documentToEdit }) => {
    const [documentName, setDocumentName] = useState(documentToEdit ? documentToEdit.documentName : '');
    const [attachment, setAttachment] = useState(null);

    const handleSubmit = () => {
        if (documentName && attachment) {
            addDocument({ documentName, attachment });
            setShowPopup(false);
        } else {
            alert('Please fill out all fields');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg w-3/6">
                <h2 className="text-2xl font-bold mb-4">
                    {documentToEdit ? 'Edit Document' : 'Add Document'}
                </h2>

                <label className="block mb-2">Document Name:</label>
                <input
                    type="text"
                    className="w-full mb-4 p-2 border"
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                />

                <label className="block mb-2">Attachment:</label>
                <input
                    type="file"
                    className="w-full mb-4 p-2 border"
                    onChange={(e) => setAttachment(e.target.files[0])}
                />

                <div className="flex justify-end">
                    <button
                        className="px-5 py-2 bg-gray-300 hover:bg-gray-400 rounded mr-4"
                        onClick={() => setShowPopup(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-8 py-2 bg-secondary-color text-white rounded"
                        onClick={handleSubmit}
                    >
                        {documentToEdit ? 'Update' : 'Add'}
                    </button>
                </div>
            </div>
        </div>
    );
};


export default AddDownloadPopup; 
