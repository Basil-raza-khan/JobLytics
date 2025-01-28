import React from 'react';
import LatestJobCard from './LatestJobsCard';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector((store) => store.job);

    return (
        <div className='max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8 w-full'>
            {/* Heading */}
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center sm:text-left'>
                <span className='text-[#6A38C2]'>Latest & Top </span> Job Openings
            </h1>

            {/* Grid Layout for Job Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 my-5 w-full'>
                {allJobs.length <= 0 ? (
                    <span className='text-gray-500 text-center col-span-full'>No Job Available</span>
                ) : (
                    allJobs.slice(0, 6).map((job) => (
                        <div key={job._id} className='w-full'>
                            <LatestJobCard job={job} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default LatestJobs;