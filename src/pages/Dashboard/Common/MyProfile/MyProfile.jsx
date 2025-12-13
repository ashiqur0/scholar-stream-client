import React from 'react';
import useRole from '../../../../hooks/useRole';
import uesAuth from '../../../../hooks/useAuth';

const MyProfile = () => {

    const { role } = useRole();
    const { user } = uesAuth();

    return (
        <div className='md:max-w-7xl md:mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-10'>My Profile Page for {role}</h1>

            <div className='flex justify-center items-center gap-5'>
                <img className='w-20 h-auto' src={user.photoURL} alt={user.displayName} />
                <div className='space-y-3'>
                    <h2>Name: {user.displayName}</h2>
                    <p>Role: {role}</p>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;