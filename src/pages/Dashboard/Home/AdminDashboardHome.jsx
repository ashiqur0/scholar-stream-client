import React from 'react';
import useAuth from '../../../hooks/useAuth';

const AdminDashboardHome = () => {

    const { user } = useAuth();

    return (
        <div className='md:max-w-7xl md:mx-auto p-4 items-center'>
            <h1 className='md:text-7xl font-extrabold text-center mt-10'>Hello, <span className='text-orange-400'>{user.displayName}</span></h1>

            <h1 className='text-4xl text-center mt-5'>Welcome You To Admin Dashboard Home Page</h1>
        </div>
    );
};

export default AdminDashboardHome;