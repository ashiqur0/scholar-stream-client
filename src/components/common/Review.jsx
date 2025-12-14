import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
// import useAxiosSecure from '../../hooks/useAxiosSecure';

const Review = ({ scholarship }) => {

    const { register, handleSubmit } = useForm();
    const { user } = useAuth();
    const axios = useAxios();
    // const axiosSecure = useAxiosSecure();

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
        <div>
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
            <h1 className='mt-5'>Total review({reviews.length})</h1>
        </div>
    );
};

export default Review;