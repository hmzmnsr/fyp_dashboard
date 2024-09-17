import React from 'react';

const LogoutButton = ({onClick}) => {
    return(
        <button onClick={onClick} className='mx-12 py-3 bg-secondary-color hover:bg-red-600 text-white text-base rounded-xl mb-20'>Logout</button>
    );
};

export default LogoutButton;