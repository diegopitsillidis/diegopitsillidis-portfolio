import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col justify-center items-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Hi, I'm Diego Pitsillidis</h1>
        <p className="text-base md:text-xl mb-8 max-w-2xl mx-auto">
        I am a passionate Full-Stack Developer building modern web applications using primarily .Net and Angular. This portfolio features a responsive, test-driven React app and projects showcasing my skills with AWS (Lambda, SES, Amplify), CI/CD pipelines, OpenAI API integration, and more.
        </p>
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 justify-center">
          <a
            href="/Diego_Pitsillidis_-_Software_Developer.pdf"
            download
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded shadow transition-colors"
          >
            Download My CV
          </a>
          <Link
            to="/projects"
            className="border border-green-500 hover:bg-green-500 hover:text-white text-green-500 font-semibold py-2 px-6 rounded shadow transition-colors"
          >
            View My Projects
          </Link>
        </div>
      </div>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold mb-2">Minesweeper Game</h2>
          <p className="mb-4">
            A React Minesweeper game built with TDD and a CI/CD pipeline meeting strict testing and coverage requirements.
          </p>
          <Link to="/projects#minesweeper" className="text-green-500 hover:underline font-semibold">
            Learn More
          </Link>
        </div>
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold mb-2">ChatGPT with RAG</h2>
          <p className="mb-4">
            A secure integration of ChatGPT with retrieval-augmented generation using AWS Lambda.
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