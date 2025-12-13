import React from 'react';
import Banner from '../Banner/Banner';
import TopScholarship from '../Top-Scholarship/TopScholarship';
import FAQ from '../FAQ/FAQ';
import Stories from '../Stories/Stories';

const Home = () => {
    return (
        <div>
            <Banner />
            <TopScholarship />
            <Stories />
            <FAQ />
        </div>
    );
};

export default Home;