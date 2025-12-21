import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TiTick } from "react-icons/ti";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { TbListDetails } from "react-icons/tb";
import { RiFeedbackFill } from "react-icons/ri";
import { FaLocationDot } from 'react-icons/fa6';

const ManageAppliedApplications = () => {

    const axiosSecure = useAxiosSecure();
    const detailsModalRef = useRef(null);
    const [scholarship, setScholarship] = useState({});
    const [application, setApplication] = useState({});
    const { universityImage, universityName, scholarshipName, universityCountry, universityCity, universityWorldRank, subjectCategory, scholarshipCategory, degree, scholarshipPostDate, applicationDeadline, applicationFees, serviceCharge, postedUserEmail, scholarshipDescription } = scholarship;

    const { userImage, userName, userEmail, applicationFees: paid, paymentStatus, currency, applicationDate, universityName: appliedUniversity, scholarshipName: appliedScholarship, transactionId } = application;

    // "scholarshipName": "International Bright Scholars Award for Future Data Science Innovators",
    // "userName": "Rasel Mia",
    // "userId": "694438f4d57773b2e3389720",
    // "universityName": "Carnegie Mellon University",
    // "scholarshipCategory": "Partial",
    // "degree": "Masters",
    // "serviceCharge": "500",
    // "transactionId": "pi_3SgSwuGt1zFvoDgO0CacWxY7",
    // "currency": "usd",
    // "userEmail": "rasel@gmail.com",
    // "applicationFees": 590,
    // "applicationStatus": "pending",
    // "paymentStatus": "paid",
    // "applicationDate": "2025-12-20T16:24:16.167Z",
    // "feedback": "aaa"

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

    const handleDetailsModalOpen = (scholarshipId, applicationId) => {
        detailsModalRef.current.showModal();
        axiosSecure.get(`/scholarship/${scholarshipId}`)
            .then(res => {
                setScholarship(res.data);
            })

        const application = applications.find(a => a._id == applicationId);
        setApplication(application);
    }

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

                                    <button
                                        onClick={() => handleDetailsModalOpen(application.scholarshipId, application._id)}
                                        title={'Details'}
                                        className='btn btn-sm btn-soft btn-success border border-green-400'
                                    >
                                        <TbListDetails />
                                    </button>

                                    <button
                                        onClick={() => handleFeedbackModalOpen(application._id)}
                                        title={'Feedback'}
                                        className='btn btn-sm btn-soft btn-accent border border-sky-500'
                                    >
                                        <RiFeedbackFill />
                                    </button>

                                    <button
                                        onClick={() => updateApplicationStatus(application, application.applicationStatus !== 'processing' ? 'processing' : 'completed')}
                                        title={'Status Update'}
                                        className='btn btn-sm btn-soft btn-warning border border-orange-400'
                                    >
                                        <RiFeedbackFill />
                                    </button>

                                    <button
                                        onClick={() => updateApplicationStatus(application, 'rejected')}
                                        title={'Cancel'}
                                        className='btn btn-sm btn-soft btn-error border border-rose-400'
                                    >
                                        <RiFeedbackFill />
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
                    <h1 className='text-2xl font-bold border-b pb-1 mb-5'>Scholarship Details:</h1>
                    <div className='flex flex-col justify-center items-start gap-5 p-3 rounded h-full'>
                        <div>
                            <img src={universityImage} alt={universityName} className='rounded-xl md:w-full md:h-100 overflow-hidden' />
                        </div>

                        <div className='h-full flex flex-col justify-between space-y-5'>
                            <div className='space-y-2'>
                                <h1 className='text-2xl font-semibold'>{scholarshipName}</h1>
                                <p className='font-semibold'>{scholarshipDescription}</p>
                            </div>
                        </div>
                    </div>

                    <div className='h-full flex flex-col justify-between space-y-5 p-3'>
                        <p className='font-semibold text-xl'>{universityName} <span className='text-xs'>(World Rank: {universityWorldRank})</span></p>
                        <div className='font-semibold flex items-center gap-1'>
                            <span><FaLocationDot /></span>
                            <span>{universityCountry}, {universityCity}</span>
                        </div>

                        <p className='font-semibold'>Subject: {subjectCategory}</p>
                        <p className='font-semibold'>Category: {scholarshipCategory}</p>
                        <p className='font-semibold'>Degree: {degree}</p>
                        <p className='font-semibold'>Scholarship Published: {scholarshipPostDate?.slice(0, 10)}</p>
                        <p className='font-semibold'>Application Deadline: {applicationDeadline?.slice(0, 10)}</p>
                        <p className='font-semibold'>Application Fee: ${applicationFees}</p>
                        <p className='font-semibold'>Service Charge: ${serviceCharge}</p>
                        <p className='font-semibold'>Contact: {postedUserEmail}</p>
                    </div>

                    {/* const { applicationDate, universityName: appliedUniversity, scholarshipName: appliedScholarship, } = application; */}
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

            {/* feedback modal */}
            <dialog ref={feedbackModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">

                    <form onSubmit={handleFeedback} className={'flex flex-col justify-between'}>
                        <fieldset className='fieldset'>

                            {/* Scholarship Name */}
                            <label className="label mt-4 text-[14px]">Moderator Feedback</label>
                            <input
                                type="text"
                                className="input w-full"
                                onChange={(e) => setFeedback(e.target.value)}
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