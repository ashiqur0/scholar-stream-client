import React from 'react';
// import logoImg from '../../assets/logo.png'
import { Link } from 'react-router';
import { GiGraduateCap } from "react-icons/gi";

const Logo = () => {
    return (
        <Link to={'/'} className='flex justify-center items-end gap-3 text-orange-400'>
            {/* <img src={logoImg} className='w-14 h-auto' alt='logo image'></img> */}
            <GiGraduateCap size={40}/>
            <h1 className='text-2xl font-bold'>Scholars Stream</h1>
        </Link>
    );
};

export default Logo;