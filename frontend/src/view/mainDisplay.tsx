import CreateRoadMapForm from './createRoadMapForm';
// import LearningPlanView from './learningPlanView';
const MainDisplay = () => {
  return (
    <div className='flex-grow overflow-y-auto justify-center flex flex-col'>
      <CreateRoadMapForm />
      {/* <LearningPlanView /> */}
    </div>
  );
};

export default MainDisplay;
