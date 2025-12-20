import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useState } from 'react';
import { FaRegStar, FaStar } from "react-icons/fa6";

const Review = ({ scholarship }) => {

    const { register, handleSubmit } = useForm();
    const { user } = useAuth();
    const axios = useAxios();
    const axiosSecure = useAxiosSecure();
    const [rating, setRating] = useState(0);


    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axios.get(`/review/${scholarship._id}`);
            return res.data;
        }
    });

    refetch();

    const handleCreateReview = review => {
        const reviewInfo = {
            reviewerImage: user.photoURL,
            reviewerName: user.displayName,
            reviewerEmail: user.email,
            review: review.review,
            createdAt: new Date(),
            scholarshipId: scholarship._id,
            rating: rating
        }

        axiosSecure.post(`/review`, reviewInfo)
            .then(() => {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Review posted",
                    showConfirmButton: false,
                    timer: 2500
                });
            })
    }

    return (
        <div className='md:max-w-7xl md:mx-auto p-4'>

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
            <form onSubmit={handleSubmit(handleCreateReview)} className={'flex flex-col justify-between'}>
                <fieldset className="fieldset">
                    <textarea
                        {...register('review')}
                        rows={3}
                        maxLength={400}
                        placeholder="Write your experience or opinion about this scholarship..."
                        className="textarea textarea-bordered w-full md:w-48/100 resize-y"
                    />
                </fieldset>
                <button type='submit' className='btn btn-soft btn-warning border border-orange-400 w-full md:w-48/100 mt-2'>Post</button>
            </form>

            {/* Display Review Section */}
            <h1 className='mt-5 mb-2'>Total review({reviews.length})</h1>

            {
                reviews.map(review => <div key={review._id} className={`space-y-1 p-2 border border-orange-400 mb-3 md:w-48/100 bg-neutral-800 w-full rounded-xl`}>
                    <div className='flex items-center gap-2'>
                        <img src={review.reviewerImage} className='w-8 h-auto rounded-full' alt={review.reviewerName} />
                        <h1 className='font-bold text-xl'>{review.reviewerName}</h1>
                        <p className='flex items-center gap-1'>
                            {
                                [...Array(review.rating)].map((_, index) => <span key={index} className='text-orange-400'><FaStar /></span>)
                            }
                            {
                                [...Array(5 - review.rating)].map((_, index) => <span key={index} className=''><FaRegStar /></span>)
                            }
                        </p>
                    </div>
                    <p className='ml-10'>{review.review}</p>
                    <p className='ml-10 text-gray-500 text-[12px]'>{new Date(review?.createdAt).toLocaleString()}</p>
                </div>

                )
            }
        </div>
    );
};

export default Review;