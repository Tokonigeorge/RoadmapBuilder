// import { useNavigate } from 'react-router-dom';
// import CreateRoadMapForm from './createRoadMapForm';

// import { useAuth } from '../../AuthContext';
import CreateRoadMapForm from './createRoadMapForm';

const MainDisplay = () => {
  // const { currentUser, logOut } = useAuth();
  // const navigate = useNavigate();

  // const handleAuthAction = () => {
  //   if (currentUser) {
  //     // User is logged in, show logout option
  //     logOut();
  //   } else {
  //     // User is not logged in, navigate to login
  //     navigate('/login');
  //   }
  // };

  return (
    <div className='flex flex-col h-screen p-8'>
      <div className='text-center flex-none'>
        <p className='font-serif  text-2xl'>Roadmap Builder</p>
      </div>

      {/* <button
        onClick={handleAuthAction}
        className='bg-primary text-black px-4 py-2 rounded-md cursor-pointer outline-0 font-serif'
      >
        Sign In to Save
      </button> */}

      <div className='flex-grow overflow-y-auto justify-center flex flex-col'>
        <CreateRoadMapForm />
      </div>
    </div>
  );
};

export default MainDisplay;
