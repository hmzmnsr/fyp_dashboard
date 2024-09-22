import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlumni, createAlumni, updateAlumni, deleteAlumni } from "../../redux/actions/alumni.action";
import FlexContainer from '../../components/containers/flex.container';
import AddAlumniPopup from '../../components/popups/alumni.popup';
import AlumniTable from '../../components/tables/alumni.table';

const Alumni = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [editingAlumni, setEditingAlumni] = useState(null);

    const dispatch = useDispatch();
    const { alumni, loading, error } = useSelector((state) => state.alumni);

    useEffect(() => {
        dispatch(fetchAlumni());
    }, [dispatch]);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const handleAddOrUpdateAlumni = async (newAlumni) => {
        setIsPopupOpen(false);
        if (editingAlumni) {
            await dispatch(updateAlumni({ id: editingAlumni._id, alumniData: newAlumni }));
        } else {
            await dispatch(createAlumni(newAlumni));
        }
        dispatch(fetchAlumni());
        setEditingAlumni(null);
    };

    const handleEditAlumni = (alumni) => {
        setEditingAlumni(alumni);
        setIsPopupOpen(true);
    };

    const handleDeleteAlumni = (id) => {
        dispatch(deleteAlumni(id));
      };

    return (
        <FlexContainer className='flex-col w-full px-16 pt-12'>
            <div className='grid grid-cols-12'>
                <div className='col-span-9 text-primary-color text-3xl font-bold'>
                    Alumni Management
                </div>
                <div className='col-span-3 flex justify-end'>
                    <button
                        className='px-10 py-3 bg-secondary-color rounded-xl text-white'
                        onClick={togglePopup}
                    >
                        Add Alumni
                    </button>
                </div>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error loading alumni: {error}</div>
            ) : (
                <AlumniTable
                    alumnis={alumni}
                    onEdit={handleEditAlumni}
                    onDelete={handleDeleteAlumni}
                />
            )}

            {isPopupOpen && (
                <AddAlumniPopup
                    onClose={togglePopup}
                    onAlumniEvent={handleAddOrUpdateAlumni}
                    alumniToEdit={editingAlumni}
                />
            )}
        </FlexContainer>
    );
};

export default Alumni;
