// import { useState, useEffect } from 'react';
// import axios from 'axios';
import MainDisplay from './view/mainDisplay';

function App() {
  // const [message, setMessage] = useState<string>('');

  // useEffect(() => {
  //   axios
  //     .get('/api/')
  //     .then((response) => setMessage(response.data.message))
  //     .catch((error) => console.error('Error fetching data', error));
  // }, []);

  return (
    <main className='bg-orange-100 w-full h-screen p-10'>
      <div className='flex flex-col items-center justify-center'>
        <p className='font-serif text-outline text-2xl'>Roadmap Builder</p>
      </div>
      <MainDisplay />
    </main>
  );
}

export default App;
