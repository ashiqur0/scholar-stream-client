import React from 'react';
import { createBrowserRouter } from "react-router";
import RootLayout from '../layout/RootLayout';
import Home from '../pages/Root/Home/Home/Home';
import AllScholarships from '../pages/Root/All-Scholarships/AllScholarships';
import ScholarshipDetails from '../pages/Root/Scholaships-Details/ScholarshipDetails';

const Router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
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
    }
])

export default Router;