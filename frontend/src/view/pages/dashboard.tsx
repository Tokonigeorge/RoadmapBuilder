import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../../AuthContext';

interface SavedResource {
  _id: string;
  title: string;
  url: string;
  topic: string;
}

const SavedResources = () => {
  const [resources, setResources] = useState<SavedResource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchSavedResources = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `/api/auth/saved-resources/${currentUser.uid}`
        );
        setResources(response.data.resources);
      } catch (err) {
        console.error('Failed to fetch saved resources:', err);
        setError(
          'Failed to load your saved resources. Please try again later.'
        );
        toast.error('Failed to load saved resources');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedResources();
  }, [currentUser, navigate]);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        Loading your saved resources...
      </div>
    );
  }

  if (error) {
    return <div className='text-red-500 text-center p-4'>{error}</div>;
  }

  return (
    <div className='max-w-7xl mx-auto p-6 font-serif'>
      <h1 className='text-4xl font-serif mb-6'>My Saved Resources</h1>

      {resources.length === 0 ? (
        <div className='text-center p-4'>
          You haven't saved any resources yet.
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {resources.map((resource) => (
            <div
              key={resource._id}
              className='bg-gray-100 p-4 rounded-md shadow'
            >
              <h3 className='font-bold mb-2'>{resource.title}</h3>
              <p className='text-sm text-gray-600 mb-2'>
                Topic: {resource.topic}
              </p>
              <a
                href={resource.url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary hover:underline'
              >
                Visit Resource
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedResources;
