import React from 'react';
import useAxios from '../../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Scholarship from '../../../../components/Scholarship';

const TopScholarship = () => {

    const axios = useAxios();

    const { data: scholarships = [] } = useQuery({
        queryKey: ['scholarship'],
        queryFn: async () => {
            const res = await axios.get('/latest-scholarship');
            return res.data;
        }
    });

    return (
        <div className='my-6 md:max-w-7xl md:mx-auto p-4'>
            <h1 className='md:text-3xl text-2xl font-semibold mb-5'>Top Scholarship({scholarships.length})</h1>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                {
                    scholarships.map(scholarship => <Scholarship key={scholarship._id} scholarship={scholarship}></Scholarship>)
                }
            </div>
        </div>
    );
};

export default TopScholarship;