import React from 'react';

const Loading = () => {
    return (
        <div className='md:max-w-7xl md:mx-auto flex justify-center items-center min-h-screen'>
            <span className="loading loading-spinner text-accent"></span>
        </div>
    );
};

export default Loading;