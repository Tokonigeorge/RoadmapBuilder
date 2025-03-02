// components/RoadmapViewer.tsx
import { useState } from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
// import { motion } from 'framer-motion';
// import { Tab } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { Roadmapdata } from '../../interfaces/form';

const RoadmapViewer = () => {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const roadmapData: Roadmapdata = useSelector(
    (state: RootState) => state.roadmap.roadmaps
  );

  return (
    <div className='max-w-7xl mx-auto p-6'>
      {/* Week Selector Tabs */}
      {/* <Tab.Group selectedIndex={selectedWeek} onChange={setSelectedWeek}>
        <Tab.List className='flex space-x-4 mb-8'>
          {roadmapData.weeks.map((week, index) => (
            <Tab key={index} as={motion.div} whileHover={{ scale: 1.05 }}>
              {({ selected }) => (
                <div
                  className={`px-6 py-2 rounded-lg font-medium ${
                    selected
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  Week {week.week_number}
                </div>
              )}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group> */}
      <p>hello</p>
      <div className='flex space-x-4 justify-center mt-4 border-b pb-2'>
        {roadmapData.weeks.map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 ${
              selectedWeek === index ? 'bg-blue-600 text-white' : 'bg-gray-200'
            } rounded-full`}
            onClick={() => setSelectedWeek(index)}
          >
            Week {index + 1}
          </button>
        ))}
      </div>

      <VerticalTimeline animate={true} lineColor='black'>
        {/* {Object.values(roadmapData.weeks[selectedWeek].days).map((day, idx) => (
          <VerticalTimelineElement
            key={idx}
            date={`Day ${idx + 1}`}
            iconStyle={{ background: '#1F2937', color: '#fff' }}
          >
            <h3 className='text-lg font-semibold mb-2'>Daily Goals</h3>
            <ul>
              {day.resources.map((resource, resourceIdx) => (
                <li key={resourceIdx}>
                  <a
                    href={resource.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-500 hover:underline'
                  >
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          </VerticalTimelineElement>
        ))} */}
        <VerticalTimelineElement
          className='vertical-timeline-element--work'
          contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
          date='2011 - present'
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          // icon={<WorkIcon />}
        >
          <h3 className='vertical-timeline-element-title'>Creative Director</h3>
          <h4 className='vertical-timeline-element-subtitle'>Miami, FL</h4>
          <p>
            Creative Direction, User Experience, Visual Design, Project
            Management, Team Leading
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className='vertical-timeline-element--work'
          date='2010 - 2011'
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          // icon={<WorkIcon />}
        >
          <h3 className='vertical-timeline-element-title'>Art Director</h3>
          <h4 className='vertical-timeline-element-subtitle'>
            San Francisco, CA
          </h4>
          <p>
            Creative Direction, User Experience, Visual Design, SEO, Online
            Marketing
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          position='left'
          className='vertical-timeline-element--work'
          date='2008 - 2010'
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          // icon={<WorkIcon />}
        >
          <h3 className='vertical-timeline-element-title'>Web Designer</h3>
          <h4 className='vertical-timeline-element-subtitle'>
            Los Angeles, CA
          </h4>
          <p>User Experience, Visual Design</p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className='vertical-timeline-element--work'
          date='2006 - 2008'
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          // icon={<WorkIcon />}
        >
          <h3 className='vertical-timeline-element-title'>Web Designer</h3>
          <h4 className='vertical-timeline-element-subtitle'>
            San Francisco, CA
          </h4>
          <p>User Experience, Visual Design</p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
};

export default RoadmapViewer;
