import React from 'react';
import { useSelector } from 'react-redux';
import { Navbar } from 'flowbite-react';
import Logo from './Logo';
import Profile from './Profile';
import Menu from './NavBarMenu';
import {
  selectCurrentClient,
  selectStatus
} from '../../redux/client/ClientSelectors';

const NewNavbar: React.FC = () => {
  const status = useSelector(selectStatus);
  const client = useSelector(selectCurrentClient);
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
