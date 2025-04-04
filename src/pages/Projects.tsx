import React from 'react';
import Minesweeper from '../components/projects/Minesweeper';
import SortingVis from '../components/algorithmVis/SortingVis';
import AngularPathfindingEmbed from '../components/projects/AngularPathfinding';
import ChatGPTChat from '../components/ChatGPTChat';

const Projects: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Projects</h1>
      <div className="w-full max-w-4xl space-y-6">
        <Minesweeper />
      </div>
      <div className="w-full max-w-4xl space-y-6">
        <SortingVis />
      </div>
      <div className="w-full max-w-4xl space-y-6">
        <AngularPathfindingEmbed />
      </div>
      <div className="w-full max-w-4xl space-y-6">
        <ChatGPTChat />
      </div>
    </div>
  );
};

export default Projects;
