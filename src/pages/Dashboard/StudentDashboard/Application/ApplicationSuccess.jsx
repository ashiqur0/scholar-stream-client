import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useEffect } from 'react';

const ApplicationSuccess = () => {

    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (sessionId) {
            axiosSecure.post(`/application-success?session_id=${sessionId}`)
                .then(res => {
                    setPaymentInfo({
                        transactionId: res.data.transactionId
                    })
                })
        }
    }, [sessionId, axiosSecure]);

    return (
        <div className='md:max-w-7xl md:mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-5'>Application Success</h1>
            <p>Your transaction id: <span className='text-green-500'>{paymentInfo.transactionId}</span></p>

            <Link to={'/dashboard/my-applications'} className='btn btn-soft btn-success border border-green-400 mt-5 text-black'>My Application</Link>
        </div>
    );
};

export default ApplicationSuccess;