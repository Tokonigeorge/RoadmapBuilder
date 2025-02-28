import LearningCard from './learningCard';

const LearningPlanView = () => {
  const plan = [
    {
      name: 'Algebra',
      resources: [
        {
          name: 'Resource 1',
          description: 'Description 1',
          link: 'https://www.google.com',
        },
        {
          name: 'Resource 2',
          description: 'Description 2',
          link: 'https://www.google.com',
        },
      ],
    },
    {
      name: 'Geometry',
      resources: [
        {
          name: 'Resource 1',
          description: 'Description 1',
          link: 'https://www.google.com',
        },
      ],
    },
  ];
  return (
    <div className='flex flex-col'>
      <div className='flex justify-between'>
        <div>
          <p>Learning Plan</p>
          <p>Overall Progress: 0/20</p>
        </div>
        <div>
          <button className='min-w-60 bg-blue-600 text-white py-4 rounded hover:bg-blue-700 transition-colors'>
            Edit Plan
          </button>
        </div>
      </div>
      <div>
        <p>Monday-Friday (10:00 AM - 12:00 PM)</p>
      </div>
      <div className='grid grid-cols-[repeat(auto-fit,_minmax(200px,_200px))] gap-8 mt-4'>
        {plan.map((item) => (
          <LearningCard
            key={item.name}
            name={item.name}
            resources={item.resources}
          />
        ))}
      </div>
    </div>
  );
};

export default LearningPlanView;
