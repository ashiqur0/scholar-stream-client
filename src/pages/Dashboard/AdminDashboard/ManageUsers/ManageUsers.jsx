import React from 'react';
import { MdAddModerator, MdAdminPanelSettings } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { FaRegTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useState } from 'react';
import { useEffect } from 'react';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [sort, setSort] = useState('size');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axiosSecure.get(`/users?sort=${sort}`)
            .then(res => {
                setUsers(res.data);
            });
    }, [sort, axiosSecure]);

    const handleSetRole = (user, role) => {
        const updatedRole = {
            role: role
        }

        axiosSecure.patch(`/users/${user._id}`, updatedRole)
            .then(() => {
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
            <div className='flex md:flex-row flex-col md:justify-between items-start mb-2'>
                <h2 className='text-xl font-bold mt-10'>Total Users ({users.length})</h2>
                <div className="font-xl font-semibold md:mt-10 md:mb-0 my-2">
                    <select onChange={(e) => setSort(e.target.value)} className="select w-60">
                        <option selected disabled={true}>
                            Sort User By Role
                        </option>
                        <option value={"all-user"}>All User</option>
                        <option value={"admin"}>Admin</option>
                        <option value={"moderator"}>Moderator</option>
                        <option value={"student"}>Student</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto ">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User Image</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Authorized Role</th>
                            <th className='pl-15'>Set Role</th>
                            <th>Delete User</th>
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
                                <td className='flex items-center gap-1'>
                                    <button
                                        title='Mark as admin'
                                        onClick={() => handleSetRole(user, 'admin')}
                                        className={`btn btn-sm btn-soft border ${user.role === 'admin' && 'btn-secondary border-pink-500' || 'border-white'}`}
                                    >
                                        <MdAdminPanelSettings size={24} />
                                    </button>

                                    <button
                                        title='Mark as moderator'
                                        onClick={() => handleSetRole(user, 'moderator')}
                                        className={`btn btn-sm btn-soft border ${user.role === 'moderator' && 'btn-info border-sky-400' || 'border-white'}`}
                                    >
                                        <MdAddModerator size={19} />
                                    </button>

                                    <button
                                        title='Mark as student'
                                        onClick={() => handleSetRole(user, 'student')}
                                        className={`btn btn-sm btn-soft border ${user.role === 'student' && 'btn-success border-green-400' || 'border-white'}`}
                                    >
                                        <PiStudentFill size={20} />
                                    </button>
                                </td>

                                <td>
                                    <button
                                        title={`Delete ${user.displayName}`}
                                        onClick={() => deleteUser(user, 'student')}
                                        className={`btn btn-sm btn-soft btn-secondary border border-pink-500 ml-5`}
                                    >
                                        <FaRegTrashCan size={20} />
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;