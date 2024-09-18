import React, { useState } from 'react';
import FlexContainer from '../../components/containers/flex.container';
import AddDownloadPopup from "../../components/popups/download.popup";
import DownloadTable from "../../components/tables/download.table";

const Downloads = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [editDocumentIndex, setEditDocumentIndex] = useState(null);

    const addDocument = (newDocument) => {
        if (editDocumentIndex !== null) {
            const updatedDocuments = [...documents];
            updatedDocuments[editDocumentIndex] = newDocument;
            setDocuments(updatedDocuments);
            setEditDocumentIndex(null);
        } else {
            setDocuments([...documents, newDocument]);
        } 
    };

    const handleEdit = (index) => {
        setEditDocumentIndex(index);
        setShowPopup(true);
    };

    const handleDelete = (index) => {
        const updatedDocuments = documents.filter((_, i) => i !== index);
        setDocuments(updatedDocuments);
    };

    return (
        <FlexContainer className="flex-col w-full px-16 pt-12">
            <div className="grid grid-cols-12">
                <div className="col-span-9 text-primary-color text-3xl font-bold">
                    Downloads Management
                </div>
                <div className="col-span-3 flex justify-end">
                    <button
                        className="px-5 py-3 bg-secondary-color rounded-xl text-white"
                        onClick={() => setShowPopup(true)}
                    >
                        Add Documents
                    </button>
                </div>
            </div>

            <DownloadTable
                documents={documents}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            
            {showPopup && (
                <AddDownloadPopup
                    setShowPopup={setShowPopup}
                    addDocument={addDocument}
                    documentToEdit={editDocumentIndex !== null ? documents[editDocumentIndex] : null}
                />
            )}
        </FlexContainer>
    );
};

export default Downloads;
