import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Minesweeper from '../components/projects/Minesweeper';
import SortingVis from '../components/algorithmVis/SortingVis';
import AngularPathfindingEmbed from '../components/projects/AngularPathfinding';
import ChatGPTChat from '../components/ChatGPTChat';
import ProjectCard from '../components/ProjectCard';

const Projects: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, [location]);

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <h1 className="text-4xl font-bold text-center mb-8">Projects</h1>
      <div className="max-w-4xl mx-auto space-y-12">
        <ProjectCard 
          id="minesweeper"
          title="Minesweeper Game" 
          documentation={
            <div>
              <p>
                This Minesweeper project demonstrates robust, test-driven development (TDD) with React.
                It uses a comprehensive CI/CD pipeline enforcing strict testing, code coverage, and linting.
              </p>
              <ul className="list-disc ml-6">
                <li>
                  <strong>React & TDD:</strong> Built entirely with React following a TDD methodology. Every new feature and component is accompanied by unit, integration, and end-to-end tests.
                </li>
                <li>
                  <strong>CI/CD Pipeline:</strong> The project is integrated with a robust CI/CD pipeline that enforces:
                  <ul className="list-disc ml-6">
                    <li>Strict testing requirements</li>
                    <li>A minimum code coverage percentage</li>
                    <li>Linting standards</li>
                  </ul>
                  Deployments occur only when these criteria are met.
                </li>
                <li>
                  <strong>Tooling:</strong> Several modern tools are utilized throughout the development process:
                  <ul className="list-disc ml-6">
                    <li><strong>Webpack & Babel:</strong> For module bundling and transpiling, ensuring compatibility and optimal performance.</li>
                    <li><strong>Chromatic:</strong> For visual testing and review of Storybook components.</li>
                    <li><strong>Stryker:</strong> For mutation testing, providing deeper insight into test quality.</li>
                    <li><strong>Storybook:</strong> For documenting and visually testing UI components in isolation.</li>
                  </ul>
                </li>
                <li>
                  <strong>Course-Driven Learning:</strong> The project was developed during a comprehensive Udemy course on React, offering deep insights into best practices for both development and testing.
                </li>
              </ul>
              <p>
                Overall, this Minesweeper project not only focuses on advanced React development skills but also reflects a strong commitment to software quality, maintainability, and continuous integration/continuous delivery practices.
              </p>
            </div>
          }
        >
          <Minesweeper />
        </ProjectCard>

        <ProjectCard 
          id="algorithm-visualizations"
          title="Sorting Algorithm Visualizations" 
          documentation={
            <div>
              <p>This section includes visualizations for various algorithms, such as bubble sort, insertion sort, and selection sort:</p>
              <ul className="list-disc ml-6">
                <li>Interactive UI components in React.</li>
                <li>Live visualization and step-through animations of sorting techniques.</li>
                <li>Emphasis on TDD and modular, reusable code.</li>
              </ul>
            </div>
          }
        >
          <SortingVis />
        </ProjectCard>

        <ProjectCard 
          id="angular-pathfinding"
          title="Angular Pathfinding Visualization" 
          documentation={
            <div>
              <p>This project uses Angular Elements to integrate an Angular pathfinding visualization into a React app:</p>
              <ul className="list-disc ml-6">
                <li>Demonstrates cross-framework integration (Angular within React).</li>
                <li>Uses Angular's robust framework for complex interactive visualizations.</li>
                <li>Deployed on AWS Amplify.</li>
              </ul>
            </div>
          }
        >
          <AngularPathfindingEmbed />
        </ProjectCard>

        <ProjectCard 
          id="chatgpt"
          title="ChatGPT Integration with RAG" 
          documentation={
            <div>
              <p>
                Integrates ChatGPT with Retrieval-Augmented Generation by using precomputed document embeddings.
              </p>
              <ul className="list-disc ml-6">
                <li>Retrieves context from precomputed document embeddings.</li>
                <li>Uses OpenAI's GPT API for generating intelligent responses.</li>
                <li>Ensures API security with backend proxy and AWS Amplify functions.</li>
                <li>Highlights full-stack development skills, using React for UI and AWS Lambda for secure backend logic.</li>
              </ul>
              <p>Try asking, "who is Diego" to see the context in action.</p>
            </div>
          }
        >
          <ChatGPTChat />
        </ProjectCard>
      </div>
    </div>
  );
};

export default Projects;
