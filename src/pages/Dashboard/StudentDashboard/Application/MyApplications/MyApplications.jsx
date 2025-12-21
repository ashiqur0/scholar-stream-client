import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../../hooks/useAuth';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaAmazonPay, FaEdit, FaRegStar, FaStar, FaTrashAlt } from "react-icons/fa";
import { TbListDetails } from 'react-icons/tb';
import { MdOutlineRateReview } from "react-icons/md";
import { useRef } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const MyApplications = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const detailsModalRef = useRef(null);
    const editApplicationModalRef = useRef(null);
    const addReviewModalRef = useRef(null);
    const [application, setApplication] = useState({});
    const [scholarship, setScholarship] = useState({});
    const { register, handleSubmit } = useForm();
    const [applicationId, setApplicationId] = useState('');
    const [rating, setRating] = useState(0);
    const [scholarshipId, setScholarshipId] = useState('');

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

    const handleEditApplicationModalOpen = (scholarshipId, applicationId) => {
        editApplicationModalRef.current.showModal();
        setApplicationId(applicationId);
        axiosSecure.get(`/scholarship/${scholarshipId}`)
            .then(res => {
                setScholarship(res.data);
            });
    }

    const { _id, universityName, scholarshipName, scholarshipCategory, degree, applicationFees, serviceCharge } = scholarship;
    const handleSubmitUpdatedApplication = async (data) => {
        const updatedApplicationInfo = {
            scholarshipId: _id,
            scholarshipName: scholarshipName,
            userId: user.userId,
            userName: data.userName,
            userEmail: data.userEmail,
            userImage: user.photoURL,
            universityName: universityName,
            scholarshipCategory: scholarshipCategory,
            degree: degree,
            applicationFees: applicationFees,
            serviceCharge: serviceCharge,
        }

        axiosSecure.patch(`/applications/${applicationId}/update`, updatedApplicationInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Application update successfully`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            })
    }

    const handleAddReviewModalOpen = (scholarshipId) => {
        addReviewModalRef.current.showModal();
        setScholarshipId(scholarshipId);
    }

    const handleCreateReview = review => {
        const reviewInfo = {
            reviewerImage: user.photoURL,
            reviewerName: user.displayName,
            reviewerEmail: user.email,
            review: review.review,
            createdAt: new Date(),
            scholarshipId: scholarshipId,
            rating: rating
        }
        axiosSecure.post(`/review`, reviewInfo)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Review posted",
                    showConfirmButton: false,
                    timer: 2500
                });
            })
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
                                        onClick={() => handleDetailsModalOpen(application._id)}
                                        title={'See details'}
                                        className='btn btn-sm btn-soft btn-success border border-green-400'
                                    >
                                        <TbListDetails />
                                    </button>

                                    {/* edit button */}
                                    {
                                        application.applicationStatus === 'pending' && <button
                                            onClick={() => handleEditApplicationModalOpen(application.scholarshipId, application._id)}
                                            title={'Edit application'}
                                            className='btn btn-sm btn-soft btn-success border border-green-400'
                                        >
                                            <FaEdit />
                                        </button>
                                    }

                                    {/* pay button  */}
                                    {
                                        application.applicationStatus === 'pending' && application.paymentStatus === 'unpaid' && <button
                                            title={'Pay now'}
                                            className='btn btn-sm btn-soft btn-success border border-green-400'
                                        >
                                            <FaAmazonPay />
                                        </button>
                                    }

                                    {/* review button  */}
                                    {
                                        application.applicationStatus === 'completed' && <button
                                            onClick={() => handleAddReviewModalOpen(application.scholarshipId)}
                                            title={'Add review'}
                                            className='btn btn-sm btn-soft btn-success border border-green-400'
                                        >
                                            <MdOutlineRateReview />
                                        </button>
                                    }

                                    {/* delete button: to remove application */}
                                    {
                                        application.applicationStatus === 'pending' && <button
                                            title='Remove Application'
                                            onClick={() => handleDeleteApplication(application)}
                                            className='btn btn-sm btn-soft btn-secondary border border-pink-500'
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    }
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

            {/* edit application modal */}
            <dialog ref={editApplicationModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">

                    <form onSubmit={handleSubmit(handleSubmitUpdatedApplication)} className={'flex flex-col justify-between'}>
                        <fieldset className='fieldset'>

                            {/* Scholarship Name */}
                            <label className="label mt-4 text-[14px]">Scholarship Name</label>
                            <input
                                type="text"
                                {...register('scholarshipName')}
                                className="input w-full"
                                defaultValue={scholarship.scholarshipName}
                            />

                            {/* University Name */}
                            <label className="label mt-4 text-[14px]">University Name</label>
                            <input
                                type="text"
                                {...register('universityName')}
                                className="input w-full"
                                defaultValue={scholarship.universityName}
                            />

                            {/* Applicant Name */}
                            <label className="label mt-4 text-[14px]">Applicant Name</label>
                            <input
                                type="text"
                                {...register('userName')}
                                className="input w-full"
                                placeholder='Applicant Name'
                                defaultValue={user?.displayName}
                            />

                            {/* Applicant Email */}
                            <label className="label mt-4 text-[14px]">Applicant Email</label>
                            <input
                                type="text"
                                {...register('userEmail')}
                                className="input w-full"
                                placeholder="Applicant Email"
                                defaultValue={user?.email}
                            />

                            {/* Scholarship Category */}
                            <label className="label mt-4 text-[14px]">Scholarship Category</label>
                            <input
                                type="text"
                                {...register('scholarshipCategory')}
                                className="input w-full"
                                defaultValue={scholarship.scholarshipCategory}
                            />

                            {/* degree */}
                            <label className="label mt-4 text-[14px]">Degree</label>
                            <input
                                type="text"
                                {...register('degree')}
                                className="input w-full"
                                defaultValue={scholarship.degree}
                            />

                            {/* Application Fees */}
                            <label className="label mt-4 text-[14px]">Application Fees</label>
                            <input
                                type="text"
                                {...register('applicationFees')}
                                className="input w-full"
                                defaultValue={scholarship.applicationFees}
                            />

                            {/* Service Charge */}
                            <label className="label mt-4 text-[14px]">Service Charge</label>
                            <input
                                type="text"
                                {...register('serviceCharge')}
                                className="input w-full"
                                defaultValue={scholarship.serviceCharge}
                            />
                        </fieldset>
                        <button type='submit' className='btn btn-soft btn-warning border border-orange-400 mt-5'>Update Application</button>
                    </form>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {/* add review modal */}
            <dialog ref={addReviewModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    {/* Rating */}
                    <div className='flex items-center gap-4 mb-2'>
                        <p>Your rating for this scholarship: ({rating})</p>
                        <div className='flex items-center gap-1'>
                            <button onClick={() => setRating(1)} className={`${rating >= 1 && 'text-orange-400'}`}>{rating >= 1 ? <FaStar /> : <FaRegStar />}</button>
                            <button onClick={() => setRating(2)} className={`${rating >= 2 && 'text-orange-400'}`}>{rating >= 2 ? <FaStar /> : <FaRegStar />}</button>
                            <button onClick={() => setRating(3)} className={`${rating >= 3 && 'text-orange-400'}`}>{rating >= 3 ? <FaStar /> : <FaRegStar />}</button>
                            <button onClick={() => setRating(4)} className={`${rating >= 4 && 'text-orange-400'}`}>{rating >= 4 ? <FaStar /> : <FaRegStar />}</button>
                            <button onClick={() => setRating(5)} className={`${rating >= 5 && 'text-orange-400'}`}>{rating >= 5 ? <FaStar /> : <FaRegStar />}</button>
                        </div>
                    </div>

                    {/* Create Review Section */}
                    <form
                        onSubmit={handleSubmit(handleCreateReview)}
                        className={'flex flex-col justify-between'}>
                        <fieldset className="fieldset">
                            <textarea
                                {...register('review')}
                                rows={3}
                                maxLength={400}
                                placeholder="Write your experience or opinion about this scholarship..."
                                className="textarea textarea-bordered w-full resize-y"
                            />
                        </fieldset>
                        <button type='submit' className='btn btn-soft btn-warning border border-orange-400 w-full mt-2'>Post Review</button>
                    </form>


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