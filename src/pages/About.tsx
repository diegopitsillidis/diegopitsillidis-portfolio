// src/pages/About.tsx
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white pt-8 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-center">
          About Me
        </h1>
        <div className="flex flex-col md:flex-row items-center mb-8">
          {/* Replace with your actual image URL */}
          <img
            src="/images/profile.jpg"
            alt="Diego Pitsillidis"
            className="w-40 h-40 rounded-full mb-4 md:mb-0 md:mr-8 shadow-md"
          />
          <div>
            <p className="mb-4 leading-relaxed">
              I am Diego Pitsillidis, a Software Developer with a passion
              for building scalable, test-driven web applications. My 
              expertise spans React, Angular, .NET, and AWS, and I am 
              continually developing new techniques to advance my skill set.
            </p>
            <p className="leading-relaxed">
              I earned a First Class Honours degree in Computer Application 
              Development from the University of South Wales and have worked 
              on a variety of projects that highlight my strong technical 
              background and commitment to quality software.
            </p>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-3">Skills &amp; Technologies</h2>
          <ul className="list-disc ml-6">
            <li>React, Angular, .NET, SQL</li>
            <li>Test-Driven Development (TDD), CI/CD pipelines, and automated testing with GitHub Actions</li>
            <li>Modern toolchain: Webpack, Babel, Chromatic, Stryker, and Storybook</li>
            <li>AWS Cloud services and serverless architectures</li>
            <li>Database development with SQL and cloud integration</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-3">Download My CV</h2>
          <p className="mb-4 leading-relaxed">
            For a detailed review of my education, work experience, and skills, 
            please download my CV below.
          </p>
          <div className="flex justify-center md:justify-start">
            <a
              href="/Diego_Pitsillidis_-_Software_Developer.pdf"
              download
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded shadow transition-colors"
            >
              Download CV (PDF)
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
