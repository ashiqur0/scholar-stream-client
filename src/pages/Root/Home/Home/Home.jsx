import React from 'react';
import Banner from '../Banner/Banner';
import TopScholarship from '../Top-Scholarship/TopScholarship';
import FAQ from '../FAQ/FAQ';
import SuccessStories from '../Stories/SuccessStories';

const Home = () => {
    return (
        <div>
            <title>Home</title>
            <Banner />
            <TopScholarship />
            <SuccessStories />
            <FAQ />
        </div>
    );
};

export default Home;