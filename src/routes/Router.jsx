import React from 'react';
import { createBrowserRouter } from "react-router";
import RootLayout from '../layout/RootLayout';
import Home from '../pages/Home/Home/Home';
import AllScholarships from '../pages/All-Scholarships/AllScholarships';

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
            }
        ]
    }
])

export default Router;