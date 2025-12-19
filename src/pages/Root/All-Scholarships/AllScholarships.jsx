import React, { useEffect, useState } from 'react';
import Scholarship from '../../../components/Scholarship';

const AllScholarships = () => {

    const [scholarships, setScholarships] = useState([]);
    const [totalScholarships, setTotalScholarships] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [sort, setSort] = useState('size');
    const [order, setOrder] = useState('');
    const [searchText, setSearchText] = useState('');
    const limit = 6

    useEffect(() => {
        fetch(`https://scholar-strem-server-by-ashiqur.vercel.app/scholarship/?limit=${limit}&skip=${currentPage * limit}&sort=${sort}&order=${order}&search=${searchText}`)
            .then(res => res.json())
            .then(data => {
                setScholarships(data.scholarships);
                setTotalScholarships(data.total);

                const page = Math.ceil(totalScholarships / limit);
                setTotalPage(page);
            });
    }, [totalScholarships, currentPage, sort, order, searchText]);

    const handleSelect = (e) => {
        const sortText = e.target.value;
        setSort(sortText.split('-')[0]);
        setOrder(sortText.split('-')[1]);
    }

    return (
        <div className='my-6 md:max-w-7xl md:mx-auto p-4'>
            <div className="flex flex-col-reverse lg:flex-row gap-5 items-start justify-between lg:items-end mt-10 mb-5">
                <h1 className='md:text-2xl text-xl font-semibold'>All Scholarship({totalScholarships})</h1>

                <form>
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

                <div className="">
                    <select onChange={handleSelect} className="select w-70">
                        <option selected disabled={true}>
                            Sort Scholarship
                        </option>
                        <option value={"applicationFees-desc"}>Application-Fee : High - Low</option>
                        <option value={"applicationFees-asc"}>Application-Fee : Low - High</option>
                        <option value={"applicationDeadline-desc"}>Application Deadline : High - Low</option>
                        <option value={"applicationDeadline-asc"}>Application Deadline : Low - High</option>
                        <option value={"scholarshipPostDate-desc"}>Scholarship PostDate : High - Low</option>
                        <option value={"scholarshipPostDate-asc"}>Scholarship PostDate : Low - High</option>
                        <option value={"universityWorldRank-desc"}>University World Rank : Low - High</option>
                        <option value={"universityWorldRank-asc"}>University World Rank  : Low - High</option>
                    </select>
                </div>
            </div>

            <>
                {/* Apps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {scholarships.length === 0 ? (
                        <div className="col-span-full text-center py-10 space-y-10">
                            <h2 className="text-6xl font-semibold opacity-60">
                                No Apps Found
                            </h2>
                            <button className="btn btn-primary">Show All Apps</button>
                        </div>
                    ) : (
                        scholarships.map((scholarship) => <Scholarship key={scholarship.id} scholarship={scholarship}></Scholarship>)
                    )}
                </div>
            </>

            <div className="flex flex-wrap justify-center gap-3 py-10">
                {
                    currentPage > 0 && <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="btn  btn-soft"
                    >Prev
                    </button>
                }

                {/* 0, 1, 2, 3, 4, 5, ... */}
                {
                    [...Array(totalPage).keys()].map(i => <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`btn btn-soft ${i === currentPage && 'btn-warning border border-orange-400'}`}
                    >{i + 1}</button>)
                }

                {
                    currentPage < totalPage - 1 && <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="btn  btn-soft"
                    >Next
                    </button>
                }

            </div>
        </div>
    );
};

export default AllScholarships;