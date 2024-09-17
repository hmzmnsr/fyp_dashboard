import React, { useState } from 'react';
import FlexContainer from '../../components/containers/flex.container';
import TableComponent from "../../components/tables/faculty.table"
import DeanPopup from "../../components/popups/dean.popup";
import FacultyPopup from "../../components/popups/faculty.popup"

const Faculty = () => {
    const [isDeanPopupOpen, setIsDeanPopupOpen] = useState(false);
    const [isHODPopupOpen, setIsHODPopupOpen] = useState(false);
    const [isFacultyPopupOpen, setIsFacultyPopupOpen] = useState(false);

    const [deans, setDeans] = useState([]);
    const [hods, setHods] = useState([]);
    const [faculties, setFaculties] = useState([]);

    const toggleDeanPopup = () => setIsDeanPopupOpen(!isDeanPopupOpen);
    const toggleHODPopup = () => setIsHODPopupOpen(!isHODPopupOpen);
    const toggleFacultyPopup = () => setIsFacultyPopupOpen(!isFacultyPopupOpen);

    const handleAddDean = (newDean) => setDeans([...deans, newDean]);
    const handleAddHOD = (newHOD) => setHods([...hods, newHOD]);
    const handleAddFaculty = (newFaculty) => setFaculties([...faculties, newFaculty]);

    return (
        <FlexContainer className='flex-col w-full px-16 pt-10'>
            <div className='text-primary-color text-3xl font-bold py-2 mb-4'>
                Faculty Management
            </div>

            {/* Dean Section */}
            <div className='grid grid-cols-12 my-4'>
                <div className='col-span-9 text-primary-color font-bold text-xl'>
                    Dean of Department
                </div>
                <div className='col-span-3 flex justify-end mr-7'>
                    <button
                        className='h-12 w-36 rounded-xl bg-secondary-color text-white text-center'
                        onClick={toggleDeanPopup}
                    >
                        Add Dean
                    </button>
                </div>
            </div>
            <TableComponent data={deans} />

            <div className='my-6'></div>

            {/* HOD Section */}
            <div className='grid grid-cols-12 my-4'>
                <div className='col-span-9 text-primary-color font-bold text-xl'>
                    Head of Department
                </div>
                <div className='col-span-3 flex justify-end mr-7'>
                    <button
                        className='h-12 w-36 rounded-xl bg-secondary-color text-white text-center'
                        onClick={toggleHODPopup}
                    >
                        Add HOD
                    </button>
                </div>
            </div>
            <TableComponent data={hods} />

            <div className='my-6'></div>

            

            {/* Faculty Section */}
            <div className='grid grid-cols-12 my-4'>
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
            {isDeanPopupOpen && <DeanPopup onClose={toggleDeanPopup} onAdd={handleAddDean} />}
            {isHODPopupOpen && <DeanPopup onClose={toggleHODPopup} onAdd={handleAddHOD} />} {/* Same layout as Dean */}
            {isFacultyPopupOpen && <FacultyPopup onClose={toggleFacultyPopup} onAdd={handleAddFaculty} />} {/* Different layout */}
        </FlexContainer>
    );
};

export default Faculty;
