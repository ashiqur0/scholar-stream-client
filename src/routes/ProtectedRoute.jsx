import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../components/Loading';

const ProtectedRoute = ({ children }) => {

    const { loading, user } = useAuth();
    const location = useLocation();

    if (loading) return <Loading />
    if (!user) <Navigate to={"/login"} state={location.pathname}></Navigate>

    return children;
};

export default ProtectedRoute;