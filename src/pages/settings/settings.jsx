import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FlexContainer from '../../components/containers/flex.container';
import ProfileForm from '../../components/forms/profile.form';
import ChangePasswordForm from '../../components/forms/password.form';
import { getProfile } from "../../redux/actions/user.action";

const Settings = () => {
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.profile);

    useEffect(() => {
        if (!profile) {
            dispatch(getProfile());
        }
    }, [dispatch, profile]);

    return (
        <FlexContainer className='flex-col w-full px-16 pt-12'>
            <div className='grid grid-cols-12 gap-4'>
                <div className='col-span-9 text-primary-color text-3xl font-bold'>
                    Settings Management
                </div>
            </div>
            <div className='mt-4 text-lg text-gray-600'>
                <p>
                    Welcome back, <span className='font-semibold'>{profile ? profile.name : 'Loading...'}</span>!
                </p>
            </div>

            <div className='mt-6'>
                <ProfileForm />
            </div>

            <div className='mt-6'>
                <ChangePasswordForm />
            </div>
            <div className='mt-10 text-white'>space</div>
        </FlexContainer>
    );
};

export default Settings;
