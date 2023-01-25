import React, { useEffect, useState } from 'react';
import { Navbar } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signout } from '../../redux/user/userSlice';
import { setEndpoint, ToggleState } from '../../redux/ui/uiSlice';
import useUserSelector from '../../hooks/useUserSelector';
import { selectUserType } from '../../redux/user/userSelectors';

const Menu: React.FC<{ isLoggedIn: boolean }> = props => {
  const { isLoggedIn } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userType = useSelector(selectUserType);
  return (
    <Navbar.Collapse>
      {isLoggedIn ? (
        <>
          <Navbar.Link
            className="cursor-pointer md:invisible"
            onClick={() => navigate('/')}
          >
            Account
          </Navbar.Link>
          <Navbar.Link
            className="cursor-pointer md:invisible"
            onClick={() => {
              dispatch(signout(userType));
            }}
          >
            Signout
          </Navbar.Link>
        </>
      ) : (
        ''
      )}

      {isLoggedIn ? (
        ''
      ) : (
        <Navbar.Link
          className="cursor-pointer"
          onClick={() => {
            dispatch(setEndpoint('signin'));
            dispatch(ToggleState());
          }}
        >
          Sign in
        </Navbar.Link>
      )}
      {isLoggedIn ? (
        ''
      ) : (
        <Navbar.Link
          className="cursor-pointer"
          onClick={() => {
            dispatch(setEndpoint('signup'));
            dispatch(ToggleState());
          }}
        >
          Sign up
        </Navbar.Link>
      )}
    </Navbar.Collapse>
  );
};

export default Menu;
