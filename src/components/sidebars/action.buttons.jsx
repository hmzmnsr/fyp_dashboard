import React from 'react';
import { FaBook, FaDownload, FaCalendarAlt, FaChalkboardTeacher, FaImage, FaWpforms } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import FlexContainer from '../containers/flex.container';

const ActionButton = () => {
    return (
        <FlexContainer className='flex-col text-white items-start text-lg mt-10 font-light'>
            <NavLink
                to="/programs"
                className={({ isActive }) =>
                    `flex items-center space-x-3 w-full py-4 pl-10 ${isActive ? 'bg-secondary-color' : 'hover:bg-secondary-color'
                    }`
                }
            >
                <FaBook />
                <span>Programs</span>
            </NavLink>

            <NavLink
                to="/downloads"
                className={({ isActive }) =>
                    `flex items-center space-x-3 w-full py-4 pl-10 ${isActive ? 'bg-secondary-color' : 'hover:bg-secondary-color'
                    }`
                }
            >
                <FaDownload />
                <span>Downloads</span>
            </NavLink>

            <NavLink
                to="/events"
                className={({ isActive }) =>
                    `flex items-center space-x-3 w-full py-4 pl-10 ${isActive ? 'bg-secondary-color' : 'hover:bg-secondary-color'
                    }`
                }
            >
                <FaCalendarAlt />
                <span>Events</span>
            </NavLink>

            <NavLink
                to="/faculty"
                className={({ isActive }) =>
                    `flex items-center space-x-3 w-full py-4 pl-10 ${isActive ? 'bg-secondary-color' : 'hover:bg-secondary-color'
                    }`
                }
            >
                <FaChalkboardTeacher />
                <span>Faculty</span>
            </NavLink>

            <NavLink
                to="/gallery"
                className={({ isActive }) =>
                    `flex items-center space-x-3 w-full py-4 pl-10 ${isActive ? 'bg-secondary-color' : 'hover:bg-secondary-color'
                    }`
                }
            >
                <FaImage />
                <span>Gallery</span>
            </NavLink>

            <NavLink
                to="/settings"
                className={({ isActive }) =>
                    `flex items-center space-x-3 w-full py-4 pl-10 ${isActive ? 'bg-secondary-color' : 'hover:bg-secondary-color'
                    }`
                }
            >
                <FaWpforms />
                <span>Settings</span>
            </NavLink>
        </FlexContainer>
    );
};

export default ActionButton;
