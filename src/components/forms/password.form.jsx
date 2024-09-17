import React, { useState } from 'react';

const ChangePasswordForm = ({ formData, handleInputChange, handlePasswordSubmit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const toggleEdit = () => {
        setIsEditing(prev => !prev);
        if (!isEditing) {
            setMessage('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmNewPassword) {
            setMessage('Passwords do not match');
            setMessageType('error');
            return;
        }

        try {
            await handlePasswordSubmit();
            setMessage('Password changed successfully');
            setMessageType('success');
        } catch (error) {
            setMessage('Failed to change password');
            setMessageType('error');
        }
    };

    return (
        <div className='bg-white shadow-2xl rounded-lg p-10 relative mt-6'>
            <div className='grid grid-cols-12'>
                <h2 className='col-span-9 text-2xl font-semibold mb-4'>Change Password</h2>
                <button
                    onClick={toggleEdit}
                    className='col-span-3 bg-secondary-color text-white rounded-md w-2/6 ml-auto'
                >
                    <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                </button>
            </div>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='flex flex-col'>
                    <label htmlFor='oldPassword' className='text-gray-700 mb-2'>
                        Old Password
                    </label>
                    <input
                        type='password'
                        id='oldPassword'
                        name='oldPassword'
                        value={formData.oldPassword}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className='w-full border border-gray-300 p-2 rounded-md'
                        required={isEditing}
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='newPassword' className='text-gray-700 mb-2'>
                        New Password
                    </label>
                    <input
                        type='password'
                        id='newPassword'
                        name='newPassword'
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className='w-full border border-gray-300 p-2 rounded-md'
                        required={isEditing}
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='confirmNewPassword' className='text-gray-700 mb-2'>
                        Confirm New Password
                    </label>
                    <input
                        type='password'
                        id='confirmNewPassword'
                        name='confirmNewPassword'
                        value={formData.confirmNewPassword}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className='w-full border border-gray-300 p-2 rounded-md'
                        required={isEditing}
                    />
                </div>

                {isEditing && (
                    <>
                        <button
                            type='submit'
                            className='bg-secondary-color text-white py-3 px-4 rounded-md'
                        >
                            Update Password
                        </button>
                    </>
                )}

                {message && (
                    <p className={`mt-4 ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
};

export default ChangePasswordForm;
