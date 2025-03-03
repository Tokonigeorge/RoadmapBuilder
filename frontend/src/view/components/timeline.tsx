// components/RoadmapViewer.tsx
import { useState } from 'react';

import { motion } from 'framer-motion';
// import { Tab } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { Roadmapdata } from '../../interfaces/form';

const RoadmapViewer = () => {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const roadmapData: Roadmapdata = useSelector(
    (state: RootState) => state.roadmap.roadmaps
  );
  console.log(roadmapData, 'roadmapData', roadmapData.weeks, 'weeks');
  return (
    <div className='max-w-7xl p-6 font-serif'>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='flex space-x-4 justify-start mt-4 pb-2'>
          {roadmapData.weeks.map((_, index) => (
            <button
              key={index}
              className={`px-4 py-2 cursor-pointer ${
                selectedWeek === index ? 'bg-primary text-black' : 'bg-gray-200'
              } rounded-sm`}
              onClick={() => setSelectedWeek(index)}
            >
              Week {index + 1}
            </button>
          ))}
        </div>
      </motion.div>

      <div className='flex flex-col'>
        <motion.div
          key={selectedWeek}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {Object.values(roadmapData.weeks[selectedWeek].days).map(
            (day, index: number) => (
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
                      <h1 className=' font-bold'>{day.topics[0]}</h1>
                    </div>

                    <div className='border border-gray-300 rounded-sm p-4 max-w-md space-y-2'>
                      {day.resources.map((resource, index: number) => (
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
            )
          )}
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
