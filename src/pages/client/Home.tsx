import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentClient } from '../../redux/client/ClientSelectors';
import { selectStatus } from '../../redux/user/userSelectors';
import { classicButtonStyles } from '../../styles/common-styles';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientHomepage: React.FC = () => {
  const client = useSelector(selectCurrentClient);
  const status: boolean = useSelector(selectStatus);
  const navigate = useNavigate();
  useEffect(() => {
    if (!status || !client) navigate('/client/signin');
  }, [client, status]);

  return (
    <div id="home-page" className="bg-gray-200 p-4 h-screen grid self-center">
      <div className="h-3/6">
        <h1 className="text-2xl font-bold text-gray-700">
          Welcome Back {client?.first_name}!
        </h1>
        <p className="text-gray-600">Here is your homepage.</p>
        <button className={classicButtonStyles}>Add an Intervention</button>
      </div>
    </div>
  );
};

export default ClientHomepage;
