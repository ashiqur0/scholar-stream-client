import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { TiTick } from "react-icons/ti";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { Link } from 'react-router';
import { TbListDetails } from "react-icons/tb";
import { RiFeedbackFill } from "react-icons/ri";

const ManageAppliedApplications = () => {

    const axiosSecure = useAxiosSecure();

    const { data: applications = [], refetch } = useQuery({
        queryKey: ['applications'],
        queryFn: async () => {
            const res = await axiosSecure.get('/applications/moderator');
            return res.data;
        }
    });

    const updateApplicationStatus = (application, status) => {
        const updatedStatus = {
            applicationStatus: status
        }

        axiosSecure.patch(`/applications/${application._id}`, updatedStatus)
            .then(() => {
                refetch();

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Application is ${status}`,
                    showConfirmButton: false,
                    timer: 2500
                });
            })
    }

    return (
        <div className='md:max-w-7xl md:mx-auto p-4'>
            <title>Manage Application</title>
            <h1 className='text-2xl font-bold'>Manage Applied Applications</h1>

            <h2 className='font-xl font-semibold mt-10'>Total Application ({applications.length})</h2>
            <div className="overflow-x-auto ">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Applicant Name</th>
                            <th>Applicant Email</th>
                            <th>University Name</th>
                            <th>Application Feedback</th>
                            <th>Application Status</th>
                            <th>Payment Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applications.map((application, index) => <tr key={application._id}>
                                <th>{index + 1}</th>
                                <td>{application.userName}</td>
                                <td>{application.userEmail}</td>
                                <td>{application.universityName}</td>
                                <td>{application.feedback}</td>
                                <td>{application.applicationStatus}</td>
                                <td>{application.paymentStatus}</td>
                                <td className='flex items-center gap-1'>
                                    <button title={'Details'} className='btn btn-sm btn-soft btn-success border border-green-400'><TbListDetails /></button>

                                    <button title={'Feedback'} className='btn btn-sm btn-soft btn-accent border border-sky-500'><RiFeedbackFill /></button>

                                    <button title={'Status Update'} className='btn btn-sm btn-soft btn-warning border border-orange-400'><RiFeedbackFill /></button>

                                    <button title={'Cancel'} className='btn btn-sm btn-soft btn-error border border-rose-400'><RiFeedbackFill /></button>
                                </td>
                                {/* <td className=''>
                                    {
                                        application.applicationStatus === 'pending' && <>
                                            <button onClick={() => updateApplicationStatus(application, 'processing')} className='btn font-bold'>processing</button>
                                        </>
                                    }
                                    {
                                        application.applicationStatus === 'processing' && <>
                                            <div className='flex items-center justify-start gap-2'>
                                                <button onClick={() => updateApplicationStatus(application, 'approved')} className='btn btn-outline btn-success'><TiTick size={20} /></button>

                                                <button onClick={() => updateApplicationStatus(application, 'canceled')} className='btn btn-outline btn-error font-bold'>X</button>
                                            </div>
                                        </>
                                    }
                                    {
                                        application.applicationStatus === 'approved' && <>
                                            <p className='text-green-500'>Approved</p>
                                        </>
                                    }
                                    {
                                        application.applicationStatus === 'canceled' && <>
                                            <p className='text-red-500'>Canceled</p>
                                        </>
                                    }
                                </td> */}
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageAppliedApplications;