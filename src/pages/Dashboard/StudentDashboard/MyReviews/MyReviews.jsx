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
    console.log('my reviews', my_reviews);

    return (
        <div className='md:max-w-7xl md:mx-auto p-4'>
            <h1 className='font-xl font-semibold mt-10'>Total Reviews ({my_reviews.length})</h1>
        </div>
    );
};

export default MyReviews;