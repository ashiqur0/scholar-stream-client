import React from 'react';
import errorImg from '../../assets/error/error.jpg'

const PageNotFound = () => {
    return (
        <div>
            <div className='bg-slate-900 w-full md:mx-auto flex justify-center items-center py-20 px-10 min-h-screen'>
                <img src={errorImg} alt="" />
            </div>
        </div>
    );
};

export default PageNotFound;