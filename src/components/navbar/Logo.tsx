import React from 'react';
import { Navbar } from 'flowbite-react';

interface LogoProps {
  href: string;
  image: string;
  name: string;
}

// the header logo component
const Logo: React.FC<LogoProps> = props => {
  return (
    <Navbar.Brand href={props.href}>
      <img src={props.image} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        {props.name}
      </span>
    </Navbar.Brand>
  );
};

export default Logo;
