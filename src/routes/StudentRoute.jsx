import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../components/Loading';
import Forbidden from '../pages/Forbidden/Forbidden';

const StudentRoute = ({ children }) => {

    const { loading } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || roleLoading) return <Loading />
    if (role !== 'student') return <Forbidden />

    return children;
};

export default StudentRoute;