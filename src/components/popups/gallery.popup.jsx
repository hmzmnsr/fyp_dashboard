import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createAlbum, updateAlbum } from "../../redux/actions/gallery.action.jsx";

const GalleryPopup = ({ setShowPopup, onAddAlbum, editAlbum }) => {
    const [albumName, setAlbumName] = useState('');
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [images, setImages] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (editAlbum) {
            setAlbumName(editAlbum.name);
            setCoverPhoto(editAlbum.coverPhoto);
            setImages(editAlbum.images || []);
        }
    }, [editAlbum]);

    const handleCoverPhotoChange = (e) => {
        setCoverPhoto(e.target.files[0]);
    };

    const handleImagesChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const albumData = {
            name: albumName,
            coverPhoto,
            images,
        };

        try {
            if (editAlbum) {
                await dispatch(updateAlbum({ _id: editAlbum._id, albumData }));
            } else {
                await dispatch(createAlbum(albumData));
            }
            onAddAlbum();
            setShowPopup(false);
        } catch (error) {
            console.error('Error saving album:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white px-20 py-10 rounded-lg w-3/6">
                <h2 className="text-2xl font-bold mb-4">
                    {editAlbum ? 'Edit Album' : 'Add New Album'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Album Name</label>
                        <input
                            type="text"
                            value={albumName}
                            onChange={(e) => setAlbumName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Album Cover Photo</label>
                        <input
                            type="file"
                            onChange={handleCoverPhotoChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            accept="image/*"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Select Images</label>
                        <input
                            type="file"
                            onChange={handleImagesChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            accept="image/*"
                            multiple
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => setShowPopup(false)}
                            className="px-6 py-2 mr-2 bg-gray-500 text-white rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-2 bg-secondary-color text-white rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GalleryPopup;