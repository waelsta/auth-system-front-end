import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { Navbar } from 'flowbite-react';
import Menu from './NavBarMenu';
import Profile from './Profile';
import Logo from './Logo';
import {
  selectCurrentClient,
  selectStatus
} from '../../redux/client/ClientSelectors';

const NewNavbar: React.FC = () => {
  const navigate = useNavigate();
  const status = useSelector(selectStatus);
  const client = useSelector(selectCurrentClient);

  useEffect(() => {
    if (!status || !client) {
      navigate('/client/signin');
    }
  }, [client, status]);

  return (
    <Navbar className="sticky top-0" fluid={true} rounded={true}>
      <Logo
        name="Services"
        image="https://flowbite.com/docs/images/logo.svg"
        href="#"
      />
      {status ? (
        <Profile
          email={client?.email}
          firstName={client?.first_name}
          image={client?.image_url}
        />
      ) : (
        ''
      )}
      <Navbar.Toggle />
      <Menu isLoggedIn={status} />
    </Navbar>
  );
};

export default NewNavbar;
