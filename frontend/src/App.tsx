import MainDisplay from './view/mainDisplay';
import store from './state/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <main className='bg-secondary w-full h-screen p-4 md:p-10 flex flex-col'>
        <div className='text-center flex-none'>
          <p className='font-serif  text-2xl'>Roadmap Builder</p>
        </div>
        <MainDisplay />
      </main>
    </Provider>
  );
}

export default App;
