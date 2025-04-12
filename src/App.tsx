import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <header className="bg-gray-900 text-white shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between py-4 px-4">
          {/* Always-visible brand logo linking to Home */}
          <Link
            to="/"
            className="text-2xl font-bold"
            onClick={() => setMenuOpen(false)}
          >
            Diego Pitsillidis
          </Link>
          
          {/* Hamburger Icon for mobile */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            style={{ background: '#646cff' }}
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* Navigation Menu for Desktop */}
          <nav className="hidden md:flex md:space-x-4">
            <Link to="/about" className="hover:text-green-600 transition-colors">
              About
            </Link>
            <Link to="/projects" className="hover:text-green-600 transition-colors">
              Projects
            </Link>
            <Link to="/contact" className="hover:text-green-600 transition-colors">
              Contact
            </Link>
          </nav>
        </div>

        {/* Mobile Menu: full width; excludes Home since logo acts as Home link */}
        {menuOpen && (
          <nav className="md:hidden bg-gray-900">
            <div className="max-w-4xl mx-auto flex flex-col space-y-2 py-2">
              <Link
                to="/about"
                className="block px-4 py-2 hover:bg-green-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/projects"
                className="block px-4 py-2 hover:bg-green-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-2 hover:bg-green-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <footer className="bg-gray-900 border-t text-white py-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Diego Pitsillidis. All rights reserved.
        </p>
      </footer>
    </Router>
  );
};

export default App;
