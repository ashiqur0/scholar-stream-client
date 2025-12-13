import React from 'react';
import useAxios from '../../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { MdAddModerator, MdAdminPanelSettings } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { FaRegTrashCan } from 'react-icons/fa6';

const ManageUsers = () => {

    const axios = useAxios();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axios.get('/users');
            return res.data;
        }
    });

    const handleSetRole = (user, role) => {
        const updatedRole = {
            role: role
        }

        axios.patch(`/users/${user._id}`, updatedRole)
            .then(res => {
                refetch();
                console.log('after role updating', res.data);
            })
    }

    const deleteUser = user => {
        axios.delete(`/users/${user._id}`)
            .then(res => {
                refetch();
                console.log('after delete user', res.data);
            })
    }

    return (
        <div className='md:max-w-7xl md:mx-auto p-4'>
            <h1 className='text-2xl font-bold'>Manage Users</h1>
            <h2 className='font-xl font-semibold mt-10'>Total Users ({users.length})</h2>

            <div className="overflow-x-auto ">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Set Role</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id} className=''>
                                <td>{index + 1}</td>
                                <td><img src={user?.photoURL} alt={user.displayName} className='w-8 h-auto rounded-full' /></td>
                                <td>{user.displayName}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td className='flex items-center gap-2'>
                                    <button onClick={() => handleSetRole(user, 'admin')} className={`btn btn-sm btn-soft ${user.role === 'admin' && 'btn-secondary'}`}><MdAdminPanelSettings size={24} /></button>
                                    <button onClick={() => handleSetRole(user, 'moderator')} className={`btn btn-sm btn-soft ${user.role === 'moderator' && 'btn-info'}`}><MdAddModerator size={19} /></button>
                                    <button onClick={() => handleSetRole(user, 'student')} className={`btn btn-sm btn-soft ${user.role === 'student' && 'btn-success'}`}><PiStudentFill size={20} /></button>
                                </td>
                                <td><button onClick={() => deleteUser(user, 'student')} className={`btn btn-sm btn-soft btn-secondary`}><FaRegTrashCan size={20} /></button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;