import React from 'react';

interface ProjectCardProps {
  title: string;
  children: React.ReactNode; // this will be your project component (e.g., Minesweeper, SortingVis, etc.)
  documentation: React.ReactNode; // documentation content for the project
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, children, documentation }) => {
  return (
    <div className="bg-white shadow-md rounded-lg border p-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="mb-6">{children}</div>
      <div className="border-t pt-4">
        <h3 className="text-xl font-semibold mb-2">Documentation</h3>
        <div className="text-gray-800 leading-relaxed">
          {documentation}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
