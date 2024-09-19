import React, { useState } from 'react';
import FlexContainer from '../../components/containers/flex.container';
import TableComponent from "../../components/tables/faculty.table"
import FacultyPopup from "../../components/popups/faculty.popup"

const Faculty = () => {
    const [isFacultyPopupOpen, setIsFacultyPopupOpen] = useState(false);

    const [faculties, setFaculties] = useState([]);

    const toggleFacultyPopup = () => setIsFacultyPopupOpen(!isFacultyPopupOpen);

    const handleAddFaculty = (newFaculty) => setFaculties([...faculties, newFaculty]);

    return (
        <FlexContainer className='flex-col w-full px-16 pt-10'>
            <div className='text-primary-color text-3xl font-bold py-2 mb-4'>
                Faculty Management
            </div>            

            {/* Faculty Section */}
            <div className='grid grid-cols-12 mb-2'>
                <div className='col-span-9 text-primary-color font-bold text-xl'>
                    Department's Faculty
                </div>
                <div className='col-span-3 flex justify-end mr-7'>
                    <button
                        className='h-12 w-36 rounded-xl bg-secondary-color text-white text-center'
                        onClick={toggleFacultyPopup}
                    >
                        Add Faculty
                    </button>
                </div>
            </div>
            <TableComponent data={faculties} />

            {/* Popups */}
            {isFacultyPopupOpen && <FacultyPopup onClose={toggleFacultyPopup} onAdd={handleAddFaculty} />} {/* Different layout */}
        </FlexContainer>
    );
};

export default Faculty; 