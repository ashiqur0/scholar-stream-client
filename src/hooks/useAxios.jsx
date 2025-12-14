import React from 'react';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `https://scholar-strem-server-by-ashiqur-3ozaop4zn.vercel.app/`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;