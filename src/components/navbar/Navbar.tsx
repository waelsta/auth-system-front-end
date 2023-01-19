import { useSelector } from 'react-redux';
import React from 'react';
import { Navbar } from 'flowbite-react';
import Menu from './NavBarMenu';
import Profile from './Profile';
import Logo from './Logo';
import { selectStatus, selectUser } from '../../redux/user/userSelectors';
import useUserSelector from '../../hooks/useUserSelector';

const NewNavbar: React.FC = () => {
  const status = useSelector(selectStatus);
  const user = useSelector(selectUser);
  return (
    <Navbar className="sticky top-0 bg-[#9900FF]" fluid={true} rounded={true}>
      <Logo
        name="Services"
        image="https://flowbite.com/docs/images/logo.svg"
        href="#"
      />
      {status ? (
        <Profile
          email={user?.email}
          firstName={user?.first_name}
          image={user?.profile_picture_url}
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
