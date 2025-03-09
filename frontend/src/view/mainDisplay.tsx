import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
// import CreateRoadMapForm from './createRoadMapForm';
import RoadmapViewer from './components/timeline';
import CreateRoadMapForm from './createRoadMapForm';
import ResourcesViewer from './components/resourcesViewer';

const MainDisplay = () => {
  const roadmap = useSelector((state: RootState) => state.roadmap.roadmap);
  const resources = useSelector((state: RootState) => state.roadmap.resources);

  return (
    <>
      {roadmap?.topics?.length > 0 && <RoadmapViewer roadmap={roadmap} />}
      {resources?.resources?.length > 0 && (
        <ResourcesViewer resources={resources} />
      )}

      {!resources.resources.length && !roadmap.topics.length && (
        <div className='flex-grow overflow-y-auto justify-center flex flex-col'>
          <CreateRoadMapForm />
        </div>
      )}
    </>
  );
};

export default MainDisplay;
