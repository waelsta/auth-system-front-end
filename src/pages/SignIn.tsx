import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { clientSignIn, selectCurrentClient } from '../redux/client/clientSlice';
import {
  classicButtonStyles,
  formStyles,
  inputFieldStyles,
  labelStyles
} from '../styles/common-styles';
import { IClient } from '../types/client';
const SignIn: React.FC = () => {
  const client: IClient | null = useSelector(selectCurrentClient);
  const [Credentials, setCredentials] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const handleChange = async (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setCredentials({ ...Credentials, [name]: value });
  };
  return (
    <div className="h-screen">
      <div className={formStyles}>
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Login</h1>
        <label htmlFor="email" className={labelStyles}>
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          className={inputFieldStyles}
        />
        <label htmlFor="password" className={labelStyles}>
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          className={inputFieldStyles}
        />
        <button
          onClick={() => {
            dispatch(clientSignIn(Credentials));
          }}
          className={classicButtonStyles}
        >
          Login
        </button>
        <div></div>
      </div>
    </div>
  );
};

export default SignIn;
