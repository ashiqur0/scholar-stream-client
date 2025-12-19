import React from 'react';
import useAuth from '../../../hooks/useAuth';

const StudentDashboardHome = () => {

    const { user } = useAuth();

    return (
        <div className='md:max-w-7xl md:mx-auto p-4 items-center'>
            <h1 className='md:text-7xl text-5xl font-extrabold text-center mt-10'>Hello, <span className='text-orange-400'>{user.displayName}</span></h1>

            <h1 className='md:text-4xl text-2xl text-center mt-5'>Welcome You To Student Dashboard Home Page</h1>
        </div>
    );
};

export default StudentDashboardHome;