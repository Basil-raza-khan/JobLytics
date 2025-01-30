import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const roadmapMapping = {
    "kubernetes": "kubernetes",
    "software architect": "software-architect",
    "aspnet core": "aspnet-core",
    "spring boot": "spring-boot",
    "react native": "react-native",
    "blockchain": "blockchain",
    "cyber security": "cyber-security",
    "technical writer": "technical-writer",
    "engineering manager": "engineering-manager",
    "product manager": "product-manager",
    "system design": "system-design",
    "ai data scientist": "ai-data-scientist",
    "postgresql dba": "postgresql-dba",
    "game developer": "game-developer",
    "full stack": "full-stack",
    "fullstack": "full-stack",
    "data analyst": "data-analyst",
    "devrel": "devrel",
    "mlops": "mlops",
    "ml ops": "mlops",
    "machine learning": "mlops",
    "android": "android",
    "backend": "backend",
    "back-end": "backend",
    "frontend": "frontend",
    "front-end": "frontend",
    "ux design": "ux-design",
    "typescript": "typescript",
    "content writer": "technical-writer",
    "software engineer": "software-architect",
    "aws": "best-practices/aws",
    "devops": "devops",
    "qa": "qa",
    "ios": "ios",
    "react": "react",
    "vue": "vue",
    "nodejs": "nodejs",
    "sql": "sql",
    "data scientist": "ai-data-scientist",
    "ai engineer": "ai-engineer"
  };

const sortedRoadmapEntries = Object.entries(roadmapMapping)
  .map(([pattern, url]) => ({ pattern, url }))
  .sort((a, b) => b.pattern.length - a.pattern.length);

const getRoadmapUrl = (jobTitle) => {
  const lowerCaseTitle = jobTitle?.toLowerCase() || '';
  for (const { pattern, url } of sortedRoadmapEntries) {
    if (lowerCaseTitle.includes(pattern)) {
      return `https://roadmap.sh/${url}`;
    }
  }
  return 'https://roadmap.sh/roadmaps'; // Fallback URL
};

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const isIntiallyApplied = singleJob?.applications?.some(application => application.applicants === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicants: user?._id }] };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicants === user?._id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className='max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8'>
      {/* Header Section */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
        <div>
          <h1 className='font-bold text-2xl sm:text-3xl'>{singleJob?.title}</h1>
          <div className='flex flex-wrap items-center gap-2 mt-4'>
            <Badge className='text-blue-700 font-bold' variant="ghost">{singleJob?.position} Positions</Badge>
            <Badge className='text-[#F83002] font-bold' variant="ghost">{singleJob?.jobType}</Badge>
            <Badge className='text-[#7209b7] font-bold' variant="ghost">{singleJob?.salary}LPA</Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg w-full sm:w-auto ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      {/* Job Description Section */}
      <h1 className='border-b-2 border-b-gray-300 font-medium py-4 mt-6'>Job Description</h1>
      <div className='my-4 space-y-3'>
        <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
        <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
        <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
        <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} yrs</span></h1>
        <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
        <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
        <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span></h1>
      </div>

      {/* Additional Heading and Button */}
      <div className='mt-8 text-center'>
        <h2 className='text-xl sm:text-2xl font-semibold mb-4'>
          Want to become "{singleJob?.title}"?
        </h2>
        <Button
          onClick={() => window.open(getRoadmapUrl(singleJob?.title), '_blank')}
          className='bg-[#6A38C2] hover:bg-[#56279a] transition-colors px-6 py-3 text-white rounded-lg text-sm sm:text-base'
        >
          Learn the Roadmap
        </Button>
      </div>
    </div>
  );
};

export default JobDescription;