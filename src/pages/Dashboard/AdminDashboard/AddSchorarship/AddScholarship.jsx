import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../hooks/useAuth';
import axios from 'axios';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddScholarship = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();

    const handleAddScholarship = (data) => {

        const universityImage = data.universityImage[0];

        // store the image in form data
        const formData = new FormData();
        formData.append('image', universityImage);

        // image bb photo upload api url
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`

        axios.post(image_API_URL, formData)
            .then(res => {

                // get direct link
                const universityImage = res.data.data.url;

                // store user to database
                const scholarshipInfo = {
                    scholarshipName: data.scholarshipName,
                    universityName: data.universityName,
                    universityImage: universityImage,
                    universityCountry: data.universityCountry,
                    universityCity: data.universityCity,
                    universityWorldRank: data.universityWorldRank,
                    subjectCategory: data.subjectCategory,
                    scholarshipCategory: data.scholarshipCategory,
                    degree: data.degree,
                    tuitionFees: data.tuitionFees,
                    applicationFees: data.applicationFees,
                    serviceCharge: data.serviceCharge,
                    applicationDeadline: new Date(data.applicationDeadline).toISOString().replace("Z", "+00:00"),
                    scholarshipPostDate: new Date().toISOString().replace("Z", "+00:00"),
                    postedUserEmail: data.postedUserEmail,
                }

                axiosSecure.post(`/scholarship?email=${user.email}`, scholarshipInfo)
                    .then(() => {
                        reset();
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Scholarship Added Successfully",
                            showConfirmButton: false,
                            timer: 2500
                        });
                    })

            });
    }

    return (
        <div className='md:max-w-7xl md:mx-auto p-4'>
            <h1 className='md:text-2xl text-xl font-semibold'>Add Scholarship</h1>

            <form onSubmit={handleSubmit(handleAddScholarship)} className='p-4'>

                <div className='grid grid-cols-1 md:grid-cols-2 mb-8 gap-10'>
                    {/* left column*/}
                    <fieldset className="fieldset">

                        {/* Scholarship Name */}
                        <label className="label mt-4 text-[14px]">Scholarship Name</label>
                        <input
                            type="text"
                            {...register('scholarshipName')}
                            className="input w-full"
                            placeholder='Scholarship Name'
                        />

                        {/* University Name */}
                        <label className="label mt-4 text-[14px]">University Name</label>
                        <input
                            type="text"
                            {...register('universityName')}
                            className="input w-full"
                            placeholder='University Name'
                        />

                        {/* University Image */}
                        <label className="label mt-4 text-[14px]">University Image</label>
                        <input
                            type="file"
                            {...register('universityImage')}
                            className="file-input w-full"
                            placeholder='University Image'
                        />

                        {/* University Country */}
                        <label className="label mt-4 text-[14px]">University Country</label>
                        <input
                            type="txt"
                            {...register('universityCountry')}
                            className="input w-full"
                            placeholder='University Country'
                        />

                        {/* University City */}
                        <label className="label mt-4 text-[14px]">University City</label>
                        <input
                            type="txt"
                            {...register('universityCity')}
                            className="input w-full"
                            placeholder='University City'
                        />

                        {/* University World Rank */}
                        <label className="label mt-4 text-[14px]">University World Rank</label>
                        <input
                            type="txt"
                            {...register('universityWorldRank')}
                            className="input w-full"
                            placeholder='University World Rank'
                        />

                        {/* Subject Category */}
                        <label className="label mt-4 text-[14px]">Subject Category</label>
                        <input
                            type="txt"
                            {...register('subjectCategory')}
                            className="input w-full"
                            placeholder='Subject Category'
                        />
                    </fieldset>

                    {/* right column */}
                    <fieldset className="fieldset">

                        {/* Scholarship Category */}
                        <label className="label mt-4 text-[14px]">Scholarship Category</label>
                        <input
                            type="txt"
                            {...register('scholarshipCategory')}
                            className="input w-full"
                            placeholder='Scholarship Category'
                        />

                        {/* Degree */}
                        <label className="label mt-4 text-[14px] ">Degree</label>
                        <input
                            type="txt"
                            {...register('degree')}
                            className="input w-full"
                            placeholder='Degree'
                        />

                        {/* Tuition Fees */}
                        <label className="label mt-4 text-[14px] ">Tuition Fees</label>
                        <input
                            type="txt"
                            {...register('tuitionFees')}
                            className="input w-full"
                            placeholder='Tuition Fees'
                        />

                        {/* Application Fees */}
                        <label className="label mt-4 text-[14px] ">Application Fees</label>
                        <input
                            type="txt"
                            {...register('applicationFees')}
                            className="input w-full"
                            placeholder='Application Fees'
                        />

                        {/* Service Charge */}
                        <label className="label mt-4 text-[14px] ">Service Charge</label>
                        <input
                            type="txt"
                            {...register('serviceCharge')}
                            className="input w-full"
                            placeholder='Service Charge'
                        />

                        {/* Application Deadline */}
                        <label className="label mt-4 text-[14px] ">Application Deadline</label>
                        <input
                            type="date"
                            {...register('applicationDeadline')}
                            className="input w-full"
                            placeholder='Application Deadline'
                        />

                        {/* Posted User Email */}
                        <label className="label mt-4 text-[14px] ">Posted User Email</label>
                        <input
                            type="txt"
                            {...register('postedUserEmail')}
                            className="input w-full"
                            placeholder='Posted User Email'
                            defaultValue={user.email}
                        />
                    </fieldset>
                </div>

                <button type="submit" className='btn btn-primary w-full md:w-80'>Add Scholarship</button>
            </form >
        </div>
    );
};

export default AddScholarship;