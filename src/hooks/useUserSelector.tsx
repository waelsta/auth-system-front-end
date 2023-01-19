import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser, selectUserType } from '../redux/user/userSelectors';
import { User, UserType } from '../types/user';

const useUserTypeSelector = () => {
  const userType: UserType = useSelector(selectUserType);
  const user: User | null = useSelector(selectUser);
  console.log(userType);
  return { userType, user };
};

export default useUserTypeSelector;
