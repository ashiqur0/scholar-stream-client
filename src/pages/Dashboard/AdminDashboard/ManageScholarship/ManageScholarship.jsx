import React from 'react';
import useAxios from '../../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { Link } from 'react-router';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../hooks/useAuth';

const ManageScholarship = () => {

    const { user } = useAuth();
    const axios = useAxios();
    const axiosSecure = useAxiosSecure();
    const updateScholarshipModalRef = useRef(null);
    const { register, handleSubmit, reset } = useForm();

    const { data: scholarships = [], refetch } = useQuery({
        queryKey: ['scholarships'],
        queryFn: async () => {
            const res = await axios.get('/scholarship');
            const { scholarships: data } = res.data
            return data;
        }
    });

    const manageScholarship = scholarship => {
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
                axiosSecure.delete(`/scholarship/${scholarship._id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Application Deleted Successfully.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handleUpdateScholarshipModalOpen = () => {
        updateScholarshipModalRef.current.showModal();
    }

    const handleUpdateScholarship = async (data) => {
        // 1. Get the specific scholarship
        const scholarship = scholarships.find(s => s.scholarshipName === data.scholarshipName);

        // Use existing deadline if not provided
        if (!data.applicationDeadline) data.applicationDeadline = scholarship.applicationDeadline;

        const universityImage = data.universityImage?.[0]; // Added optional chaining
        let universityImageURL = scholarship.universityImage;

        // 2. Wait for Image Upload (if a new image exists)
        if (universityImage) {
            const formData = new FormData();
            formData.append('image', universityImage);

            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;

            try {
                // We 'await' the response here so execution stops until the URL is received
                const res = await axios.post(image_API_URL, formData);
                universityImageURL = res.data.data.url;
            } catch (error) {
                console.error("Image upload failed:", error);
                // Optional: Show an error alert if the upload fails
                return;
            }
        }

        // 3. Construct the update object
        const scholarshipInfo = {
            scholarshipName: data.scholarshipName,
            scholarshipDescription: data.scholarshipDescription,
            universityName: data.universityName,
            universityImage: universityImageURL, // This will now be the updated URL
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
            postedUserEmail: user.email,
        };

        // console.log(scholarshipInfo);

        // 4. Send the patch request
        try {
            const response = await axiosSecure.patch(`/scholarship/${scholarship._id}`, scholarshipInfo);

            if (response.data) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Scholarship Updated Successfully",
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        } catch (error) {
            console.error("Database update failed:", error);
        }
    };

    return (
        <div className='md:max-w-7xl md:mx-auto p-4'>
            <title>Manage Scholarship</title>
            <h1 className='text-2xl font-bold'>Manage Scholarship</h1>

            <h2 className='font-xl font-semibold mt-10'>Total Application ({scholarships.length})</h2>
            <div className="overflow-x-auto ">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Scholarship Name</th>
                            <th>University</th>
                            <th>Location</th>
                            <th>Subject</th>
                            <th>Category</th>
                            <th>Degree</th>
                            <th>Edit</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            scholarships.map((scholarship, index) => <tr key={scholarship._id} className=''>
                                <td>{index + 1}</td>
                                <td>{scholarship.scholarshipName}</td>
                                <td>{scholarship.universityName}</td>
                                <td>{scholarship.universityCountry}, {scholarship.universityCity}</td>
                                <td>{scholarship.subjectCategory}</td>
                                <td>{scholarship.scholarshipCategory}</td>
                                <td>{scholarship.degree}</td>
                                <td>
                                    <button onClick={handleUpdateScholarshipModalOpen} className="btn btn-sm btn-outline btn-warning">edit
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => manageScholarship(scholarship)} className='btn btn-sm btn-soft btn-secondary border border-secondary w-25'>Delete</button>
                                </td>

                                {/* modal */}
                                <dialog ref={updateScholarshipModalRef} className="modal modal-bottom sm:modal-middle">
                                    <div className="modal-box">
                                        <form onSubmit={handleSubmit(handleUpdateScholarship)} className={'flex flex-col justify-between'}>
                                            <div className='grid grid-cols-1 md:grid-cols-2 mb-8 gap-10'>
                                                {/* left column*/}
                                                <fieldset className="fieldset">

                                                    {/* Scholarship Name */}
                                                    <label className="label mt-4 text-[14px]">Scholarship Name</label>
                                                    <input
                                                        type="text"
                                                        {...register('scholarshipName')}
                                                        className="input w-full "
                                                        placeholder='Scholarship Name'
                                                        defaultValue={scholarship.scholarshipName}
                                                    />

                                                    {/* Scholarship Description */}
                                                    <label className="label mt-4 text-[14px]">Scholarship Description</label>
                                                    <textarea
                                                        rows={3}
                                                        maxLength={4000}
                                                        {...register('scholarshipDescription')}
                                                        className="input w-full"
                                                        placeholder='Scholarship Description'
                                                        defaultValue={scholarship.scholarshipDescription}
                                                    />

                                                    {/* University Name */}
                                                    <label className="label mt-4 text-[14px]">University Name</label>
                                                    <input
                                                        type="text"
                                                        {...register('universityName')}
                                                        className="input w-full"
                                                        placeholder='University Name'
                                                        defaultValue={scholarship.universityName}
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
                                                        defaultValue={scholarship.universityCountry}
                                                    />

                                                    {/* University City */}
                                                    <label className="label mt-4 text-[14px]">University City</label>
                                                    <input
                                                        type="txt"
                                                        {...register('universityCity')}
                                                        className="input w-full"
                                                        placeholder='University City'
                                                        defaultValue={scholarship.universityCity}
                                                    />

                                                    {/* University World Rank */}
                                                    <label className="label mt-4 text-[14px]">University World Rank</label>
                                                    <input
                                                        type="txt"
                                                        {...register('universityWorldRank')}
                                                        className="input w-full"
                                                        placeholder='University World Rank'
                                                        defaultValue={scholarship.universityWorldRank}
                                                    />
                                                </fieldset>

                                                {/* right column */}
                                                <fieldset className="fieldset">

                                                    {/* Subject Category */}
                                                    <label className="label mt-4 text-[14px]">Subject Category</label>
                                                    <input
                                                        type="txt"
                                                        {...register('subjectCategory')}
                                                        className="input w-full"
                                                        placeholder='Subject Category'
                                                        defaultValue={scholarship.subjectCategory}
                                                    />

                                                    {/* Scholarship Category */}
                                                    <label className="label mt-4 text-[14px]">Scholarship Category</label>
                                                    <input
                                                        type="txt"
                                                        {...register('scholarshipCategory')}
                                                        className="input w-full"
                                                        placeholder='Scholarship Category'
                                                        defaultValue={scholarship.scholarshipCategory}
                                                    />

                                                    {/* Degree */}
                                                    <label className="label mt-4 text-[14px] ">Degree</label>
                                                    <input
                                                        type="txt"
                                                        {...register('degree')}
                                                        className="input w-full"
                                                        placeholder='Degree'
                                                        defaultValue={scholarship.degree}
                                                    />

                                                    {/* Tuition Fees */}
                                                    <label className="label mt-4 text-[14px] ">Tuition Fees</label>
                                                    <input
                                                        type="txt"
                                                        {...register('tuitionFees')}
                                                        className="input w-full"
                                                        placeholder='Tuition Fees'
                                                        defaultValue={scholarship.tuitionFees}
                                                    />

                                                    {/* Application Fees */}
                                                    <label className="label mt-4 text-[14px] ">Application Fees</label>
                                                    <input
                                                        type="txt"
                                                        {...register('applicationFees')}
                                                        className="input w-full"
                                                        placeholder='Application Fees'
                                                        defaultValue={scholarship.applicationFees}
                                                    />

                                                    {/* Service Charge */}
                                                    <label className="label mt-4 text-[14px] ">Service Charge</label>
                                                    <input
                                                        type="txt"
                                                        {...register('serviceCharge')}
                                                        className="input w-full"
                                                        placeholder='Service Charge'
                                                        defaultValue={scholarship.serviceCharge}
                                                    />

                                                    {/* Application Deadline */}
                                                    <label className="label mt-4 text-[14px] ">Application Deadline</label>
                                                    <input
                                                        type="date"
                                                        {...register('applicationDeadline')}
                                                        className="input w-full"
                                                        placeholder='Application Deadline'
                                                        defaultValue={scholarship.applicationDeadline}
                                                    />
                                                </fieldset>
                                            </div>
                                            <button type='submit' className='btn btn-soft btn-warning border border-orange-400 mt-0'>Update</button>
                                        </form>
                                    </div>

                                    <form method="dialog" className="modal-backdrop">
                                        <button>close</button>
                                    </form>
                                </dialog >
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default ManageScholarship;