import { FieldValues, useForm } from 'react-hook-form';
import FormInputs from './components/formInputs';
import AnimatedInputWrapper from './components/animatedInputWrapper';
import { useState } from 'react';
// import { RoadMapFormData } from '../interfaces/form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RoadMapForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
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
        titleField='learningTopic'
        values={getValues()}
      />
    </AnimatedInputWrapper>,
    <AnimatedInputWrapper key='step3'>
      <FormInputs
        register={register}
        errors={errors}
        htmlFor='frequency'
        label=''
        placeholder='Daily, Weekly, Monthly'
        type='select'
        requiredText='This field is required'
        inputType='select'
        options={['Daily', 'Every Other Day', 'Twice a Week', 'Weekends']}
        title='How much time can you dedicate to learning?'
      />
    </AnimatedInputWrapper>,
    <AnimatedInputWrapper key='step4'>
      <FormInputs
        register={register}
        errors={errors}
        htmlFor='timeFrame'
        label=''
        placeholder='I want to learn this in 2 weeks'
        type='text'
        requiredText='This field is required'
        inputType='text'
        title='How long do you want to learn this?'
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
      const response = await axios.post('/api/roadmap', data);

      console.log('Submission successful:', response.data);
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
      className='mt-4 space-y-4 font-serif justify-center flex flex-col mx-auto min-w-full md:min-w-3/4'
    >
      {formSteps[currentStep]}
      <ToastContainer />
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
