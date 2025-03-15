/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ResourceData } from '../../interfaces/form';
import { useAuth } from '../../../AuthContext';

const normalizeTopicName = (topic: string): string => {
  return topic
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const ResourcesViewer = () => {
  const { id } = useParams<{ id: string }>();
  console.log('here', id);

  const [resources, setResources] = useState<ResourceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const toggleSaveResource = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (!id) {
      return;
    }

    try {
      if (isSaved) {
        await axios.delete('/api/save-resources', {
          data: { uid: currentUser.uid, resource_id: id },
        });
        setIsSaved(false);
        toast.success('Resource removed from saved');
      } else {
        await axios.post('/api/save-resources', {
          uid: currentUser.uid,
          resource_id: id,
        });
        setIsSaved(true);
        toast.success('Resource saved successfully');
      }
    } catch (error) {
      console.error('Failed to save resource:', error);
      toast.error('Failed to save resource');
    }
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

  useEffect(() => {
    const checkIfSaved = async () => {
      if (!currentUser || !id) return;

      try {
        const response = await axios.get(`/api/check-saved-resource`, {
          params: { uid: currentUser.uid, resource_id: id },
        });
        console.log('response from check-saved-resource', response.data);
        setIsSaved(response.data.isSaved);
      } catch (error) {
        console.error('Failed to check saved status:', error);
      }
    };

    checkIfSaved();
  }, [currentUser, id]);

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
          <p className='text-4xl font-serif'>
            Resources for {normalizeTopicName(resources.topic)}
          </p>
          <p className='text-sm font-serif pb-4'>
            Click to save any of this to the topic
          </p>
        </div>
        <div>
          {currentUser ? (
            <button
              onClick={toggleSaveResource}
              className='p-2 text-2xl focus:outline-none cursor-pointer hover:scale-105 transition-all duration-300'
              aria-label={isSaved ? 'Unsave resource' : 'Save resource'}
            >
              {isSaved ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='w-8 h-8 text-primary'
                >
                  <path
                    fillRule='evenodd'
                    d='M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z'
                    clipRule='evenodd'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-8 h-8 text-primary'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z'
                  />
                </svg>
              )}
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className='bg-primary text-black px-4 py-2 rounded-md cursor-pointer outline-0'
            >
              Sign In to Save
            </button>
          )}
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
    </div>
  );
};

export default ResourcesViewer;
