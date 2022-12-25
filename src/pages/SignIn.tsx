import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { clientSignIn, selectCurrentClient } from '../redux/client/clientSlice';
import { IUser } from '../types/client';
const SignIn: React.FC = () => {
  const client: IUser | null = useSelector(selectCurrentClient);
  const [Credentials, setCredentials] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const handleChange = async (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setCredentials({ ...Credentials, [name]: value });
  };
  return (
    <div className="h-screen">
      <div className="p-3xl w-1/5 rounded-xl mx-auto my-72 shadow-md flex justify-center align-middle flex-col bg-slate-300 p-9">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Login</h1>
        <label htmlFor="email" className="block font-bold text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          onChange={handleChange}
          className="w-full py-2 px-3 bg-gray-200 rounded-md text-gray-700 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
        />
        <label
          htmlFor="password"
          className="block font-bold text-gray-700 mt-4 mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          onChange={handleChange}
          className="w-full py-2 px-3 bg-gray-200 rounded-md text-gray-700 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
        />
        <button
          onClick={() => {
            dispatch(clientSignIn(Credentials));
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-8"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SignIn;
