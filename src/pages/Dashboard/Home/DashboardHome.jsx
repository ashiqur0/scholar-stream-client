import React from 'react';
import useRole from '../../../hooks/useRole';
import Loading from '../../../components/Loading';
import AdminDashboardHome from './AdminDashboardHome';
import ModeratorDashboardHome from './ModeratorDashboardHome';
import StudentDashboardHome from './StudentDashboardHome';

const DashboardHome = () => {

    const { role, roleLoading } = useRole();

    if (roleLoading) return <Loading />
    if (role === 'admin') {
        return (
            <div>
                <title>Admin Home</title>
                <AdminDashboardHome />
            </div>
        )
    } else if (role === 'moderator') {
        return (
            <div>
                <title>Moderator Home</title>
                <ModeratorDashboardHome />
            </div>
        )
    }

    return (
            <div>
                <title>Student Home</title>
                <StudentDashboardHome />
            </div>
        )
};

export default DashboardHome;