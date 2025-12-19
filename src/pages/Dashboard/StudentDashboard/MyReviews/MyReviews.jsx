import React from 'react';
import useAxios from '../../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const MyReviews = () => {

    const axios = useAxios();
    const axiosSecure = useAxiosSecure();
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
                                text: "Your parcel request has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
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
                            <th>Scholarship Name</th>
                            <th>University Name</th>
                            <th>Review</th>
                            <th>Data</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            my_reviews.map((review, index) => <tr key={review._id}>
                                <td>{index + 1}</td>
                                <td>{review.scholarshipName}</td>
                                <td>{review.universityName}</td>
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

export default MyReviews;