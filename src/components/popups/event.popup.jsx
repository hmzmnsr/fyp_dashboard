import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createEvent, updateEvent } from "../../redux/actions/event.action";
import { unwrapResult } from '@reduxjs/toolkit';

const AddEventPopup = ({ onClose, eventToEdit }) => {
    const dispatch = useDispatch();
    const [eventData, setEventData] = useState({
        name: '',
        venue: '',
        date: '',
        image: null,
    }); 

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (eventToEdit) {
            const formattedDate = new Date(eventToEdit.date).toISOString().slice(0, 16);
            setEventData({
                name: eventToEdit.name,
                venue: eventToEdit.venue,
                date: formattedDate,
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('name', eventData.name);
        formData.append('venue', eventData.venue);
        formData.append('date', eventData.date);
        if (eventData.image) {
            formData.append('image', eventData.image);
        }

        try {
            if (eventToEdit) {
                const actionResult = await dispatch(updateEvent({ id: eventToEdit._id, formData }));
                unwrapResult(actionResult);
            } else {
                const actionResult = await dispatch(createEvent(formData));
                unwrapResult(actionResult);
            }
            onClose();
        } catch (err) {
            setError('Failed to save event');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white px-20 py-10 rounded-lg w-3/6">
                <h2 className="text-xl font-bold mb-4">
                    {eventToEdit ? 'Edit Event' : 'Add New Event'}
                </h2>
                {error && <p className="text-red-500">{typeof error === 'object' ? error.message : error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Event Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={eventData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Venue
                        </label>
                        <input
                            type="text"
                            name="venue"
                            value={eventData.venue}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            name="date"
                            value={eventData.date}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Event Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-2 px-6 py-2 bg-gray-500 text-white rounded"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`px-4 py-2 ${loading ? 'bg-gray-400' : 'bg-secondary-color'} text-white rounded`}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : eventToEdit ? 'Update Event' : 'Add Event'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default AddEventPopup;
