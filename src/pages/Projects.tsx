import React from 'react';
import Minesweeper from '../components/projects/Minesweeper';

const Projects: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-4xl font-bold mb-4">Projects</h1>
      <div className="w-full max-w-4xl space-y-6">
        <Minesweeper />
      </div>
    </div>
  );
};

export default Projects;
