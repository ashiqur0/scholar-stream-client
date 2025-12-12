import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const ScholarshipDetails = () => {

    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: scholarship } = useQuery({
        queryKey: ['scholarship'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/scholarship/${id}?email=${user.email}`);
            return res.data;
        }
    });

    console.log(scholarship);

    return (
        <div>
            <h1>Scholarship Details Page</h1>
        </div>
    );
};

export default ScholarshipDetails;