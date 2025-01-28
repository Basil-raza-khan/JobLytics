import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCard = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer 
                       hover:shadow-lg transition-shadow duration-300
                       w-full h-full' // Full width and height of the grid cell
        >
            {/* Company Name and Location */}
            <div>
                <h1 className='font-medium text-lg sm:text-xl md:text-2xl'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>{job?.location}</p>
            </div>

            {/* Job Title and Description */}
            <div>
                <h1 className='font-bold text-lg my-2 sm:text-xl md:text-2xl'>{job?.title}</h1>
                <p className='text-sm text-gray-600 sm:text-base md:text-lg line-clamp-3'> {/* Limit description to 3 lines */}
                    {job?.description}
                </p>
            </div>

            {/* Badges for Position, Job Type, and Salary */}
            <div className='flex flex-wrap items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold text-xs sm:text-sm md:text-base'} variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className={'text-[#F83002] font-bold text-xs sm:text-sm md:text-base'} variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className={'text-[#7209b7] font-bold text-xs sm:text-sm md:text-base'} variant="ghost">
                    {job?.salary}LPA
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCard;