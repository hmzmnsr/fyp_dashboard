import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FlexContainer from '../../components/containers/flex.container';
import AddEventPopup from '../../components/popups/event.popup';
import EventTable from '../../components/tables/event.table';
import { fetchEvent, createEvent, updateEvent, deleteEvent } from "../../redux/actions/event.action";

const Events = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [editEventIndex, setEditEventIndex] = useState(null);

    const dispatch = useDispatch();
    const { events, loading, error } = useSelector((state) => state.event);

    useEffect(() => {
        dispatch(fetchEvent());
    }, [dispatch]);

    const handleAddOrUpdateEvent = (eventData) => {
        const formData = new FormData();
        formData.append('name', eventData.name);
        formData.append('venue', eventData.venue);
        formData.append('date', eventData.date);
        if (eventData.image) {
            formData.append('image', eventData.image);
        }

        if (editEventIndex !== null) {
            const eventId = events[editEventIndex]._id;
            dispatch(updateEvent({ id: eventId, formData }));
            setEditEventIndex(null);
        } else {
            dispatch(createEvent(formData));
        }

        setShowPopup(false);
    };

    const handleEditEvent = (index) => {
        setEditEventIndex(index);
        setShowPopup(true);
    };

    const handleAddEvent = () => {
        setEditEventIndex(null);
        setShowPopup(true); 
    };

    const handleDeleteEvent = (index) => {
        const eventId = events[index]._id;
        dispatch(deleteEvent(eventId));
    };

    return (
        <FlexContainer className="flex-col w-full px-16 pt-12">
            <div className="grid grid-cols-12">
                <div className="col-span-9 text-primary-color text-3xl font-bold">
                    Events Management
                </div>
                <div className="col-span-3 flex justify-end">
                    <button
                        className="px-10 py-3 bg-secondary-color rounded-xl text-white"
                        onClick={handleAddEvent}
                    >
                        Add Event
                    </button>
                </div>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <EventTable
                events={events}
                onEdit={handleEditEvent}
                onDelete={handleDeleteEvent}
            />

            {showPopup && (
                <AddEventPopup
                    onClose={() => setShowPopup(false)} 
                    onAddOrUpdateEvent={handleAddOrUpdateEvent}
                    eventToEdit={editEventIndex !== null ? events[editEventIndex] : null}
                />
            )}
        </FlexContainer>
    );
};

export default Events;
