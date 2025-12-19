import React from 'react';
import { Link, useSearchParams } from 'react-router';

const ApplicationCancelled = () => {

    const [searchParams] = useSearchParams();
    const scholarshipId = searchParams.get('scholarshipId');

    return (
        <div className='md:max-w-7xl md:mx-auto p-4'>
            <h1>Application is Canceled Please Try Again</h1>
            <Link to={`/scholarship/details/${scholarshipId}`} className='btn btn-primary text-black'>Try Again</Link>
        </div>
    );
};

export default ApplicationCancelled;