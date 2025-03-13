/* eslint-disable @typescript-eslint/no-explicit-any */
// components/RoadmapViewer.tsx

import { motion } from 'framer-motion';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../state/store';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

interface RoadmapData {
  _id: string;
  content: any;
  metadata: any;
  created_at: string;
  type: 'roadmap';
}

const RoadmapViewer = () => {
  const { id } = useParams<{ id: string }>();
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const roadmap = useSelector((state: RootState) => state.roadmap.roadmap);
  console.log(roadmap, 'roadmapData');

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/roadmap/${id}`);
        setRoadmap(response.data.roadmap);
      } catch (err) {
        console.error('Failed to fetch roadmap:', err);
        setError('Failed to load roadmap. Please try again later.');
        toast.error('Failed to load roadmap');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRoadmap();
    }
  }, [id]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        Loading roadmap...
      </div>
    );
  }

  if (error) {
    return <div className='text-red-500 text-center p-4'>{error}</div>;
  }

  if (!roadmap) {
    return <div className='text-center p-4'>Roadmap not found</div>;
  }

  return (
    <div className='max-w-7xl p-6 font-serif'>
      <div className='flex flex-col'>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {Object.values(roadmap.topics)?.map((topic, index: number) => (
            <motion.div
              className='mt-4'
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className='mt-4' key={index}>
                <div>
                  <div className='flex items-center pb-2'>
                    <input
                      type='checkbox'
                      className='mr-2 checkbox-primary'
                      // Add logic to handle checkbox state if needed
                    />
                    <h1 className=' font-bold'>{topic.title}</h1>
                  </div>

                  <div className='border border-gray-300 rounded-sm p-4 max-w-md space-y-2'>
                    {topic.resources.map((resource, index: number) => (
                      <motion.div
                        className='bg-gray-200 rounded-sm p-2'
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                      >
                        <a
                          href={resource.url} // Assuming resource has a 'link' property
                          target='_blank'
                          rel='noopener noreferrer'
                          className=' hover:underline'
                        >
                          {resource.title}
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RoadmapViewer;
