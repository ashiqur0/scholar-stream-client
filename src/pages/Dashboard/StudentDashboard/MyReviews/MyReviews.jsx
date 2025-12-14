import React from 'react';
import useAxios from '../../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';

const MyReviews = () => {

    const axios = useAxios();
    const { user } = useAuth();

    const { data: my_reviews = [], refetch } = useQuery({
        queryKey: ['my_reviews'],
        queryFn: async () => {
            const res = await axios.get(`/review?email=${user.email}`);
            return res.data;
        }
    });
    refetch();

    const deleteReview = review => {
        axios.delete(`/review/${review._id}`)
            .then(res => {
                refetch();
                console.log('delete scholarship success', res.data);
            })
    }

    return (
        <div className='md:max-w-7xl md:mx-auto p-4'>
            <h1 className='text-2xl font-bold'>Total Reviews ({my_reviews.length})</h1>

            <div className="overflow-x-auto ">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            {/* 
                            // need to display info like this:

                            <th>Scholarship Name</th>
                            <th>University Name</th> */}
                            <th>Name</th>
                            <th>Email</th>
                            <th>Review</th>
                            <th>Data</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            my_reviews.map((review, index) => <tr key={review._id}>
                                <td>{index + 1}</td>
                                <td>{review.reviewerName}</td>
                                <td>{review.reviewerEmail}</td>
                                <td>{review.review}</td>
                                <td>{review.createdAt}</td>
                                <td>
                                     <button onClick={() => deleteReview(review)} className='btn btn-sm btn-soft btn-secondary w-25'>Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyReviews;