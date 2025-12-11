import React from 'react';
import { createBrowserRouter } from "react-router";
import RootLayout from '../layout/RootLayout';
import Home from '../pages/Root/Home/Home/Home';
import AllScholarships from '../pages/Root/All-Scholarships/AllScholarships';
import ScholarshipDetails from '../pages/Root/Scholaships-Details/ScholarshipDetails';
import AuthLayout from '../layout/AuthLayout';
import Register from '../pages/Auth/Register/Register';
import Login from '../pages/Auth/Login/Login';
import PageNotFound from '../pages/Error/PageNotFound';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '../layout/DashboardLayout';
import DashboardHome from '../pages/Dashboard/Home/DashboardHome';
import MyProfile from '../pages/Dashboard/Common/MyProfile/MyProfile';
import AddScholarship from '../pages/Dashboard/AdminDashboard/AddSchorarship/AddScholarship';
import ManageScholarship from '../pages/Dashboard/AdminDashboard/ManageScholarship/ManageScholarship';
import ManageUsers from '../pages/Dashboard/AdminDashboard/ManageUsers/ManageUsers';
import Analytics from '../pages/Dashboard/AdminDashboard/Analytics/Analytics';
import ManageAppliedApplications from '../pages/Dashboard/ModeratorDashboard/ManageAppliedApplications/ManageAppliedApplications';
import AllReviews from '../pages/Dashboard/ModeratorDashboard/AllReviews/AllReviews';
import MyApplications from '../pages/Dashboard/StudentDashboard/MyApplications/MyApplications';
import MyReviews from '../pages/Dashboard/StudentDashboard/MyReviews/MyReviews';
import AdminRoute from './AdminRoute';
import StudentRoute from './StudentRoute';
import ModeratorRoute from './ModeratorRoute';

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
                element: <ProtectedRoute><ScholarshipDetails /></ProtectedRoute>
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
    },
    {
        path: '/dashboard',
        element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
        children: [

            // common dashboard route
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: 'my-profile',
                Component: MyProfile
            },

            // admin only route
            {
                path: 'add-scholarship',
                element: <AdminRoute><AddScholarship /></AdminRoute>
            },
            {
                path: 'manage-scholarship',
                element: <AdminRoute><ManageScholarship /></AdminRoute>
            },
            {
                path: 'manage-users',
                element: <AdminRoute><ManageUsers /></AdminRoute>
            },
            {
                path: 'analytics',
                element: <AdminRoute><Analytics /></AdminRoute>
            },

            // moderator only route
            {
                path: 'manage-applied-applications',
                element: <ModeratorRoute><ManageAppliedApplications /></ModeratorRoute>
            },
            {
                path: 'all-reviews',
                element: <ModeratorRoute><AllReviews /></ModeratorRoute>
            },

            // students only route
            {
                path: 'my-applications',
                element: <StudentRoute><MyApplications /></StudentRoute>
            },
            {
                path: 'my-reviews',
                element: <StudentRoute><MyReviews /></StudentRoute>
            }
        ]
    }
])

export default Router;