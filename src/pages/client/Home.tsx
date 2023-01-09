import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentClient } from '../../redux/client/ClientSelectors';
import { classicButtonStyles } from '../../styles/common-styles';
const ClientHomepage: React.FC = () => {
  const client = useSelector(selectCurrentClient);
  return (
    <div className="bg-gray-200 p-4 h-full grid self-center">
      <h1 className="text-2xl font-bold text-gray-700">
        Welcome Back {client!.first_name}!
      </h1>
      <p className="text-gray-600">Here is your homepage.</p>
      <button className={classicButtonStyles}>Add an Intervention</button>
    </div>
  );
};

export default ClientHomepage;
