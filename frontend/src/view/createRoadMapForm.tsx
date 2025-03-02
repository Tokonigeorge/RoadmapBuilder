import { FieldValues, useForm } from 'react-hook-form';
import FormInputs from './components/formInputs';
import AnimatedInputWrapper from './components/animatedInputWrapper';
import { useState } from 'react';
// import { RoadMapFormData } from '../interfaces/form';
import axios from 'axios';

const RoadMapForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
      />
    </AnimatedInputWrapper>,
    <AnimatedInputWrapper key='step2'>
      <FormInputs
        register={register}
        errors={errors}
        htmlFor='timeCommitment'
        label='Time Commitment?'
        placeholder='1hr per session'
        type='text'
        requiredText='This field is required'
        inputType='text'
      />
    </AnimatedInputWrapper>,
    <AnimatedInputWrapper key='step3'>
      <FormInputs
        register={register}
        errors={errors}
        htmlFor='frequency'
        label='Frequency'
        placeholder='Daily, Weekly, Monthly'
        type='select'
        requiredText='This field is required'
        inputType='select'
        options={['Daily', 'Weekly', 'Monthly']}
      />
    </AnimatedInputWrapper>,
    <AnimatedInputWrapper key='step4'>
      <FormInputs
        register={register}
        errors={errors}
        htmlFor='timeFrame'
        label='Time Frame'
        placeholder='I want to learn this in 2 weeks'
        type='text'
        requiredText='This field is required'
        inputType='text'
      />
    </AnimatedInputWrapper>,
  ];

  const handleNextStep = async () => {
    const fieldsToValidate = [
      'learningTopic',
      'timeCommitment',
      'frequency',
      'timeFrame',
    ][currentStep];

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, formSteps.length - 1));
    }
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      setIsSubmitting(true);
      // const response = await axios.post('/api/roadmap', data);
      const response = await axios.get('http://localhost:8000/api/v1/test');

      console.log('Submission successful:', response.data);
      // Handle success (e.g., redirect, show success message)
    } catch (error) {
      console.error('Submission failed:', error);
      // Handle error with more detail
      if (axios.isAxiosError(error)) {
        console.error('Response status:', error.response?.status);
        console.error('Response data:', error.response?.data);
      }
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-4'>
      {formSteps[currentStep]}
      {/* Learning Style (checkboxes) */}
      {/* <div className='flex flex-col'>
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
      </div> */}
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
            className='ml-auto px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors cursor-pointer'
          >
            Next
          </button>
        ) : (
          <button
            type='submit'
            disabled={isSubmitting}
            className='ml-auto px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center cursor-pointer '
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
      {/* <button
        type='submit'
        className='min-w-70 bg-blue-600 text-white py-4 rounded hover:bg-blue-700 transition-colors'
      >
        Create Roadmap
      </button> */}
    </form>
  );
};

export default RoadMapForm;
