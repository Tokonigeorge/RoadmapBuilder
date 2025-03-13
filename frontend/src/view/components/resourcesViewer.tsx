/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ResourceData } from '../../interfaces/form';

const ResourcesViewer = () => {
  const { id } = useParams<{ id: string }>();
  console.log('here', id);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

  const [resources, setResources] = useState<ResourceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/resources/${id}`);
        setResources(response.data.resources);
      } catch (err) {
        console.error('Failed to fetch resources:', err);
        setError('Failed to load resources. Please try again later.');
        toast.error('Failed to load resources');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchResources();
    }
  }, [id]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        Loading resources...
      </div>
    );
  }

  if (error) {
    return <div className='text-red-500 text-center p-4'>{error}</div>;
  }

  if (!resources) {
    return <div className='text-center p-4'>Resources not found</div>;
  }

  return (
    <div className='max-w-7xl p-6 font-serif'>
      <div className='flex justify-between'>
        <div>
          <p className='text-4xl font-serif'>Resources for {resources.topic}</p>
          <p className='text-sm font-serif pb-4'>
            Click to save any of this to the topic
          </p>
        </div>
        <div>
          <button
            onClick={togglePopup}
            className='bg-primary text-black px-4 py-2 rounded-md cursor-pointer outline-0'
          >
            Sign In to Save
          </button>
        </div>
      </div>
      <div className='flex flex-col'>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className=' max-w-md space-y-2'>
            {resources.resources?.map((resource, index: number) => (
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
        </motion.div>
      </div>
      {isPopupVisible && (
        <div className='fixed inset-0 bg-black/30 flex justify-center items-center '>
          <div className='bg-white p-6 rounded-md shadow-md min-w-96'>
            <div className='flex justify-end'>
              <button
                onClick={togglePopup}
                className='text-red-500 text-2xl cursor-pointer'
              >
                &times;
              </button>
            </div>

            <div className='flex flex-col items-start mb-4'>
              <h2 className='text-lg font-bold'>Have an account? </h2>
              <button className='bg-primary text-black px-4 py-2 rounded-md cursor-pointer'>
                Sign In
              </button>
              <button className='bg-primary text-black px-4 py-2 rounded-md cursor-pointer'>
                Sign In with Google
              </button>
            </div>
            <div className='flex flex-col items-start'>
              <h2 className='text-lg font-bold'>Don't have an account? </h2>
              <button className='bg-primary text-black px-4 py-2 rounded-md cursor-pointer'>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcesViewer;
