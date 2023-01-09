import React from 'react';
import { Navbar } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clientSignout } from '../../redux/client/clientSlice';

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
          onClick={() => navigate('/client/signin')}
        >
          Sign in
        </Navbar.Link>
      )}
      {isLoggedIn ? (
        ''
      ) : (
        <Navbar.Link
          className="cursor-pointer"
          onClick={() => navigate('/client/signup')}
        >
          Sign up
        </Navbar.Link>
      )}
    </Navbar.Collapse>
  );
};

export default Menu;
