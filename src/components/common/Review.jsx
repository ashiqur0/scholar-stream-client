import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';
import { FaRegStar, FaStar } from "react-icons/fa6";

const Review = ({ scholarship }) => {
    
    const axios = useAxios();

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axios.get(`/review/${scholarship._id}`);
            return res.data;
        }
    });

    refetch();

    return (
        <div className='md:max-w-7xl md:mx-auto md:p-10 p-3'>

            {/* Display Review Section */}
            <h1 className='mb-2'>Total review({reviews.length})</h1>

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