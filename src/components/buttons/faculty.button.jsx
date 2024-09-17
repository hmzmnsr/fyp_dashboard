import React from 'react';

const FacultyButton = ({ label, onClick }) => {
    return (
        <button
            className="mx-32 w-full h-12 rounded-xl bg-secondary-color text-white text-center"
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default FacultyButton;
