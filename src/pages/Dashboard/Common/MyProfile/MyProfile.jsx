import React from 'react';
import useRole from '../../../../hooks/useRole';

const MyProfile = () => {

    const { role } = useRole();

    return (
        <div>
            <h1>My Profile Page for {role}</h1>
        </div>
    );
};

export default MyProfile;