import React, { useState } from 'react';
import api from '../../services/api';

const ChangePasswordForm = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const validatePasswords = () => {
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return "All fields are required.";
        }
        if (newPassword !== confirmNewPassword) {
            return "New password and confirm password do not match.";
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validatePasswords();
        if (validationError) {
            setError(validationError);
            clearMessagesAfterDelay();
            return;
        }

        try {
            const response = await api.patch('/users/password', {
                oldPassword,
                newPassword
            });
            if (response.status === 200) {
                setSuccess('Password changed successfully.');
                setOldPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
                clearMessagesAfterDelay();
                setIsEditing(false);
            }
        } catch (err) {
            setError('Failed to change password. Please check your old password.');
            clearMessagesAfterDelay();
        }
    };

    const clearMessagesAfterDelay = () => {
        setTimeout(() => {
            setError('');
            setSuccess('');
        }, 2000);
    };

    return (
        <div className='bg-white shadow-2xl rounded-lg p-10 relative mt-6'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-2xl font-semibold'>Change Password</h2>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-8 py-2 rounded-md ${
                        isEditing ? 'bg-gray-500 hover:bg-gray-600' : 'bg-secondary-color hover:bg-blue-700'
                    } text-white`}
                >
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
            </div>
            <form className='space-y-4' onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <label htmlFor='oldPassword' className='text-gray-700 mb-2'>
                        Old Password
                    </label>
                    <input
                        type='password'
                        id='oldPassword'
                        name='oldPassword'
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className='w-full border border-gray-300 p-2 rounded-md'
                        disabled={!isEditing}
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
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className='w-full border border-gray-300 p-2 rounded-md'
                        disabled={!isEditing}
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
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className='w-full border border-gray-300 p-2 rounded-md'
                        disabled={!isEditing} 
                    />
                </div>
                {isEditing && (
                    <button
                        type='submit'
                        className='bg-secondary-color hover:bg-blue-700 text-white py-3 px-4 rounded-md mb-2'
                    >
                        Update Password
                    </button>
                )}
                {error && <div className='text-red-500 mb-4'>{error}</div>}
                {success && <div className='text-green-500 mb-4'>{success}</div>}
            </form>
        </div>
    );
};

export default ChangePasswordForm;
