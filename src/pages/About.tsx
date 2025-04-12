// src/pages/About.tsx
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white pt-8 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-center">About Me</h1>
        <div className="flex flex-col md:flex-row items-center mb-8">
          <img
            src="/images/profile.jpg"  // Ensure this file exists in your public/images folder
            alt="Diego Pitsillidis"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full mb-4 md:mb-0 md:mr-8 shadow-md"
          />
          <div className="text-base md:text-lg">
            <p className="mb-4 leading-relaxed">
              I am Diego Pitsillidis, a Software Developer with expertise in building scalable, test-driven web applications.
              My journey spans React, Angular, .NET, and AWS, and I continuously push the boundaries of modern web development.
            </p>
            <p className="leading-relaxed">
              I hold a First Class Honours degree in Computer Application Development and have built production systems using TDD,
              CI/CD, and a robust toolchain including Webpack, Babel, Chromatic, Stryker, and Storybook.
            </p>
          </div>
        </div>
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-3">Skills &amp; Technologies</h2>
          <ul className="list-disc ml-6 text-base md:text-lg">
            <li>React, Angular, .NET, SQL</li>
            <li>Test-Driven Development (TDD), CI/CD pipelines, and automated testing with GitHub Actions</li>
            <li>Modern toolchain: Webpack, Babel, Chromatic, Stryker, and Storybook</li>
            <li>AWS Cloud services and serverless architectures</li>
            <li>Database development and cloud integration with SQL</li>
          </ul>
        </section>
        <section>
          <h2 className="text-3xl font-bold mb-3">Download My CV</h2>
          <p className="mb-4 leading-relaxed text-base md:text-lg">
            For a detailed review of my work experience, education, and skills, please download my CV below.
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
