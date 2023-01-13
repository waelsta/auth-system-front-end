import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ClientHomepage from './pages/client/Home';
import NavBar from './components/navbar/Navbar';
import ProfilePictureUpload from './pages/ProfilePictureUpload';
import UserTypeModal from './components/UserTypeModal';

function App() {
  return (
    <div className="App bg-gray-100">
      <NavBar />
      <UserTypeModal />
      <Routes>
        <Route path="/signin/client" element={<SignIn />} />
        <Route path="/signin/employee" element={<SignIn />} />
        <Route path="/" element={<Landing />} />
        <Route path="/client/signup" element={<SignUp />} />
        <Route path="/client/home" element={<ClientHomepage />} />
        <Route
          path="/uploads/profile_picture"
          element={<ProfilePictureUpload />}
        />
      </Routes>
    </div>
  );
}

export default App;
