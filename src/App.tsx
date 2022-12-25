import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
function App() {
  return (
    <div className="App bg-gray-100">
      <Navbar/> 
     <Routes>
      <Route path='/client/signin' element={<SignIn/>} />
      <Route path='/landingpage' element={<Landing/>} />
      <Route path='/client/signin' element={<SignIn/>} />
   
     </Routes>
    </div>
  );
}

export default App;
