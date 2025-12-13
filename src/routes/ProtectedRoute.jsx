import React, { use } from 'react';
// import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../components/Loading';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {

    const { loading, user } = use(AuthContext);
    const location = useLocation();

    if (loading) return <Loading />
    if (user) return children ;
    
    return <Navigate to={"/login"} state={location.pathname}></Navigate>;
};

export default ProtectedRoute;