import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectStatus } from '../redux/client/clientSlice';
import { signout } from '../redux/client/clientSlice';
type NavbarProps = {
  // add any props that your Navbar component needs here
};

const Navbar: React.FC<NavbarProps> = props => {
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-between items-center">
        <li className="text-white font-bold uppercase tracking-wide">
          <Link to="/" className="text-white hover:text-gray-400">
            E-SERVICES
          </Link>
        </li>
        {!status ? (
          <>
            <li className="text-white font-bold uppercase tracking-wide">
              <Link
                to="/client/signup"
                className="text-white hover:text-gray-400"
              >
                Sign Up
              </Link>
            </li>
            <li className="text-white font-bold uppercase tracking-wide">
              <Link
                to="/client/signin"
                className="text-white hover:text-gray-400"
              >
                Sign In
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="text-white font-bold uppercase tracking-wide">
              <Link
                to="/client/home"
                className="text-white hover:text-gray-400"
              >
                Home
              </Link>
            </li>
            <li
              className="text-white font-bold uppercase tracking-wide"
              onClick={() => {
                dispatch(signout());
              }}
            >
              <Link
                to="/client/signin"
                className="text-white hover:text-gray-400"
              >
                sign out
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
