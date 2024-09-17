import React, { useState, useEffect } from 'react';

const AddEventPopup = ({ onClose, onAddEvent, eventToEdit }) => {
    const [eventData, setEventData] = useState({
        name: '',
        venue: '',
        date: '',
        image: null,
    });

    useEffect(() => {
        if (eventToEdit) {
            setEventData({
                name: eventToEdit.name,
                venue: eventToEdit.venue,
                date: eventToEdit.date,
                image: eventToEdit.image || null,
            });
        }
    }, [eventToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({
            ...eventData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEventData({
                ...eventData,
                image: file,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddEvent(eventData);
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white px-20 py-10 rounded-lg w-3/6'>
                <h2 className='text-xl font-bold mb-4'>
                    {eventToEdit ? 'Edit Event' : 'Add New Event'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                            Event Name
                        </label>
                        <input
                            type='text'
                            name='name'
                            value={eventData.name}
                            onChange={handleChange}
                            className='w-full p-2 border border-gray-300 rounded'
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                            Venue
                        </label>
                        <input
                            type='text'
                            name='venue'
                            value={eventData.venue}
                            onChange={handleChange}
                            className='w-full p-2 border border-gray-300 rounded'
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                            Date & Time
                        </label>
                        <input
                            type='datetime-local'
                            name='date'
                            value={eventData.date}
                            onChange={handleChange}
                            className='w-full p-2 border border-gray-300 rounded'
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                            Event Image
                        </label>
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
                            className='mr-2 px-6 py-2 bg-gray-500 text-white rounded'
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='px-4 py-2 bg-secondary-color text-white rounded'
                        >
                            {eventToEdit ? 'Update Event' : 'Add Event'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEventPopup;
