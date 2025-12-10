import React from 'react';
import useRole from '../../../hooks/useRole';
import Loading from '../../../components/common/Loading';
import AdminDashboardHome from './AdminDashboardHome';
import ModeratorDashboardHome from './ModeratorDashboardHome';

const DashboardHome = () => {

    const { role, roleLoading } = useRole();

    if (roleLoading) return <Loading />
    if (role === 'admin') return <AdminDashboardHome />
    else if (role === 'moderator') return <ModeratorDashboardHome />

    return ;
};

export default DashboardHome;