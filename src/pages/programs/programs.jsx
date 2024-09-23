import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import FlexContainer from '../../components/containers/flex.container';

const Programs = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        
        if (location.pathname === '/programs') {
            navigate('/programs/adpcs');
        }
    }, [navigate, location.pathname]);

    return (
        <FlexContainer className="flex-col w-full px-16 pt-12">
            <div className="grid grid-cols-12">
                <div className='col-span-9 text-primary-color text-3xl font-bold'>
                    Programs Management
                </div>
            </div>

            {/* Top Navbar */}
            <div className="grid grid-cols-12 pt-6">
                <div className="col-span-12">
                    <nav className="flex space-x-8 text-primary-color text-xl font-semibold">
                        <NavLink
                            to="/programs/adpcs"
                            className={({ isActive }) => `hover:cursor-pointer ${isActive ? 'border-b-4 pb-3 border-red-500' : ''}`}
                        >
                            ADP IN COMPUTER SCIENCE
                        </NavLink>
                        <NavLink
                            to="/programs/bscs"
                            className={({ isActive }) => `hover:cursor-pointer ${isActive ? 'border-b-4 pb-3 border-red-500' : ''}`}
                        >
                            BACHELORS IN COMPUTER SCIENCE
                        </NavLink>
                        <NavLink
                            to="/programs/bsse"
                            className={({ isActive }) => `hover:cursor-pointer ${isActive ? 'border-b-4 pb-3 border-red-500' : ''}`}
                        >
                            BACHELORS IN SOFTWARE ENGINEERING
                        </NavLink>
                        <NavLink
                            to="/programs/mscs"
                            className={({ isActive }) => `hover:cursor-pointer ${isActive ? 'border-b-4 pb-3 border-red-500' : ''}`}
                        >
                            MASTERS IN COMPUTER SCIENCE
                        </NavLink>
                        <NavLink
                            to="/programs/phdcs"
                            className={({ isActive }) => `hover:cursor-pointer ${isActive ? 'border-b-4 pb-3 border-red-500' : ''}`}
                        >
                            PHD IN COMPUTER SCIENCE
                        </NavLink>
                    </nav>
                </div>
            </div>

            <Outlet />
        </FlexContainer>
    );
};

export default Programs;
