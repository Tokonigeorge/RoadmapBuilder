import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';
import { getAuthErrorMessage } from '../../utils/errorMessages';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingGoogleSignIn, setIsLoadingGoogleSignIn] =
    useState<boolean>(false);
  const [error, setError] = useState('');

  const { signInWithGoogle, logIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //todo: add a check here for email and password and also set errors

    try {
      setIsLoading(true);
      setError('');
      await logIn(email, password);
      // Auth logic will be implemented here
      console.log('Login attempt with:', email, password);

      navigate('/');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorCode = error?.code || '';
      const errorMessage = getAuthErrorMessage(errorCode);
      setError(errorMessage);
      console.error('Sign In error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoadingGoogleSignIn(true);
      setError('');
      await signInWithGoogle();
      console.log('sign in succesfull, ');

      navigate('/');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('Sign-in popup closed by user');
      } else {
        const errorCode = error?.code || '';
        const errorMessage = getAuthErrorMessage(errorCode);
        setError(errorMessage);
        console.error('Google sign-in error:', error);
      }
    } finally {
      console.log('back here to google');
      setIsLoadingGoogleSignIn(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center font-serif py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Sign in to your account
          </h2>
        </div>
        {error && (
          <div
            className='p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg'
            role='alert'
          >
            {error}
          </div>
        )}

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
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm'
                placeholder='Email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <div className='text-sm'>
              <Link
                to='/reset-password'
                className='font-medium text-primary hover:text-primary-dark'
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type='submit'
              disabled={isLoading}
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer'
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className='mt-4 text-center'>
            <p>Or continue with</p>
            <button
              type='button'
              className='mt-3 w-full cursor-pointer inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
              onClick={handleGoogleSignIn}
            >
              {isLoadingGoogleSignIn ? (
                'Loading...'
              ) : (
                <>
                  <span className='sr-only'>Sign in with Google</span>
                  <svg
                    className='w-5 h-5'
                    aria-hidden='true'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z' />
                  </svg>
                </>
              )}
            </button>
          </div>

          <div className='text-center mt-4'>
            <p className='text-sm text-gray-600'>
              Don't have an account?{' '}
              <Link
                to='/register'
                className='font-medium text-primary hover:text-primary-dark'
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
