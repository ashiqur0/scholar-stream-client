import React from 'react';
import { Link } from 'react-router';

const Scholarship = ({ scholarship }) => {
    const { _id, universityImage, universityName, universityCountry, universityCity, scholarshipCategory, applicationFees } = scholarship;


    return (
        <div className={`card w-full shadow-md p-4 flex flex-col justify-between bg-zink-950 border border-slate-600 hover:-mt-1 hover:mb-1 hover:shadow-slate-700 hover:border-slate-500`}>
            <figure className="">
                <img
                    src={universityImage}
                    alt="Shoes"
                    className="rounded-xl w-full h-55 overflow-hidden" />
            </figure>

            <div className="space-y-3 mt-5">
                <h2 className="card-title">University Name: {universityName}</h2>
                <p>Scholarship Category: {scholarshipCategory}</p>
                <p>Location: {universityCity}, {universityCountry}</p>
                <p>Application Fee: ${applicationFees}</p>

                <Link to={`/scholarship/details/${_id}`} className="card-actions ">
                    <button className='btn btn-primary hover:bg-linear-to-r/increasing from-indigo-500 to-purple-700 w-full'>View Details</button>
                </Link>
            </div>
        </div>
    );
};

export default Scholarship;