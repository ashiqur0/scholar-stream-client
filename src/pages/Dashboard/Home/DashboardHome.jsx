import React from 'react';
import useRole from '../../../hooks/useRole';
import Loading from '../../../components/common/Loading';
import AdminDashboardHome from './AdminDashboardHome';

const DashboardHome = () => {

    const { role, roleLoading } = useRole();

    if (roleLoading) return <Loading />
    if (role === 'admin') return <AdminDashboardHome />

    return ;
};

export default DashboardHome;