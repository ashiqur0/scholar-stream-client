import React from 'react';
import useAxios from '../../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { Link } from 'react-router';

const ManageScholarship = () => {

    const axios = useAxios();
    const axiosSecure = useAxiosSecure();

    const { data: scholarships = [], refetch } = useQuery({
        queryKey: ['scholarships'],
        queryFn: async () => {
            const res = await axios.get('/scholarship');
            const { scholarships: data } = res.data
            return data;
        }
    });

    const manageScholarship = scholarship => {
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
                axiosSecure.delete(`/scholarship/${scholarship._id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Application Deleted Successfully.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className='md:max-w-7xl md:mx-auto p-4'>
            <title>Manage Scholarship</title>
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
                            <th>View</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            scholarships.map((scholarship, index) => <tr key={scholarship._id} className=''>
                                <td>{index + 1}</td>
                                <td>{scholarship.scholarshipName}</td>
                                <td>{scholarship.universityName}</td>
                                <td>{scholarship.universityCountry}, {scholarship.universityCity}</td>
                                <td>{scholarship.subjectCategory}</td>
                                <td>{scholarship.scholarshipCategory}</td>
                                <td>{scholarship.degree}</td>
                                <td>
                                    <Link to={`/scholarship/details/${scholarship._id}`} className="btn btn-sm btn-outline btn-success">view
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => manageScholarship(scholarship)} className='btn btn-sm btn-soft btn-secondary border border-secondary w-25'>Delete</button>
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