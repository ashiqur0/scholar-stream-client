import React from 'react';
import { createBrowserRouter } from "react-router";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <h1>From React Router</h1>
    }
])

export default Router;