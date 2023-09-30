import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './headerfooter/Header';
import Footer from './headerfooter/Footer';
import SplashScreen from './pages/SplashScreen';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import ResetPassword from './pages/ResetPassword';
import AddNewAccount from './pages/AdminDashboard/AddNewAccount';

//import './css/global.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/userdashboard" element={<Dashboard />} />
          <Route path="/managerdashboard" element={<ManagerDashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/addnewaccount" element={<AddNewAccount />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
