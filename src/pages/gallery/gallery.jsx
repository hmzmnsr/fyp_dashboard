import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FlexContainer from '../../components/containers/flex.container';
import GalleryPopup from '../../components/popups/gallery.popup';
import GalleryTable from "../../components/tables/gallery.table";
import { fetchAlbums, deleteAlbum } from '../../redux/actions/gallery.action.jsx';

const Gallery = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [editAlbum, setEditAlbum] = useState(null);
    const dispatch = useDispatch();
    const albums = useSelector(state => state.gallery.albums || []);

    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch]);

    const handleAddAlbum = () => {
        setShowPopup(false);
        setEditAlbum(null);
        dispatch(fetchAlbums());
    };

    const handleDeleteAlbum = (index) => {
        const albumId = albums[index]._id;
        dispatch(deleteAlbum(albumId)).then(() => {
            dispatch(fetchAlbums());
        });
    };

    const handleEditAlbum = (index) => {
        const albumToEdit = albums[index];
        setEditAlbum(albumToEdit); 
        setShowPopup(true);       
    };

    return (
        <FlexContainer className='flex-col w-full px-16 pt-12'>
            <div className='grid grid-cols-12'>
                <div className='col-span-9 text-primary-color text-3xl font-bold'>
                    Gallery Management
                </div>
                <div className='col-span-3 flex justify-end'>
                    <button
                        className='px-10 py-3 bg-secondary-color rounded-xl text-white'
                        onClick={() => setShowPopup(true)}
                    >
                        Add Album
                    </button>
                </div>
            </div>

            {showPopup && (
                <GalleryPopup
                    setShowPopup={setShowPopup}
                    onAddAlbum={handleAddAlbum}
                    editAlbum={editAlbum}
                />
            )}

            <GalleryTable
                albums={albums}
                onEdit={handleEditAlbum}
                onDelete={handleDeleteAlbum}
            />
        </FlexContainer>
    );
};

export default Gallery;