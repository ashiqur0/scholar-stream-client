import React from 'react';
import { createBrowserRouter } from "react-router";
import RootLayout from '../layout/RootLayout';
import Home from '../pages/Root/Home/Home/Home';
import AllScholarships from '../pages/Root/All-Scholarships/AllScholarships';
import ScholarshipDetails from '../pages/Root/Scholaships-Details/ScholarshipDetails';
import AuthLayout from '../layout/AuthLayout';
import Register from '../pages/Auth/Register/Register';
import Login from '../pages/Auth/Login/Login';
import PageNotFound from '../components/common/PageNotFound';

const Router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        errorElement: <PageNotFound />,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/all-scholarships',
                Component: AllScholarships
            },
            {
                path: '/scholarships/details',
                Component: ScholarshipDetails
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: '/register',
                Component: Register
            },
            {
                path: '/login',
                Component: Login
            }
        ]
    }
])

export default Router;