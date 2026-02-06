import { useEffect } from 'react';
import './App.css'
import Card from './components/Card'
import Search from './components/Search'
import { Toaster } from "sonner";
import { seedData } from './utils/seedData';

function App() {
  useEffect(() => {
    console.log("Seeding....")
    seedData(); // This will seed both categories and todos
  }, []);

  return (
    <>
      <main className='flex flex-col r items-center w-full min-h-screen px-4 sm:px-6 lg:px-8'>
        <div className="w-full max-w-7xl">
          <Toaster />
          <div className="flex flex-col items-center mt-4 sm:mt-6 mb-6 sm:mb-8">
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-center'>Todo App</h1>
            <p className='text-sm sm:text-base text-gray-600 mt-1'>Focus On What Matters</p>
          </div>
          <Search />
          <Card />
        </div>
      </main>
    </>
  )
}

export default App