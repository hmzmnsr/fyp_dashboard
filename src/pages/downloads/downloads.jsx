import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FlexContainer from '../../components/containers/flex.container';
import AddDownloadPopup from "../../components/popups/download.popup";
import DownloadTable from "../../components/tables/download.table";
import { fetchDownloads, createDownload, updateDownload, deleteDownload } from "../../redux/actions/download.action";

const Downloads = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [editDocumentIndex, setEditDocumentIndex] = useState(null);

    const dispatch = useDispatch();
    const { downloads, loading, error } = useSelector((state) => state.download);

    useEffect(() => {
        dispatch(fetchDownloads());
    }, [dispatch]);

    const addDocument = (newDocument) => {
        const formData = new FormData();
        formData.append('documentName', newDocument.documentName);
        formData.append('attachment', newDocument.attachment);

        if (editDocumentIndex !== null) {
            const documentId = downloads[editDocumentIndex]._id;
            dispatch(updateDownload({ id: documentId, formData }));
            setEditDocumentIndex(null);
        } else {
            dispatch(createDownload(formData));
        }
    };

    const handleEdit = (index) => {
        setEditDocumentIndex(index);
        setShowPopup(true);
    };

    const handleDelete = (index) => {
        const documentId = downloads[index]._id;
        dispatch(deleteDownload(documentId));
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

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <DownloadTable
                documents={downloads}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {showPopup && (
                <AddDownloadPopup
                    setShowPopup={setShowPopup}
                    addDocument={addDocument}
                    documentToEdit={editDocumentIndex !== null ? downloads[editDocumentIndex] : null}
                />
            )}
        </FlexContainer>
    );
};

export default Downloads;  
