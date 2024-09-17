import React, { useState } from 'react';

const AddFacultyPopup = ({ onClose, onAdd }) => {
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [qualification, setQualification] = useState('');
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({ name, department, qualification, image });
        onClose();
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white px-20 py-10 rounded-lg w-3/6'>
                <h2 className='text-xl font-bold mb-4'>Add Faculty</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Name</label>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded'
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Department</label>
                        <input
                            type='text'
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded'
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Qualification</label>
                        <input
                            type='text'
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded'
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Image</label>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={handleImageChange}
                            className='w-full p-2 border border-gray-300 rounded'
                        />
                    </div>

                    <div className='flex justify-end'>
                        <button
                            type='button'
                            className='mr-4 px-4 py-2 bg-gray-500 text-white rounded'
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='px-4 py-2 bg-secondary-color text-white rounded'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFacultyPopup;
