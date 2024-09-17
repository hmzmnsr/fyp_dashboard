import React, { useState } from 'react';
import FlexContainer from '../../components/containers/flex.container';
import GalleryPopup from '../../components/popups/gallery.popup';
import GalleryTable from "../../components/tables/gallery.table";

const Gallery = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [albums, setAlbums] = useState([]);

    const handleAddAlbum = (newAlbum) => {
        setAlbums([...albums, newAlbum]);
        setShowPopup(false);
    };

    const handleDeleteAlbum = (index) => {
        setAlbums(albums.filter((_, i) => i !== index));
    };

    const handleEditAlbum = (index) => {
        console.log('Edit album:', index);
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
                <GalleryPopup setShowPopup={setShowPopup} onAddAlbum={handleAddAlbum} />
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
