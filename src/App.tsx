import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ClientHomepage from './pages/client/Home';
import NavBar from './components/navbar/Navbar';

function App() {
  return (
    <div className="App bg-gray-100">
      <NavBar />
      <Routes>
        <Route path="/client/signin" element={<SignIn />} />
        <Route path="/" element={<Landing />} />
        <Route path="/client/signup" element={<SignUp />} />
        <Route path="/client/home" element={<ClientHomepage />} />
      </Routes>
    </div>
  );
}

export default App;
