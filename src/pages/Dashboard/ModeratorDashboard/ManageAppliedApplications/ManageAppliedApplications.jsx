import React from 'react';
import useAxios from '../../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { TiTick } from "react-icons/ti";


const ManageAppliedApplications = () => {

    const axios = useAxios();

    const { data: applications = [], refetch } = useQuery({
        queryKey: ['applications'],
        queryFn: async () => {
            const res = await axios.get('/applications');
            return res.data;
        }
    });

    const updateApplicationStatus = (application, status) => {
        const updatedStatus = {
            applicationStatus: status
        }

        axios.patch(`/applications/${application._id}`, updatedStatus)
            .then(res => {
                refetch();
                console.log('after status updating', res.data);
            })
    }

    return (
        <div className='md:max-w-7xl md:mx-auto p-4'>
            <h1 className='text-2xl font-bold'>Manage Applied Applications</h1>

            <h2 className='font-xl font-semibold mt-10'>Total Application ({applications.length})</h2>
            <div className="overflow-x-auto ">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>University</th>
                            <th>Degree</th>
                            <th>Student</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applications.map((application, index) => <tr key={application._id}>
                                <th>{index + 1}</th>
                                <td>{application.universityName}</td>
                                <td>{application.degree}</td>
                                <td>{application.userName}</td>
                                <td>{application.userEmail}</td>
                                <td className=''>
                                    {
                                        application.applicationStatus === 'pending' && <>
                                            <button onClick={() => updateApplicationStatus(application, 'processing')} className='btn font-bold'>processing</button>
                                        </>
                                    }
                                    {
                                        application.applicationStatus === 'processing' && <>
                                            <div className='flex items-center justify-start gap-2'>
                                                <button onClick={() => updateApplicationStatus(application, 'approved')} className='btn btn-outline btn-success'><TiTick size={20} /></button>

                                                <button onClick={() => updateApplicationStatus(application, 'canceled')} className='btn btn-outline btn-error font-bold'>X</button>
                                            </div>
                                        </>
                                    }
                                    {
                                        application.applicationStatus === 'approved' && <>
                                            <p className='text-green-500'>Approved</p>
                                        </>
                                    }
                                    {
                                        application.applicationStatus === 'canceled' && <>
                                            <p className='text-red-500'>Approved</p>
                                        </>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageAppliedApplications;