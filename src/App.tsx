import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import AccountPage from './components/AccountPage';
import GetStartedPage from './components/GetStartedPage';
import IndividualPage from './components/IndividualPage';
import NoAccountPage from './components/NoAccountPage';
import StartPage from './components/StartPage';
import MyInvestmentsPage from './components/MyInvestmentsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/get-started" element={<GetStartedPage/>} />
        <Route path="/individual" element={<IndividualPage/>} />
        <Route path="/no-account" element={<NoAccountPage/>} />
        <Route path="/start" element={<StartPage/>} />
        <Route path="/my-investments" element={<MyInvestmentsPage/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
