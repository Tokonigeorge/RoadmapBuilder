// components/RoadmapViewer.tsx

import { motion } from 'framer-motion';
import { Roadmap } from '../../interfaces/form';

const RoadmapViewer = ({ roadmap }: { roadmap: Roadmap }) => {
  console.log(roadmap, 'roadmapData', roadmap.topics, 'topics');
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
        {/* {
          roadmapData.weeks.map((week, index: number) => (
            <div key={index}>
              <h1>{week.title}</h1>
              <p></p>
              <p>{week.description}</p>
            </div>
          ))
        } */}
      </div>
    </div>
  );
};

export default RoadmapViewer;
