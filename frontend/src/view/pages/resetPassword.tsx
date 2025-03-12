import { useState } from 'react';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Password reset logic will be implemented here
      console.log('Reset password for:', email);
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to request password reset. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center font-serif py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Reset your password
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        {error && (
          <div
            className='p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg'
            role='alert'
          >
            {error}
          </div>
        )}

        {isSubmitted ? (
          <div className='rounded-md bg-green-50 p-4'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-5 w-5 text-green-400'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <h3 className='text-sm font-medium text-green-800'>
                  Password reset email sent
                </h3>
                <div className='mt-2 text-sm text-green-700'>
                  <p>
                    Check your email for a link to reset your password. If it
                    doesn't appear within a few minutes, check your spam folder.
                  </p>
                </div>
                <div className='mt-4'>
                  <Link
                    to='/login'
                    className='font-medium text-primary hover:text-primary-dark'
                  >
                    Return to sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
            <div className='rounded-md shadow-sm -space-y-px'>
              <div>
                <label htmlFor='email-address' className='sr-only'>
                  Email address
                </label>
                <input
                  id='email-address'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm'
                  placeholder='Email address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                disabled={isLoading}
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
              >
                {isLoading ? 'Sending...' : 'Send reset link'}
              </button>
            </div>

            <div className='text-center mt-4'>
              <Link
                to='/login'
                className='font-medium text-primary hover:text-primary-dark'
              >
                Back to sign in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
