import React from 'react';
import { createBrowserRouter } from "react-router";
import RootLayout from '../layout/RootLayout';

const Router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout
    }
])

export default Router;