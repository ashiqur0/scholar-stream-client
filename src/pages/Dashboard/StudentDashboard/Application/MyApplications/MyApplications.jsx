import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../../hooks/useAuth';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import { Link } from 'react-router';

const MyApplications = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: applications = [] } = useQuery({
        queryKey: ['applications'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications?email=${user.email}`);
            return res.data;
        }
    });

    console.log('application array', applications);

    return (
        <div className='md:max-w-7xl md:mx-auto p-4'>
            <h1 className='text-2xl font-bold'>My Applications</h1>

            <h2 className='font-xl font-semibold mt-10'>Total Applied ({applications.length})</h2>
            <div className="overflow-x-auto ">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>University</th>
                            <th>Category</th>
                            <th>Degree</th>
                            <th>Applied</th>
                            <th>Status</th>
                            <th>View</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applications.map((application, index) => <tr key={application._id}>
                                <td>{index + 1}</td>
                                <td>{application.universityName}</td>
                                <td>{application.scholarshipCategory}</td>
                                <td>{application.degree}</td>
                                <td>{application.applicationDate?.slice(0, 10)}</td>
                                <td>{application.applicationStatus}</td>
                                <td>
                                    <Link to={`/scholarship/details/${application.scholarshipId}`} className="btn btn-outline btn-success">view
                                    </Link>
                                </td>
                                <td>
                                    <button className='btn btn-soft btn-secondary'>Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default MyApplications;