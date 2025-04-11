import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col justify-center items-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Hi, I'm Diego Pitsillidis
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          I am a passionate Full-Stack Developer creating modern web applications using mostly .Net and Angular.
          This portfolio showcases a responsive and test-driven web application using React and includes a variety of projects that demonstrate my skills using various technologies such as AWS Lamda/SES/Amplify, a CI/CD pipeline, OpenAi Api integration and more.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="/Diego_Pitsillidis_-_Software_Developer.pdf"
            download
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded shadow"
          >
            Download My CV
          </a>
          <Link
            to="/projects"
            className="bg-transparent border border-green-500 hover:bg-green-500 hover:text-white text-green-500 font-semibold py-2 px-6 rounded shadow"
          >
            View My Projects
          </Link>
        </div>
      </div>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold mb-2">Minesweeper Game</h2>
          <p className="mb-4">
            A React Minesweeper game built with TDD and a CI/CD pipeline that meets strict testing and coverage requirements.
          </p>
          <Link to="/projects#minesweeper" className="text-green-500 hover:underline font-semibold">
            Learn More
          </Link>
        </div>
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold mb-2">ChatGPT with RAG</h2>
          <p className="mb-4">
            A secure integration of ChatGPT with retrieval-augmented generation using AWS Lambda and precomputed document embeddings.
          </p>
          <Link to="/projects#chatgpt" className="text-green-500 hover:underline font-semibold">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
