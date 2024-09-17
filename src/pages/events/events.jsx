import React, { useState } from 'react';
import FlexContainer from '../../components/containers/flex.container';
import AddEventPopup from "../../components/popups/event.popup";
import EventTable from "../../components/tables/event.table";

const Events = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const handleAddOrUpdateEvent = (newEvent) => {
        if (editingEvent) {
            const updatedEvents = events.map(event =>
                event === editingEvent ? newEvent : event
            );
            setEvents(updatedEvents);
            setEditingEvent(null);
        } else {
            setEvents([...events, newEvent]);
        }
        setIsPopupOpen(false);
    };

    const handleEditEvent = (event) => {
        setEditingEvent(event);
        setIsPopupOpen(true);
    };

    const handleDeleteEvent = (eventToDelete) => {
        setEvents(events.filter(event => event !== eventToDelete));
    };

    return (
        <FlexContainer className='flex-col w-full px-16 pt-12'>
            <div className='grid grid-cols-12'>
                <div className='col-span-9 text-primary-color text-3xl font-bold '>
                    Events Management
                </div>
                <div className='col-span-3 flex justify-end'>
                    <button 
                        className='px-10 py-3 bg-secondary-color rounded-xl text-white' 
                        onClick={togglePopup}
                    >
                        Add Event
                    </button>
                </div>
            </div>
            
            <EventTable 
                events={events} 
                onEdit={handleEditEvent} 
                onDelete={handleDeleteEvent} 
            />

            {isPopupOpen && (
                <AddEventPopup
                    onClose={togglePopup}
                    onAddEvent={handleAddOrUpdateEvent}
                    eventToEdit={editingEvent}
                />
            )}
        </FlexContainer>
    );
};

export default Events;
