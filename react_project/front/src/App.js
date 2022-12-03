import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<Login/>}>
            </Route>
            <Route path="/register" element={<SignUp/>}>
            </Route>
            <Route path="/home/:id" element={<Home/>}>
            </Route>
        </Routes>
    </Router>
    </>
  );
}