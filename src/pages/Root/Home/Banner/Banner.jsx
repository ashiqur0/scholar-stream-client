import React from 'react';
import { useForm } from 'react-hook-form';
import { CiSearch } from "react-icons/ci";

const Banner = () => {

    const { register, handleSubmit } = useForm();

    const handleSearch = (data) => {
        console.log(data);
    }

    return (
        <div className='md:max-w-7xl md:mx-auto mt-20 p-20'>
            <h1 className='text-center text-xl md:text-5xl text-orange-400 font-extrabold'>Your Gateway to Global Scholarships</h1>
            <p className='text-center mt-5 '>Search and apply for scholarships from leading universities with ease, transparency, and confidence.</p>
            <form onSubmit={handleSubmit(handleSearch)} className='mt-5 flex justify-center items-center'>
                <div className='flex justify-center items-center bg-gray-400 rounded-xl pl-2'>
                    <CiSearch size={24} />
                    <input
                        type="txt"
                        className="input w-60 md:w-100 border-0  outline-0 ml-3 bg-gray-400 z-0 text-xl"
                        placeholder="Search Scholarship"
                        {...register('scholarship', { required: true })}
                    />
                </div>
                <button type="submit" className='btn btn-primary -ml-2 z-10 rounded-0'>Search Scholarship</button>
            </form>
        </div>
    );
};

export default Banner;