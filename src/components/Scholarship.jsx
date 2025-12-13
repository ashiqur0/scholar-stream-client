import React from 'react';
import { Link } from 'react-router';

const Scholarship = ({ scholarship }) => {
    const { _id, universityImage, scholarshipName, universityName, universityCountry, universityCity, universityWorldRank, } = scholarship;


    return (
        <div className={`card w-full shadow-md p-4 flex flex-col justify-between bg-zink-950 border border-slate-600 hover:-mt-1 hover:mb-1 hover:shadow-slate-700 hover:border-slate-500`}>
            <figure className="">
                <img
                    src={universityImage}
                    alt="Shoes"
                    className="rounded-xl w-full h-55 overflow-hidden" />
            </figure>

            <div className="space-y-3 mt-5">
                <h2 className="card-title">{scholarshipName}</h2>
                <p>University Name: {universityName}</p>
                <p>Country: {universityCountry}</p>
                <p>University City: {universityCity}</p>
                <p>University World Rank: {universityWorldRank}</p>

                <Link to={`/scholarship/details/${_id}`} className="card-actions ">
                    <button className='btn btn-primary w-full'>View Details</button>
                </Link>
            </div>
        </div>
    );
};

export default Scholarship;