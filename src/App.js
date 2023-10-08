import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './headerfooter/Header';
import Footer from './headerfooter/Footer';
import SplashScreen from './pages/SplashScreen';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
//Routes header
import EditUser from './pages/AdminDashboard/EditUser';
import CreateUserPage from './pages/AdminDashboard/CreateUserPage';
import AllUsers from './pages/AdminDashboard/AllUsers';
import ExpiredPasswords from './pages/AdminDashboard/ExpiredPasswords';
import AddNewAccount from './pages/AdminDashboard/AddNewAccount';
import EditExistingAccounts from './pages/AdminDashboard/EditExistingAccounts';
import AllAccounts from './pages/AdminDashboard/AllAccounts'

//import './css/global.css';

function Content() {
  const location = useLocation(); // Get the current location
  const currentPath = location.pathname.slice(1);

  const shouldDisplayHeader = () => {
    const noHeaderPaths = ["/splashscreen", "/login", "/App", "/resetpassword"];
    return !noHeaderPaths.includes(location.pathname);
  };


  return (
      <div>
        {shouldDisplayHeader() && <Header />}
        <Routes>
          <Route path="splashscreen" element={<SplashScreen />} />
          <Route path="login" element={<Login />} />
          <Route path="resetpassword" element={<ResetPassword />} />
          <Route path="userdashboard" element={<Dashboard />} />
          <Route path="managerdashboard" element={<ManagerDashboard />} />
          <Route path="admindashboard" element={<AdminDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="edituser" element={<EditUser />} />
          <Route path="createuser" element={<CreateUserPage />} />
          <Route path="allusers" element={<AllUsers />} />
          <Route path="expiredpasswords" element={<ExpiredPasswords />} />
          <Route path="addaccount" element={<AddNewAccount />} />
          <Route path="editexistingaccounts" element={<EditExistingAccounts />} />
          <Route path="allaccounts" element={<AllAccounts />} />

        </Routes>
        <Footer currentPath={currentPath} />
      </div>
  );
}
function App() {
  return (
    <Router>
      <Content />
    </Router>
  );
}

export default App;
