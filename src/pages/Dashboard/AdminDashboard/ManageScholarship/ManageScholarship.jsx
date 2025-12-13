import React from 'react';
import useAxios from '../../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const ManageScholarship = () => {

    const axios = useAxios();

    const { data: scholarships = [], refetch } = useQuery({
        queryKey: ['scholarships'],
        queryFn: async () => {
            const res = await axios.get('/scholarship');
            return res.data;
        }
    });

    const manageScholarship = scholarship => {
        console.log(scholarship);
        axios.delete(`/scholarship/${scholarship._id}`)
            .then(res => {
                refetch();
                console.log('delete scholarship success', res.data);
            })
    }

    return (
        <div className='md:max-w-7xl md:mx-auto p-4'>
            <h1 className='text-2xl font-bold'>Manage Scholarship</h1>

            <h2 className='font-xl font-semibold mt-10'>Total Application ({scholarships.length})</h2>
            <div className="overflow-x-auto ">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Scholarship Name</th>
                            <th>University</th>
                            <th>Location</th>
                            <th>Subject</th>
                            <th>Category</th>
                            <th>Degree</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            scholarships.map((scholarship, index) => <tr key={scholarship._id}>
                                <td>{index + 1}</td>
                                <td>{scholarship.scholarshipName}</td>
                                <td>{scholarship.universityName}</td>
                                <td>{scholarship.universityCountry}, {scholarship.universityCity}</td>
                                <td>{scholarship.subjectCategory}</td>
                                <td>{scholarship.scholarshipCategory}</td>
                                <td>{scholarship.degree}</td>
                                <td>
                                    <button onClick={() => manageScholarship(scholarship)} className='btn btn-outline btn-error w-25'>Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageScholarship;