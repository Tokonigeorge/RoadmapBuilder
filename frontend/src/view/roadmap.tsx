import { Timeline, Bookmark } from './components/customTimeline';

const Roadmap = () => {
  return (
    <div>
      <div className='container'>
        <Timeline className='my-vertical-progress'>
          <Bookmark>
            <h1 className='date'>2002</h1> Founding of the company
          </Bookmark>
          <Bookmark>
            {' '}
            <h1 className='date'>2006</h1>Start of breeding programs
          </Bookmark>
          <Bookmark>
            <h1 className='date'>2010</h1> Partnershipwith the Council of Grain
            Grower Organizations(COGGO)
          </Bookmark>
          <Bookmark>
            <h1 className='date'>2015</h1>
            Start of salesof proprietary grain varieties in the United State
          </Bookmark>
          <Bookmark>
            <h1 className='date'>2020</h1> The companyhas grown to 150 employees
          </Bookmark>
          <Bookmark>
            <h1 className='date'>2020</h1> The companyhas grown to 150 employees
          </Bookmark>
          <Bookmark>
            <h1 className='date'>2020</h1> The companyhas grown to 150 employees
          </Bookmark>
        </Timeline>
      </div>
    </div>
  );
};

export default Roadmap;
