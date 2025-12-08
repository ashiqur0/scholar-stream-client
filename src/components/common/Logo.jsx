import React from 'react';
import logoImg from '../../assets/logo.png'

const Logo = () => {
    return (
        <div className='flex justify-center items-end gap-3'>
            <img src={logoImg} className='w-14 h-auto' alt='logo image'></img>
            <h1 className='text-2xl font-bold'>Scholars Stream</h1>
        </div>
    );
};

export default Logo;