import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    axios
      .get('/api/')
      .then((response) => setMessage(response.data.message))
      .catch((error) => console.error('Error fetching data', error));
  }, []);

  return (
    <>
      <div>
        <p>FastAPI says: {message}</p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
