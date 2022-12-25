import React from 'react';
import { Link } from 'react-router-dom';

type NavbarProps = {
  // add any props that your Navbar component needs here
};

const Navbar: React.FC<NavbarProps> = props => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-between items-center">
        <li className="text-white font-bold uppercase tracking-wide">
          <Link to="/" className="text-white hover:text-gray-400">
            Home
          </Link>
        </li>
        <li className="text-white font-bold uppercase tracking-wide">
          <Link to="/client/signup" className="text-white hover:text-gray-400">
            Sign Up
          </Link>
        </li>
        <li className="text-white font-bold uppercase tracking-wide">
          <Link to="/client/signin" className="text-white hover:text-gray-400">
            Sign In
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
