import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useId = () => {

    const { user } = useAuth(); 
    const axiosSecure = useAxiosSecure();

    const { data: id = '000', isLoading: idLoading } = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/id`);
            return res.data.id || '000';
        }
    });    

    return { id, idLoading };
};

export default useId;