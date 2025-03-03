import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
// import CreateRoadMapForm from './createRoadMapForm';
import RoadmapViewer from './components/timeline';
import CreateRoadMapForm from './createRoadMapForm';

const MainDisplay = () => {
  const roadmaps = useSelector((state: RootState) => state.roadmap.roadmaps);
  console.log(roadmaps, 'roadmaps from redux');
  return (
    <>
      {roadmaps.roadmap.topic ? (
        <RoadmapViewer />
      ) : (
        <div className='flex-grow overflow-y-auto justify-center flex flex-col'>
          <CreateRoadMapForm />
        </div>
      )}
    </>
  );
};

export default MainDisplay;
