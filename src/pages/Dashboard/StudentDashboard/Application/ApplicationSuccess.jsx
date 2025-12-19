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
            <h1>Application Success Page</h1>
            <p>Your transaction id = {paymentInfo.transactionId}</p>

            <Link to={'/dashboard/my-applications'} className='btn btn-primary text-black'>My Application</Link>
        </div>
    );
};

export default ApplicationSuccess;