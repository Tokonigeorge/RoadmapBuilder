import { useForm } from 'react-hook-form';

const RoadMapForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-4'>
      <div className='flex flex-col max-w-70'>
        <label htmlFor='learningTopic' className='mb-1 font-semibold'>
          What do you want to learn?
        </label>
        <input
          id='learningTopic'
          type='text'
          className='border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Algebra, Philosophy...'
          {...register('learningTopic', { required: true })}
        />
        {errors.learningTopic && (
          <span className='text-red-500 text-sm'>This field is required</span>
        )}
      </div>
      {/* Time Commitment */}
      <div className='flex space-x-8 align-center'>
        <div className='flex flex-col'>
          <label htmlFor='timeCommitment' className='mb-1 font-semibold'>
            Time Commitment?
          </label>
          <input
            id='timeCommitment'
            type='text'
            className='border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-70'
            placeholder='1hr per session'
            {...register('timeCommitment', { required: true })}
          />
          {errors.timeCommitment && (
            <span className='text-red-500 text-sm'>This field is required</span>
          )}
        </div>
        {/* Frequency (Daily, Weekly, etc.) */}
        <div className='flex flex-col min-w-30'>
          <label htmlFor='frequency' className='mb-1 font-semibold'>
            Frequency
          </label>
          <select
            id='frequency'
            className='border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            {...register('frequency')}
          >
            <option value='Daily'>Daily</option>
            <option value='Weekly'>Weekly</option>
            <option value='Monthly'>Monthly</option>
          </select>
        </div>
      </div>
      {/* TimeFrame */}
      <div className='flex space-x-8 align-center'>
        <div className='flex flex-col'>
          <label htmlFor='timeFrame' className='mb-1 font-semibold'>
            TimeFrame
          </label>
          <input
            id='timeFrame'
            type='text'
            className='border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='I want to learn this in 2 weeks'
            {...register('timeFrame', { required: true })}
          />
          {errors.timeFrame && (
            <span className='text-red-500 text-sm'>This field is required</span>
          )}
        </div>
        {/* Deadline */}
        <div className='flex flex-col'>
          <label htmlFor='deadline' className='mb-1 font-semibold'>
            Deadline
          </label>
          <select
            id='deadline'
            className='border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            {...register('deadline')}
          >
            <option value='Daily'>Daily</option>
            <option value='Weekly'>Weekly</option>
          </select>
        </div>
      </div>
      {/* Learning Style (checkboxes) */}
      <div className='flex flex-col'>
        <span className='mb-1 font-semibold'>Learning Style</span>
        <div className='flex items-start space-x-4 flex-col'>
          <label className='flex items-center space-x-1'>
            <input
              type='checkbox'
              className='h-4 w-4'
              {...register('visual')}
            />
            <span>Visual</span>
          </label>
          <label className='flex items-center space-x-1'>
            <input
              type='checkbox'
              className='h-4 w-4'
              {...register('auditory')}
            />
            <span>Auditory</span>
          </label>
          <label className='flex items-center space-x-1'>
            <input
              type='checkbox'
              className='h-4 w-4'
              {...register('kinesthetic')}
            />
            <span>Kinesthetic</span>
          </label>
        </div>
      </div>
      <button
        type='submit'
        className='min-w-70 bg-blue-600 text-white py-4 rounded hover:bg-blue-700 transition-colors'
      >
        Create Roadmap
      </button>
    </form>
  );
};

export default RoadMapForm;
