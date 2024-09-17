import React from 'react';
import { useDispatch } from 'react-redux';
import FlexContainer from '../containers/flex.container';
import Logo from '../common/logo';
import ActionButton from './action.buttons';
import LogoutButton from '../buttons/logout';
import { useNavigate } from 'react-router-dom';
import { logOut } from "../../redux/reducers/profile.reducer";
import { PageUrls } from '../../utils/enums';

function SideActionBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logOut());
        localStorage.removeItem("token");
        navigate(PageUrls.LOGIN);
    };

    return (
        <FlexContainer className='bg-primary-color w-full h-screen flex-col pt-8 justify-between'>
            <div>
                <Logo />
                <ActionButton />
            </div>
            <LogoutButton onClick={handleLogout} />
        </FlexContainer>
    );
}

export default SideActionBar;
