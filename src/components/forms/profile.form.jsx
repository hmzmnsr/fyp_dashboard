import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ProfileForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');  // New password state
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get('/users/profile');
                setUsername(data.name);
                setEmail(data.email);
            } catch (err) {
                setError('Failed to fetch profile data.');
                clearMessagesAfterDelay();
            }
        };
        fetchProfile();
    }, []);

    const validateProfile = () => {
        if (!username || !email || !password) {
            return "All fields, including password, are required.";
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateProfile();
        if (validationError) {
            setError(validationError);
            clearMessagesAfterDelay();
            return;
        }

        try {
            const response = await api.patch('/users/profile', {
                name: username,
                email: email,
                password: password   // Include password in request
            });
            if (response.status === 200) {
                setSuccess('Profile updated successfully.');
                setError('');
                clearMessagesAfterDelay();
            }
        } catch (err) {
            setError('Failed to update profile.');
            setSuccess('');
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
        <div className='bg-white shadow-2xl rounded-lg p-10 relative'>
            <div className='grid grid-cols-12'>
                <h2 className='col-span-9 text-2xl font-semibold mb-4'>Profile</h2>
            </div>
            <form className='space-y-4' onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <label htmlFor='username' className='text-gray-700 mb-2'>Name</label>
                    <input
                        type='text'
                        id='username'
                        name='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='w-full border border-gray-300 p-2 rounded-md'
                        required
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='email' className='text-gray-700 mb-2'>Email Address</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full border border-gray-300 p-2 rounded-md'
                        required
                    />
                </div>

                {/* Password Field */}
                <div className='flex flex-col'>
                    <label htmlFor='password' className='text-gray-700 mb-2'>Password</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full border border-gray-300 p-2 rounded-md'
                        required
                    />
                </div>

                <button
                    type='submit'
                    className='bg-secondary-color hover:bg-blue-700 text-white py-3 px-4 rounded-md mb-2'
                >
                    Save Changes
                </button>
                {error && (
                    <div className='text-red-500 mb-4'>
                        {error}
                    </div>
                )}
                {success && (
                    <div className='text-green-500 mb-4'>
                        {success}
                    </div>
                )}
            </form>
        </div>
    );
};

export default ProfileForm;
