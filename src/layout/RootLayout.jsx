import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/common/Navbar';

const RootLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default RootLayout;