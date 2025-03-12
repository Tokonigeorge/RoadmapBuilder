import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { useNavigate } from 'react-router-dom';
// import CreateRoadMapForm from './createRoadMapForm';
import RoadmapViewer from './components/timeline';
import { useAuth } from '../../AuthContext';
import CreateRoadMapForm from './createRoadMapForm';
import ResourcesViewer from './components/resourcesViewer';

const MainDisplay = () => {
  const roadmap = useSelector((state: RootState) => state.roadmap.roadmap);
  const resources = useSelector((state: RootState) => state.roadmap.resources);
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (currentUser) {
      // User is logged in, show logout option
      logOut();
    } else {
      // User is not logged in, navigate to login
      navigate('/login');
    }
  };

  return (
    <>
      <div className='text-center flex-none'>
        <p className='font-serif  text-2xl'>Roadmap Builder</p>
      </div>
      {roadmap?.topics?.length > 0 && <RoadmapViewer roadmap={roadmap} />}
      {resources?.resources?.length < 1 && (
        <ResourcesViewer resources={resources} />
      )}
      <button
        onClick={handleAuthAction}
        className='bg-primary text-black px-4 py-2 rounded-md cursor-pointer outline-0 font-serif'
      >
        Sign In to Save
      </button>

      {resources.resources.length > 0 && !roadmap.topics.length && (
        <div className='flex-grow overflow-y-auto justify-center flex flex-col'>
          <CreateRoadMapForm />
        </div>
      )}
    </>
  );
};

export default MainDisplay;
