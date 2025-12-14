import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { FaLocationDot } from "react-icons/fa6";
import useAxios from '../../../hooks/useAxios';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useId from '../../../hooks/useId';
import Review from '../../../components/common/Review';
import Swal from 'sweetalert2';

const ScholarshipDetails = () => {

    const [scholarship, setScholarship] = useState({});
    const axios = useAxios();
    const { id } = useParams();
    const applyModalRef = useRef(null);
    const { register, handleSubmit } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { id: userId } = useId();
    // console.log(userId);

    useEffect(() => {
        axios.get(`/scholarship/${id}`)
            .then(res => {
                setScholarship(res.data);
            })
    }, [axios, id])

    const { _id, universityImage, universityName, scholarshipName, universityCountry, universityCity, universityWorldRank, subjectCategory, scholarshipCategory, degree, scholarshipPostDate, applicationDeadline, applicationFees, serviceCharge, postedUserEmail, } = scholarship;

    const handleApplyModalOpen = () => {
        applyModalRef.current.showModal();
    }

    const handleApply = (data) => {
        const applicationInfo = {
            scholarshipId: _id,
            scholarshipName: data.scholarshipName2,
            userId: userId,
            userName: data.userName,
            userEmail: data.userEmail,
            universityName: universityName,
            scholarshipCategory: scholarshipCategory,
            degree: degree,
            applicationFees: applicationFees,
            serviceCharge: serviceCharge,
            applicationStatus: 'pending',
            paymentStatus: 'unpaid',
            applicationDate: new Date().toISOString().replace("Z", "+00:00"),
            feedback: ''
        }
        axiosSecure.post(`/application?email=${user.email}`, applicationInfo)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Application successful",
                    showConfirmButton: false,
                    timer: 2500
                });
            });
    }

    return (
        <div className='max-w-7xl md:mx-auto mx-3 my-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 justify-center items-start md:gap-10 gap-5 md:p-10 p-3 rounded-xl h-full'>
                <div>
                    <img src={universityImage} alt={universityName} className='rounded-xl md:w-full md:h-100 overflow-hidden' />
                </div>

                <div className='h-full flex flex-col justify-between space-y-5'>
                    <div className='space-y-2'>
                        <h1 className='text-2xl font-semibold'>{scholarshipName}</h1>
                        <p className='font-semibold text-xl'>{universityName} <span className='text-xs'>(World Rank: {universityWorldRank})</span></p>
                        <div className='font-semibold flex items-center gap-1'>
                            <span><FaLocationDot /></span> <span>{universityCountry}, {universityCity}</span></div>

                        <p className='font-semibold'>Subject: {subjectCategory}</p>
                        <p className='font-semibold'>Category: {scholarshipCategory}</p>
                        <p className='font-semibold'>Degree: {degree}</p>
                        <p className='font-semibold'>Scholarship Published: {scholarshipPostDate?.slice(0, 10)}</p>
                        <p className='font-semibold'>Application Deadline: {applicationDeadline?.slice(0, 10)}</p>
                        <p className='font-semibold'>Application Fee: ${applicationFees}</p>
                        <p className='font-semibold'>Contact: {postedUserEmail}</p>
                    </div>
                    <button onClick={handleApplyModalOpen} className='btn btn-primary'>Apply Now</button>
                </div>
            </div>

            {/* modal */}
            <dialog ref={applyModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">

                    <form onSubmit={handleSubmit(handleApply)} className={'flex flex-col justify-between'}>
                        <fieldset className='fieldset'>

                            {/* Scholarship Name */}
                            <label className="label mt-4 text-[14px]">Scholarship Name</label>
                            <input
                                type="text"
                                {...register('scholarshipName2')}
                                className="input w-full"
                                defaultValue={scholarshipName}
                            />

                            {/* University Name */}
                            <label className="label mt-4 text-[14px]">University Name</label>
                            <input
                                type="text"
                                {...register('universityName')}
                                className="input w-full"
                                defaultValue={universityName}
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
                                defaultValue={scholarshipCategory}
                            />

                            {/* degree */}
                            <label className="label mt-4 text-[14px]">Degree</label>
                            <input
                                type="text"
                                {...register('degree')}
                                className="input w-full"
                                defaultValue={degree}
                            />

                            {/* Application Fees */}
                            <label className="label mt-4 text-[14px]">Application Fees</label>
                            <input
                                type="text"
                                {...register('applicationFees')}
                                className="input w-full"
                                defaultValue={applicationFees}
                            />

                            {/* Service Charge */}
                            <label className="label mt-4 text-[14px]">Service Charge</label>
                            <input
                                type="text"
                                {...register('serviceCharge')}
                                className="input w-full"
                                defaultValue={serviceCharge}
                            />
                        </fieldset>
                        <button type='submit' className='btn btn-primary mt-5'>Submit</button>
                    </form>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <Review scholarship={scholarship} />
        </div>
    );
};

export default ScholarshipDetails;