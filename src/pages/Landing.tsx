
import React from 'react';

const Landing: React.FC = () => {
  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to Home Services</h1>
      <p className="text-xl text-gray-700 mt-4">We offer a variety of home services to make your life easier.</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-8">
        Learn More
      </button>
    </div>
  );
};

export default Landing;