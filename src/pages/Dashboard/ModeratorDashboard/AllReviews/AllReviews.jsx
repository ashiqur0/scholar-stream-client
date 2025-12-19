import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const AllReviews = () => {
    
    const axiosSecure = useAxiosSecure();

    const { data: all_review = [], refetch } = useQuery({
        queryKey: ['all_review'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/review/all-review`);
            return res.data;
        }
    });
    refetch();

    const deleteReview = review => {
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
                axiosSecure.delete(`/review/${review._id}/moderator`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Review has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
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