import React from 'react';
import useAxios from '../../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Scholarship from '../../../../components/Scholarship';

const TopScholarship = () => {

    const axios = useAxios();

    const { data: scholarship = [] } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axios.get('/latest-scholarship');
            return res.data;
        }
    })

    // console.log(scholarship);

    return (
        <div className='my-10'>
            <h1 className='md:text-3xl text-2xl font-semibold mb-5'>Latest products({scholarship.length})</h1>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                {
                    scholarship.map(product => <Scholarship key={product._id} scholarship={scholarship}></Scholarship>)
                }
            </div>
        </div>
    );
};

export default TopScholarship;