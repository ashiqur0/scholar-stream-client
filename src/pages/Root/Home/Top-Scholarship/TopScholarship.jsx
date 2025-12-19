import React, { useEffect, useState } from 'react';
import Scholarship from '../../../../components/Scholarship';
import useAuth from '../../../../hooks/useAuth';

const TopScholarship = () => {

    const { searchText } = useAuth();

    const [scholarships, setScholarships] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/latest-scholarship?search=${searchText}`)
            .then(res => res.json())
            .then(data => {
                setScholarships(data);
            });
    }, [searchText]);

    return (
        <div className='my-6 md:max-w-7xl md:mx-auto p-4'>
            <h1 className='md:text-2xl text-xl font-semibold mb-5'>Top Scholarship({scholarships.length})</h1>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                {
                    scholarships.map(scholarship => <Scholarship key={scholarship._id} scholarship={scholarship}></Scholarship>)
                }
            </div>
        </div>
    );
};

export default TopScholarship;