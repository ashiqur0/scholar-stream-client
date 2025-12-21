import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../../hooks/useAuth';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaAmazonPay, FaEdit, FaTrashAlt } from "react-icons/fa";
import { TbListDetails } from 'react-icons/tb';
import { MdOutlineRateReview } from "react-icons/md";
import { useRef } from 'react';
import { useState } from 'react';

const MyApplications = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const detailsModalRef = useRef(null);
    const [application, setApplication] = useState({});

    const { userImage, userName, userEmail, applicationFees: paid, paymentStatus, currency, applicationDate, universityName: appliedUniversity, scholarshipName: appliedScholarship, transactionId } = application;

    const { data: applications = [], refetch } = useQuery({
        queryKey: ['applications'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications?email=${user.email}`);
            return res.data;
        }
    });

    const handleDetailsModalOpen = (applicationId) => {
        detailsModalRef.current.showModal();
        const application = applications.find(a => a._id == applicationId);
        setApplication(application);
    }

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
                                        onClick={()=>handleDetailsModalOpen(application._id)}
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

            {/* details modal */}
            <dialog ref={detailsModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h1 className='text-2xl font-bold border-b pb-1 mb-5 mt-10'>Application Details:</h1>
                    <div className='h-full flex flex-col justify-between space-y-5 p-3'>
                        <h1 className='text-xl font-semibold border-b pb-1 mb-3 w-60'>Students</h1>
                        <div className='flex items-center gap-5'>
                            <div>
                                <img src={userImage} className='w-13 h-13 rounded-full' alt="" />
                            </div>
                            <div>
                                <p className='font-semibold'>{userName}</p>
                                <p className='font-semibold'>{userEmail}</p>
                            </div>
                        </div>

                        <h1 className='text-xl font-semibold border-b pb-1 mb-3 w-60'>Applied</h1>
                        <p className='font-semibold'>University Name: {appliedUniversity}</p>
                        <p className='font-semibold'>Scholarship Name: {appliedScholarship}</p>
                        <p className='font-semibold'>Application Date: {applicationDate?.slice(0, 10)}</p>

                        <h1 className='text-xl font-semibold border-b pb-1 mb-3 w-60'>Payment</h1>
                        <p className='font-semibold'>Payment Amount: ${paid}</p>
                        <p className='font-semibold'>Payment Currency: {currency}</p>
                        <p className='font-semibold'>Payment Status: {paymentStatus}</p>
                        <p className='font-semibold'>Transaction Id: {transactionId}</p>
                    </div>

                    {/* modal close */}
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-soft">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div >
    );
};

export default MyApplications;