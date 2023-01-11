import React from 'react';
import About from './About';
const Landing: React.FC = () => {
  return (
    <>
      <div
        id="landing-page"
        className="bg-gray-100 h-screen flex flex-col items-center justify-center"
      >
        <h1 className="text-4xl font-bold text-gray-800">
          Interventions Unleashed: Hire, Rate, and Grow!
        </h1>
        <p className="text-xl text-gray-700 mt-4">
          We offer a variety of home services to make your life easier.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-8">
          <a href="#learn-more-page" className="">
            Learn More
          </a>
        </button>
      </div>
      <About />
    </>
  );
};

export default Landing;
