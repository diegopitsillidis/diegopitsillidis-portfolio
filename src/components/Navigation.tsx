// src/components/Navigation.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="p-4">
      <ul className="space-y-2">
        <li>
          <Link to="/" className="block p-2 hover:bg-gray-700 rounded">
            Home
          </Link>
        </li>
        <li>
          <Link to="/projects" className="block p-2 hover:bg-gray-700 rounded">
            Projects
          </Link>
        </li>
        <li>
          <Link to="/about" className="block p-2 hover:bg-gray-700 rounded">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="block p-2 hover:bg-gray-700 rounded">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
