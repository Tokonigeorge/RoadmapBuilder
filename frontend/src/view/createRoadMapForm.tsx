import { FieldValues, useForm } from 'react-hook-form';
import FormInputs from './components/formInputs';
import AnimatedInputWrapper from './components/animatedInputWrapper';
import { useEffect, useState } from 'react';
// import { RoadMapFormData } from '../interfaces/form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Roadmap, ResourceData } from '../interfaces/form';
import { useDispatch } from 'react-redux';
import {
  setTopics,
  createResources,
  createRoadmap,
} from '../state/roadmapReducer';
import { RootState } from '../state/store';
import { useSelector } from 'react-redux';

const RoadMapForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const topics = useSelector((state: RootState) => state.roadmap.topics);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        console.log('fetching topics');

        const response = await axios.get('/api/topics');
        const data = (await response.data.topics) as { name: string }[];

        dispatch(setTopics(data?.map((t: { name: string }) => t.name)));
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };
    fetchTopics();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    // getValues,
  } = useForm();

  const formSteps = [
    <AnimatedInputWrapper key='step1'>
      <FormInputs
        register={register}
        errors={errors}
        htmlFor='learningTopic'
        label='What do you want to learn?'
        placeholder='Algebra, Philosophy...'
        type='text'
        requiredText='This field is required'
        inputType='text'
        showFilteredTopics={true}
      />
    </AnimatedInputWrapper>,
    // <AnimatedInputWrapper key='step2'>
    //   <FormInputs
    //     register={register}
    //     errors={errors}
    //     htmlFor='timeCommitment'
    //     label='Time Commitment?'
    //     placeholder='1hr per session'
    //     type='text'
    //     requiredText='This field is required'
    //     inputType='text'
    //     titleField='learningTopic'
    //     values={getValues()}
    //   />
    // </AnimatedInputWrapper>,
    // <AnimatedInputWrapper key='step2'>
    //   <FormInputs
    //     register={register}
    //     errors={errors}
    //     htmlFor='frequency'
    //     label=''
    //     placeholder='Daily, Weekly, Monthly'
    //     type='select'
    //     requiredText='This field is required'
    //     inputType='select'
    //     options={['Daily', 'Every Other Day', 'Twice a Week', 'Weekends']}
    //     title='How much time can you dedicate to learning?'
    //   />
    // </AnimatedInputWrapper>,
    <AnimatedInputWrapper key='step2'>
      <FormInputs
        register={register}
        errors={errors}
        htmlFor='timeFrame'
        label=''
        placeholder='I want to learn this in 2 weeks'
        type='text'
        inputType='text'
        title='How long do you want to learn this (Optional)?'
      />
    </AnimatedInputWrapper>,
  ];

  const handleNextStep = async () => {
    const fieldsToValidate = ['learningTopic'][currentStep];

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, formSteps.length - 1));
    }
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      setIsSubmitting(true);
      if (!topics.includes(data.learningTopic)) {
        await axios.post('/api/topic', data);
      }
      const response = await axios.post('/api/roadmap', data);
      console.log(response.data, 'response');
      const response_data = response.data;
      const parsedResponse = JSON.parse(response_data.roadmap);
      if (response_data.response_type === 'roadmap') {
        dispatch(createRoadmap(parsedResponse as Roadmap));
      } else if (response_data.response_type === 'resources') {
        dispatch(createResources(parsedResponse as ResourceData));
      }
    } catch (error) {
      console.error('Submission failed:', error);
      toast.error('Failed to create roadmap. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mt-4 space-y-4 font-serif justify-center flex flex-col mx-auto min-w-full md:min-w-3/4 '
    >
      {formSteps[currentStep]}
      <ToastContainer />

      <div className='flex justify-between mt-8'>
        {currentStep > 0 && (
          <button
            type='button'
            onClick={() => setCurrentStep((prev) => prev - 1)}
            className='px-6 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 cursor-pointer'
          >
            Back
          </button>
        )}
        {currentStep < formSteps.length - 1 ? (
          <button
            type='button'
            onClick={handleNextStep}
            className='ml-auto px-6 py-2 bg-primary text-black rounded hover:bg-primary/80 transition-colors cursor-pointer'
          >
            Next
          </button>
        ) : (
          <button
            type='submit'
            disabled={isSubmitting}
            className='ml-auto px-6 py-2 bg-primary text-black  rounded hover:bg-primary/80 transition-colors flex items-center cursor-pointer '
          >
            {isSubmitting ? (
              <>
                <svg
                  className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              'Create Roadmap'
            )}
          </button>
        )}
      </div>
    </form>
  );
};

export default RoadMapForm;
