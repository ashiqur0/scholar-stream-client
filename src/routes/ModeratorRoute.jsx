import React, { Children } from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../components/common/Loading';
import Forbidden from '../pages/Forbidden/Forbidden';

const ModeratorRoute = ({ children }) => {

    const { loading } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || roleLoading) return <Loading />
    if (role !== 'moderator') return <Forbidden />

    return children;
};

export default ModeratorRoute;