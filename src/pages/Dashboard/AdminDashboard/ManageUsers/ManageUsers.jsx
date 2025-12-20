import React from 'react';
// import useAxios from '../../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { MdAddModerator, MdAdminPanelSettings } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { FaRegTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const ManageUsers = () => {

    // const axios = useAxios();
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleSetRole = (user, role) => {
        const updatedRole = {
            role: role
        }

        axiosSecure.patch(`/users/${user._id}`, updatedRole)
            .then(() => {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.displayName} marked as ${role}`,
                    showConfirmButton: false,
                    timer: 2500
                });
            })
    }

    const deleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User Deleted Successfully",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className='md:max-w-7xl md:mx-auto p-4'>
            <title>Manage Users</title>
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