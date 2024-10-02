import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createAlumni, updateAlumni } from "../../redux/actions/alumni.action";

const AddAlumniPopup = ({ onClose, alumniToEdit }) => {
    const dispatch = useDispatch();
    const [alumniData, setAlumniData] = useState({
        class: '',
        batch: '',
        totalStudents: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (alumniToEdit) {
            setAlumniData({
                class: alumniToEdit.class,
                batch: alumniToEdit.batch,
                totalStudents: alumniToEdit.totalStudents,
            });
        }
    }, [alumniToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAlumniData({
            ...alumniData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            class: alumniData.class,
            batch: alumniData.batch,
            totalStudents: alumniData.totalStudents,
        };

        try {
            if (alumniToEdit) {
                await dispatch(updateAlumni({ _id: alumniToEdit._id, alumniData: formData }));
            } else {
                await dispatch(createAlumni(formData));
            }
            onClose();
        } catch (error) {
            const message = error?.error || 'An error occurred.';
            setErrorMessage(typeof message === 'string' ? message : JSON.stringify(message));
        }
    };


    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white px-20 py-10 rounded-lg w-3/6'>
                <h2 className='text-xl font-bold mb-4'>
                    {alumniToEdit ? 'Edit Alumni' : 'Add New Alumni'}
                </h2>
                {errorMessage && <div className='text-red-500 mb-4'>{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                            Alumni Class
                        </label>
                        <input
                            type='number'
                            name='class'
                            value={alumniData.class}
                            onChange={handleChange}
                            className='w-full p-2 border border-gray-300 rounded'
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                            Batch
                        </label>
                        <select
                            name='batch'
                            value={alumniData.batch}
                            onChange={handleChange}
                            className='w-full p-2 border border-gray-300 rounded'
                            required
                        >
                            <option value='' disabled>Select Batch</option>
                            <option value='Fall'>Fall</option>
                            <option value='Spring'>Spring</option>
                        </select>
                    </div>


                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                            Total Students
                        </label>
                        <input
                            type='number'
                            name='totalStudents'
                            value={alumniData.totalStudents}
                            onChange={handleChange}
                            className='w-full p-2 border border-gray-300 rounded'
                            required
                        />
                    </div>

                    <div className='flex justify-end'>
                        <button
                            type='button'
                            className='mr-2 px-6 py-2 bg-gray-500 text-white rounded'
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='px-4 py-2 bg-secondary-color text-white rounded'
                        >
                            {alumniToEdit ? 'Update Alumni' : 'Add Alumni'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAlumniPopup;
