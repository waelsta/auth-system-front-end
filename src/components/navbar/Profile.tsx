import React from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Dropdown } from 'flowbite-react';
import { signout } from '../../redux/user/userSlice';
import useUserSelector from '../../hooks/useUserSelector';

interface ProfileProps {
  firstName: string | undefined;
  email: string | undefined;
  image: string | undefined;
}

const Profile: React.FC<ProfileProps> = props => {
  const { userType } = useUserSelector();
  const dispatch = useDispatch();
  return (
    <div className="flex md:order-2 invisible md:visible">
      <Dropdown
        arrowIcon={false}
        inline={true}
        label={<Avatar alt="User settings" img={props.image} rounded={true} />}
      >
        <Dropdown.Header>
          <span className="block text-sm">{props.firstName}</span>
          <span className="block truncate text-sm font-medium">
            {props.email}
          </span>
        </Dropdown.Header>
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          onClick={() => {
            dispatch(signout(userType));
          }}
        >
          Sign out
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default Profile;
