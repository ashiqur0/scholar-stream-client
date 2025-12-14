import React from 'react';
import useAxios from '../../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const AllReviews = () => {

    const axios = useAxios();

    const { data: all_review = [], refetch } = useQuery({
        queryKey: ['all_review'],
        queryFn: async () => {
            const res = await axios.get(`/review`);
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
            <h1 className='text-2xl font-bold'>All Reviews ({all_review.length})</h1>

            <div className="overflow-x-auto ">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Scholarship Name</th>
                            <th>University Name</th>
                            <th>Student Name</th>
                            <th>Student Email</th>
                            <th>Review</th>
                            <th>Data</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            all_review.map((review, index) => <tr key={review._id}>
                                <td>{index + 1}</td>
                                <td>{review.scholarshipName}</td>
                                <td>{review.universityName}</td>
                                <td>{review.reviewerName}</td>
                                <td>{review.reviewerEmail}</td>
                                <td>{review.review}</td>
                                <td>{review.createdAt?.slice(0, 10)}</td>
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

export default AllReviews;