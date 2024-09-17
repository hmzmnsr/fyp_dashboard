import React, { useEffect, useState } from 'react';
import FlexContainer from '../../components/containers/flex.container';
import ProfileForm from '../../components/forms/profile.form';
import ChangePasswordForm from "../../components/forms/password.form";
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updatePassword, createUser } from '../../redux/actions/user.action';

const Settings = () => {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile.profile);
    const loading = useSelector(state => state.profile.loading);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    useEffect(() => {
        if (!profile) {
            dispatch(getProfile());
        }
    }, [dispatch, profile]);

    useEffect(() => {
        if (profile) {
            setFormData({
                username: profile.name || '',
                email: profile.email || '',
                oldPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            });
        }
    }, [profile]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleProfileSubmit = async () => {
        await dispatch(createUser({
            name: formData.username,
            email: formData.email,
            password: ''
        }));
        dispatch(getProfile());
    };

    const handlePasswordSubmit = async () => {
        await dispatch(updatePassword({
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword
        }));
        setFormData({
            ...formData,
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <FlexContainer className='flex-col w-full px-16 pt-12'>
            <div className='grid grid-cols-12 gap-4'>
                <div className='col-span-9 text-primary-color text-3xl font-bold'>
                    Settings Management
                </div>
            </div>
            <div className='mt-4 text-lg text-gray-600'>
                <p>Welcome back, <span className='font-semibold'>{formData.username}</span>!</p>
            </div>

            {/* Profile Form */}
            <div className='mt-6'>
                <ProfileForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleProfileSubmit={handleProfileSubmit}
                />
            </div>

            {/* Change Password Form */}
            <div className='mt-6'>
                <ChangePasswordForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handlePasswordSubmit={handlePasswordSubmit}
                />
            </div>
        </FlexContainer>
    );
};

export default Settings;
