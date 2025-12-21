import React from 'react';
import { Link, useSearchParams } from 'react-router';

const ApplicationCancelled = () => {

    const [searchParams] = useSearchParams();
    const scholarshipId = searchParams.get('scholarshipId');

    return (
        <div className='md:max-w-7xl md:mx-auto p-4'>
            <h1 className='text-2xl font-bold'>Application is Canceled</h1>
            <Link to={`/scholarship/details/${scholarshipId}`} className='btn  btn-soft btn-secondary border border-pink-500 mt-5'>Please Try Again</Link>
        </div>
    );
};

export default ApplicationCancelled;