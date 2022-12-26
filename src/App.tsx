import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <div className="App bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/client/signin" element={<SignIn />} />
        <Route path="/landingpage" element={<Landing />} />
        <Route path="/client/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
