import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { Link } from 'react-router';
import { FaRegStar, FaStar } from 'react-icons/fa6';
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineRateReview } from 'react-icons/md';
import { useRef } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const MyReviews = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const updateReviewModalRef = useRef(null);
    const [review, setReview] = useState({});
    const [rating, setRating] = useState(0);
    const { register, handleSubmit } = useForm();

    const { data: my_reviews = [], refetch } = useQuery({
        queryKey: ['my_reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/review?email=${user.email}`);
            return res.data;
        }
    });
    refetch();

    const handleUpdateReviewModalOpen = (review) => {
        updateReviewModalRef.current.showModal();
        setReview(review);
        setRating(review.rating);
    }

    const handleUpdateReview = data => {
        const updatedReview = {
            review: data.review,
            rating: rating
        }

        axiosSecure.patch(`/review/${review._id}`, updatedReview)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Review updated",
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            })
    }

    const deleteReview = review => {
        console.log(review);
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
                axiosSecure.delete(`/review/${review._id}?email=${user.email}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your review has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className='md:max-w-7xl md:mx-auto p-4'>
            <title>My Reviews</title>
            <h1 className='text-2xl font-bold'>Total Reviews ({my_reviews.length})</h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra min-w-[1200px] w-full">
                    {/* head */}
                    <thead>
                        <tr className='grid grid-cols-21 items-center'>
                            <th className='col-span-1'>#</th>
                            <th className='col-span-7'>Scholarship Name</th>
                            <th className='col-span-4'>University Name</th>
                            <th className='col-span-3'>Review Comment</th>
                            <th className='col-span-2'>Rating</th>
                            <th className='col-span-2'>Review Data</th>
                            <th className='col-span-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            my_reviews.map((review, index) => <tr key={review._id} className='grid grid-cols-21 items-center'>
                                <td className='col-span-1'>{index + 1}</td>
                                <td className='col-span-7'>{review.scholarshipName}</td>
                                <td className='col-span-4'>{review.universityName}</td>
                                <td className='col-span-3'>{review.review}</td>
                                <td className='flex items-center gap-1 mt-3 col-span-2'>
                                    {
                                        [...Array(review.rating)].map((_, index) => <span key={index} className='text-orange-400'><FaStar /></span>)
                                    }
                                    {
                                        [...Array(5 - review.rating)].map((_, index) => <span key={index} className=''><FaRegStar /></span>)
                                    }
                                </td>
                                <td className='col-span-2'>{review.createdAt?.slice(0, 10)}</td>
                                <td className='flex items-center gap-1 col-span-2'>

                                    {/* Update review button */}
                                    <button
                                        onClick={() => handleUpdateReviewModalOpen(review)}
                                        title={'Update review'}
                                        className='btn btn-sm btn-soft btn-success border border-green-400'
                                    >
                                        <MdOutlineRateReview />
                                    </button>
                                    {/* delete button */}
                                    <button
                                        title={'Delete review'}
                                        onClick={() => deleteReview(review)}
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

            {/* add review modal */}
            <dialog ref={updateReviewModalRef} className="modal modal-bottom sm:modal-middle">
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
                        onSubmit={handleSubmit(handleUpdateReview)}
                        className={'flex flex-col justify-between'}>
                        <fieldset className="fieldset">
                            <textarea
                                {...register('review')}
                                rows={3}
                                maxLength={400}
                                placeholder="Write your experience or opinion about this scholarship..."
                                className="textarea textarea-bordered w-full resize-y"
                                defaultValue={review.review}
                            />
                        </fieldset>
                        <button type='submit' className='btn btn-soft btn-success border border-green-400 w-full mt-2'>Post Review</button>
                    </form>
                </div>

                {/* modal close */}
                <form method="dialog" className="modal-backdrop">
                    {/* if there is a button in form, it will close the modal */}
                    <button>Close</button>
                </form>
                
            </dialog>
        </div>
    );
};

export default MyReviews;