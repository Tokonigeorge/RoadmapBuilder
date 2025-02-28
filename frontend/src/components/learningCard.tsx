const LearningCard = ({
  name,
  resources,
}: {
  name: string;
  resources: { name: string; description: string; link: string }[];
}) => {
  return (
    <div className='flex w-50 rounded-md outline outline-1 outline-gray-300 p-4 flex-col'>
      <div className='flex space-x-2 items-center'>
        <input type='checkbox' className='h-4 w-4' />
        <p>{name}</p>
      </div>
      <div className='mt-2 space-y-2'>
        {resources?.map((resource) => (
          <div key={resource.name}>
            <a href={resource.link} target='_blank' rel='noopener noreferrer'>
              <p className='bg-gray-100 p-2 rounded-md'>{resource.name}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningCard;
