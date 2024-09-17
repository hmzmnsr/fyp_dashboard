import React from 'react';
import FlexContainer from "../../components/containers/flex.container"
import logo from "../../assets/logo.png"
import LoginPageForm from "../../components/forms/login.form";

const LoginPage = () => {
    return (
        <FlexContainer className='flex-col w-full h-screen grid grid-cols-12'>
         
            <div className='col-span-6 bg-primary-color flex flex-col justify-center items-center'>
                <img src={logo} alt='logo' className='w-2/6'/>
                <p className='text-3xl font-bold text-white my-10'>Admin's Portal</p>
            </div>
             
            <div className='col-span-6 flex flex-col items-center justify-center'>
                <div className='ml-36 w-4/6'>
                    <div className='pb-3'>
                        <p className='text-5xl font-bold text-primary-color'>Welcome</p>
                    </div>
                    <div className='pb-6'>
                        <p className='text-2xl font-semibold text-primary-color'>Sign into your account</p>
                    </div>
                    <LoginPageForm />
                </div>
            </div>
            
        </FlexContainer>
    );
}

export default LoginPage;
