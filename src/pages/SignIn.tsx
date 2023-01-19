import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import {
  selectResponse,
  selectShowAlert
} from '../redux/client/ClientSelectors';
import { selectStatus } from '../redux/user/userSelectors';
import { signin } from '../redux/user/userSlice';
import { resetModal } from '../redux/ui/uiSlice';
import {
  classicButtonStyles,
  formStyles,
  inputFieldStyles,
  labelStyles
} from '../styles/common-styles';
import useUserTypeSelector from '../hooks/useUserSelector';

const SignIn: React.FC = () => {
  const { user, userType } = useUserTypeSelector();
  const navigate = useNavigate();
  const showAlert = useSelector(selectShowAlert);
  const status = useSelector(selectStatus);
  const response = useSelector(selectResponse);
  const [Credentials, setCredentials] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const handleChange = async (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setCredentials({ ...Credentials, [name]: value });
  };

  // reset userRoute state (prevent double rendering caused by react strict mode v18)
  // prevent running clean-up function on first render
  const shouldRun = useRef(false);
  useEffect(() => {
    if (shouldRun.current === false) {
      shouldRun.current = true;
    } else {
      return () => {
        dispatch(resetModal());
      };
    }
  }, []);

  useEffect(() => {
    status && navigate('/client/home');
  }, [status]);

  return (
    <div className="h-screen">
      <div className={formStyles}>
        {showAlert && <Alert message={response.message} error={true} />}
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
            dispatch(signin({ Credentials, userType }));
          }}
          className={classicButtonStyles}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SignIn;
