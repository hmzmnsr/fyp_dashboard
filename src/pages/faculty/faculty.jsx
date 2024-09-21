import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FlexContainer from '../../components/containers/flex.container';
import FacultyTable from '../../components/tables/faculty.table';
import AddFacultyPopup from '../../components/popups/faculty.popup';
import { fetchFaculty, createFaculty, updateFaculty, deleteFaculty } from '../../redux/actions/faculty.action';

const Faculty = () => {
  const dispatch = useDispatch();
  const { faculties, loading, error } = useSelector((state) => state.faculty);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);

  useEffect(() => {
    dispatch(fetchFaculty());
  }, [dispatch]);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setEditingFaculty(null);
  };

  const handleAddOrUpdate = (facultyData) => {
    if (editingFaculty) {
      dispatch(updateFaculty({ id: editingFaculty._id, formData: facultyData })).then(() => {
        dispatch(fetchFaculty());
      });
    } else {
      dispatch(createFaculty(facultyData)).then(() => {
        dispatch(fetchFaculty());
      });
    }
    setIsPopupOpen(false);
  };

  const handleEdit = (faculty) => {
    setEditingFaculty(faculty);
    setIsPopupOpen(true);
  };

  const handleDelete = (faculty) => {
    if (faculty && faculty._id) {
      dispatch(deleteFaculty(faculty._id))
        .then(() => {
          dispatch(fetchFaculty());
        })
        .catch((error) => {
          console.error("Error deleting faculty:", error);
        });
    } else {
      console.error("Faculty not found or undefined.");
    }
  };

  return (
    <FlexContainer className='flex-col w-full px-16 pt-10'>
      <div className='text-primary-color text-3xl font-bold py-2 mb-4'>Faculty Management</div>

      <div className='grid grid-cols-12 mb-2'>
        <div className='col-span-9 text-primary-color font-bold text-xl'>Department's Faculty</div>
        <div className='col-span-3 flex justify-end mr-7'>
          <button
            className='h-12 w-36 rounded-xl bg-secondary-color text-white text-center'
            onClick={togglePopup}
          >
            Add Faculty
          </button>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <FacultyTable data={faculties} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      {isPopupOpen && (
        <AddFacultyPopup
          onClose={togglePopup}
          onAdd={handleAddOrUpdate}
          editingFaculty={editingFaculty}
        />
      )}
    </FlexContainer>
  );
};

export default Faculty;
