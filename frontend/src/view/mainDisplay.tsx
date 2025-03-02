import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
// import CreateRoadMapForm from './createRoadMapForm';
import RoadmapViewer from './components/timeline';
// import LearningPlanView from './learningPlanView';
const MainDisplay = () => {
  const roadmaps = useSelector((state: RootState) => state.roadmap.roadmaps);
  console.log(roadmaps, 'roadmaps from redux');
  return (
    <div className='flex-grow overflow-y-auto justify-center flex flex-col'>
      {/* {roadmaps.roadmap.topic ? <RoadmapViewer /> : <CreateRoadMapForm />} */}
      {/* <LearningPlanView /> */}

      <RoadmapViewer />
    </div>
  );
};

export default MainDisplay;
