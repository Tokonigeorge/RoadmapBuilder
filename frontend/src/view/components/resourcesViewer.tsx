import { ResourceData } from '../../interfaces/form';
import { motion } from 'framer-motion';

const ResourcesViewer = ({ resources }: { resources: ResourceData }) => {
  return (
    <div className='max-w-7xl p-6 font-serif'>
      <div className='flex flex-col'>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className='border border-gray-300 rounded-sm p-4 max-w-md space-y-2'>
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
