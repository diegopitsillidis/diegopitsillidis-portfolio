import React from 'react';
import SimpleInteractiveLogos from '../components/SimpleInteractiveLogos';


const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <SimpleInteractiveLogos />
      <h1 className="text-4xl font-bold mt-4">Welcome to My Portfolio</h1>
      <p className="text-xl">A showcase of modern web technologies and thoughtful design.</p>
    </div>
  );
};

export default Home;