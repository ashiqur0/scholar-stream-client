import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../../hooks/useAuth';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaAmazonPay, FaEdit, FaTrashAlt } from "react-icons/fa";
import { TbListDetails } from 'react-icons/tb';
import { MdOutlineRateReview } from "react-icons/md";

const MyApplications = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: applications = [], refetch } = useQuery({
        queryKey: ['applications'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications?email=${user.email}`);
            return res.data;
        }
    });

    const handleDeleteApplication = application => {
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
                axiosSecure.delete(`/applications/${application._id}?email=${user.email}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your application has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className='md:max-w-7xl md:mx-auto p-4'>
            <title>My Application</title>
            <h1 className='text-2xl font-bold'>My Applications</h1>

            <h2 className='font-xl font-semibold mt-10'>Total Applied ({applications.length})</h2>
            <div className="overflow-x-auto ">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>University Name</th>
                            <th>Address</th>
                            <th>Feedback</th>
                            <th>Subject Category</th>
                            <th>Application Fees</th>
                            <th>Application Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applications.map((application, index) => <tr key={application._id}>
                                <td>{index + 1}</td>
                                <td>{application.universityName}</td>
                                <td>address</td>
                                <td>{application.feedback}</td>
                                <td>subject Category</td>
                                <td>${application.applicationFees}</td>
                                <td>{application.applicationStatus}</td>
                                <td className='flex items-center gap-1'>

                                    {/* details button to see application details in a modal */}
                                    <button
                                        title={'See details'}
                                        className='btn btn-sm btn-soft btn-success border border-green-400'
                                    >
                                        <TbListDetails />
                                    </button>

                                    {/* edit button */}
                                    <button
                                        title={'Edit application'}
                                        className='btn btn-sm btn-soft btn-success border border-green-400'
                                    >
                                        <FaEdit />
                                    </button>

                                    {/* pay button  */}
                                    <button
                                        title={'Pay now'}
                                        className='btn btn-sm btn-soft btn-success border border-green-400'
                                    >
                                        <FaAmazonPay />
                                    </button>

                                    {/* review button  */}
                                    <button
                                        title={'Add review'}
                                        className='btn btn-sm btn-soft btn-success border border-green-400'
                                    >
                                        <MdOutlineRateReview />
                                    </button>

                                    {/* delete button: to remove application */}
                                    <button
                                        title='Remove Application'
                                        onClick={() => handleDeleteApplication(application)}
                                        className='btn btn-sm btn-soft btn-secondary border border-pink-500'
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default MyApplications;