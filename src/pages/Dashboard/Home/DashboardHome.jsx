import React from 'react';
import useRole from '../../../hooks/useRole';
import Loading from '../../../components/Loading';
import AdminDashboardHome from './AdminDashboardHome';
import ModeratorDashboardHome from './ModeratorDashboardHome';
import StudentDashboardHome from './StudentDashboardHome';

const DashboardHome = () => {

    const { role, roleLoading } = useRole();

    if (roleLoading) return <Loading />
    if (role === 'admin') return <AdminDashboardHome />
    else if (role === 'moderator') return <ModeratorDashboardHome />

    return <StudentDashboardHome />
};

export default DashboardHome;