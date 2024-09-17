// ProfileForm.js
import React, { useState } from 'react';

const ProfileForm = ({ formData, handleInputChange, handleProfileSubmit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const toggleEdit = () => {
        setIsEditing(prev => !prev);
        setMessage('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleProfileSubmit();
        setMessage('Profile updated successfully');
        setMessageType('success');
        setIsEditing(false);
    };

    return (
        <div className='bg-white shadow-2xl rounded-lg p-10 relative'>
            <div className='grid grid-cols-12'>
                <h2 className='col-span-9 text-2xl font-semibold mb-4'>Profile</h2>
                <button
                    onClick={toggleEdit}
                    className='col-span-3 bg-secondary-color text-white rounded-md w-2/6 ml-auto'
                >
                    <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                </button>
            </div>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='flex flex-col'>
                    <label htmlFor='username' className='text-gray-700 mb-2'>
                        Name
                    </label>
                    <input
                        type='text'
                        id='username'
                        name='username'
                        value={formData.username}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className='w-full border border-gray-300 p-2 rounded-md'
                        required
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='email' className='text-gray-700 mb-2'>
                        Email Address
                    </label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className='w-full border border-gray-300 p-2 rounded-md'
                        required
                    />
                </div>
                {isEditing && (
                    <>
                        <button
                            type='submit'
                            className='bg-secondary-color text-white py-3 px-4 rounded-md'
                        >
                            Save Changes
                        </button>
                        {message && (
                            <p className={`mt-4 ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                {message}
                            </p>
                        )}
                    </>
                )}
            </form>
        </div>
    );
};

export default ProfileForm;
