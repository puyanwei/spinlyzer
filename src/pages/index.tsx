import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useState, SyntheticEvent } from 'react';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const [handHistory, setHandHistory] = useState<string[]>([]);
  trpc.useQuery(['example.postAll']);

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const files = Array.from(target.files || []);

    files.forEach(async (file) => {
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = (e: ProgressEvent<FileReader>): void => {
        const fileData = fileReader.result as string;
        setHandHistory([...handHistory, fileData]);
      };
    });
  }

  // useEffect(() => {
  //   console.log('data', data);
  // }, [data]);

  return (
    <div className='p-8'>
      <div className='grid justify-center w-full h-40 grid-cols-1 p-4 space-y-4 text-xl text-white bg-gray-600'>
        <h3>Upload a hand history:</h3>
        <form onSubmit={handleSubmit}>
          <label className='pr-2' htmlFor='myfile'>
            Select files:
          </label>
          <input
            type='file'
            id='myfile'
            name='myfile'
            onChange={handleSubmit}
          />
          <input className='flex my-2' type='submit' />
        </form>
      </div>

      {/* <div className='flex items-center justify-center w-full pt-6 text-2xl text-blue-500'>
        {data ? <p>{data}</p> : <p>Loading..</p>}
      </div> */}
    </div>
  );
};

export default Home;
