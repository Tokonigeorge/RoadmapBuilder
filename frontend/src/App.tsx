import MainDisplay from './view/mainDisplay';

function App() {
  return (
    <main className='bg-secondary w-full h-screen p-4 md:p-10 flex flex-col'>
      <div className='text-center flex-none'>
        <p className='font-serif  text-2xl'>Roadmap Builder</p>
      </div>
      <MainDisplay />
    </main>
  );
}

export default App;
