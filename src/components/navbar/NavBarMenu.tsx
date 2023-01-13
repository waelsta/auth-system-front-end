import React from 'react';
import { Navbar } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clientSignout } from '../../redux/client/clientSlice';
import { setEndpoint, ToggleState } from '../../redux/ui/uiSlice';
// import { openModal, setModalRoute } from '../../redux/ui/uiSlice';

const Menu: React.FC<{ isLoggedIn: boolean }> = props => {
  const { isLoggedIn } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Navbar.Collapse>
      <Navbar.Link className="cursor-pointer" onClick={() => navigate('/')}>
        Home
      </Navbar.Link>
      <Navbar.Link className="cursor-pointer" onClick={() => navigate('/')}>
        Services
      </Navbar.Link>

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
              dispatch(clientSignout());
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
