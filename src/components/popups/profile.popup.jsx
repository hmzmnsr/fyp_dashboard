import React, { useState, useEffect } from 'react';

const ProfilePopup = ({ onClose, onAdd, profile }) => {
    const [name, setName] = useState('');
    const [qualification, setQualification] = useState('');
    const [areaOfInterest, setAreaOfInterest] = useState('');
    const [email, setEmail] = useState('');
    const [about, setAbout] = useState('');

    useEffect(() => {
        if (profile) {
            setName(profile.name);
            setQualification(profile.qualification);
            setAreaOfInterest(profile.areaOfInterest);
            setEmail(profile.email);
            setAbout(profile.about);
        }
    }, [profile]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedProfile = { name, qualification, areaOfInterest, email, about };
        onAdd(updatedProfile);
        onClose();
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white px-20 py-16 rounded-lg w-3/6'>
                <h2 className='text-2xl font-bold mb-6'>{profile ? 'Edit Profile' : 'Add Profile'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Name</label>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-secondary-color'
                            required
                        />
                    </div>

                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Qualification</label>
                        <input
                            type='text'
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-secondary-color'
                            required
                        />
                    </div>

                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Area of Interest</label>
                        <input
                            type='text'
                            value={areaOfInterest}
                            onChange={(e) => setAreaOfInterest(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-secondary-color'
                            required
                        />
                    </div>

                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-secondary-color'
                            required
                        />
                    </div>

                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>About</label>
                        <textarea
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            className='w-full h-28 p-2 border border-gray-300 rounded focus:outline-none focus:border-secondary-color'
                            required
                        />
                    </div>

                    <div className='flex justify-end'>
                        <button
                            type='button'
                            className='mr-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300'
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='px-4 py-2 bg-secondary-color text-white rounded hover:bg-secondary-dark transition duration-300'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfilePopup;
