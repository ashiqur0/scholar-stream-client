import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TiTick } from "react-icons/ti";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { TbListDetails } from "react-icons/tb";
import { RiFeedbackFill } from "react-icons/ri";

const ManageAppliedApplications = () => {

    const axiosSecure = useAxiosSecure();
    const feedbackModalRef = useRef(null);
    const [feedbackApplicationId, setFeedbackApplicationId] = useState('');
    const [feedback, setFeedback] = useState('');

    const { data: applications = [], refetch } = useQuery({
        queryKey: ['applications'],
        queryFn: async () => {
            const res = await axiosSecure.get('/applications/moderator');
            return res.data;
        }
    });

    const handleFeedbackModalOpen = (id) => {
        setFeedbackApplicationId(id);
        feedbackModalRef.current.showModal();
    }

    const handleFeedback = (e) => {
        e.preventDefault();

        const feedbackData = {
            feedback: feedback
        }

        axiosSecure.patch(`/feedback/${feedbackApplicationId}`, feedbackData)
            .then(() => {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Feedback given successfully`,
                    showConfirmButton: false,
                    timer: 2500
                });
            })
    }

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

                                    <button onClick={() => {
                                        
                                        handleFeedbackModalOpen(application._id)
                                    }} title={'Feedback'} className='btn btn-sm btn-soft btn-accent border border-sky-500'><RiFeedbackFill /></button>

                                    <button onClick={() => updateApplicationStatus(application, application.applicationStatus !== 'processing' ? 'processing' : 'completed')} title={'Status Update'} className='btn btn-sm btn-soft btn-warning border border-orange-400'><RiFeedbackFill /></button>

                                    <button onClick={() => updateApplicationStatus(application, 'rejected')} title={'Cancel'} className='btn btn-sm btn-soft btn-error border border-rose-400'><RiFeedbackFill /></button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            {/* modal */}
            <dialog ref={feedbackModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">

                    <form onSubmit={handleFeedback} className={'flex flex-col justify-between'}>
                        <fieldset className='fieldset'>

                            {/* Scholarship Name */}
                            <label className="label mt-4 text-[14px]">Moderator Feedback</label>
                            <input
                                type="text"
                                className="input w-full"
                                onChange={(e)=>setFeedback(e.target.value)}
                            />

                        </fieldset>
                        <button type='submit' className='btn btn-primary mt-5'>Submit</button>
                    </form>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default ManageAppliedApplications;