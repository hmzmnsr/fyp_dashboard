import React, { useState } from 'react';
import FlexContainer from "../../components/containers/flex.container";
import ProfilePopup from "../../components/popups/profile.popup";
import ProfileTable from "../../components/tables/profile.table";

const Profiles = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [profiles, setProfiles] = useState([
        { id: '1', name: 'John Doe', qualification: 'PhD', email: 'john@example.com', areaOfInterest: 'Machine Learning', about: 'Experienced in AI' }
    ]);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
        setSelectedProfile(null);
    };

    const handleAddOrUpdate = (profile) => {
        if (selectedProfile) {
            setProfiles(profiles.map(p => (p.id === selectedProfile.id ? { ...p, ...profile } : p)));
        } else {
            setProfiles([...profiles, { id: Date.now().toString(), ...profile }]);
        }
        setIsPopupOpen(false);
    };

    const handleEdit = (profile) => {
        setSelectedProfile(profile);
        setIsPopupOpen(true);
    };

    const handleDelete = (profile) => {
        setProfiles(profiles.filter(p => p.id !== profile.id));
    };

    return (
        <FlexContainer className='flex-col w-full px-16 pt-12'>
            <div className='grid grid-cols-12'>
                <div className='col-span-9 text-primary-color text-3xl font-bold'>
                    Profiles Management
                </div>
                <div className='col-span-3 flex justify-end'>
                    <button
                        className='px-9 py-3 bg-secondary-color rounded-xl text-white'
                        onClick={togglePopup}
                    >
                        Add Profile
                    </button>
                </div>
            </div>

            {isPopupOpen && (
                <ProfilePopup
                    onClose={togglePopup}
                    onAdd={handleAddOrUpdate}
                    profile={selectedProfile}
                />
            )}

            <ProfileTable 
                profiles={profiles} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
            />
        </FlexContainer>
    );
};

export default Profiles;
