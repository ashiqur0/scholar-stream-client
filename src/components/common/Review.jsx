import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
// import useAxiosSecure from '../../hooks/useAxiosSecure';

const Review = ({ scholarship }) => {

    const { register, handleSubmit } = useForm();
    const { user, toggle } = useAuth();
    const axios = useAxios();
    

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axios.get(`/review/${scholarship._id}`);
            return res.data;
        }
    });

    const handleCreateReview = review => {
        const reviewInfo = {
            reviewerImage: user.photoURL,
            reviewerName: user.displayName,
            review: review.review,
            createdAt: new Date(),
            scholarshipId: scholarship._id
        }

        axios.post(`/review`, reviewInfo)
            .then(res => {
                refetch();
                console.log('review post success', res.data);
            })
    }

    return (
        <div className='md:max-w-7xl md:mx-auto'>
            {/* Create Review Section */}
            <form onSubmit={handleSubmit(handleCreateReview)} className={'flex flex-col justify-between'}>
                <fieldset className="fieldset">
                    <label className="label">
                        <span className="label-text">Your Review</span>
                    </label>

                    <textarea
                        {...register('review')}
                        rows={3}
                        maxLength={400}
                        placeholder="Write your experience or opinion about this scholarship..."
                        className="textarea textarea-bordered w-2/3 resize-y"
                    />
                </fieldset>
                <button type='submit' className='btn btn-soft btn-secondary w-2/3 mt-2'>Post</button>
            </form>

            {/* Display Review Section */}
            <h1 className='mt-5 mb-2'>Total review({reviews.length})</h1>

            {
                reviews.map(review => <div key={review._id} className={`space-y-1 p-2 ${toggle? 'bg-gray-800' : '' }  mb-3 md:w-1/4 rounded-xl`}>
                    <div className='flex items-center gap-2'>
                        <img src={review.reviewerImage} className='w-8 h-auto' alt={review.reviewerName} />
                        <h1 className='font-bold text-xl'>{review.reviewerName}</h1>
                    </div>
                    <p className='ml-10 text-secondary'>{review.review}</p>
                </div>

                )
            }
        </div>
    );
};

export default Review;