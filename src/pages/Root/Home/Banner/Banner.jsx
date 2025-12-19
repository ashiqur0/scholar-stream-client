import React from 'react';
import useAuth from '../../../../hooks/useAuth';

const Banner = () => {

    const { setSearchText } = useAuth();

    return (
        <div className='md:max-w-7xl md:mx-auto mt-20 p-20'>
            <h1 className='text-center text-xl md:text-5xl text-orange-400 font-extrabold'>Your Gateway to Global Scholarships</h1>
            <p className='text-center mt-5 '>Search and apply for scholarships from leading universities with ease, transparency, and confidence.</p>

            <form className='md:w-1/4 mx-auto mt-10'>
                <label className="input max-w-[300px] w-[300px] input-secondary">
                    <svg
                        className="h-[1em] opacity-50"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input onChange={(e) => setSearchText(e.target.value)} type="search" className="" placeholder="Search Scholarship" />
                </label>
            </form>
        </div>
    );
};

export default Banner;