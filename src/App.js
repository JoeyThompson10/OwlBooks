/**
 * Project Title: OwlBooks
 * Team Members: Joey Thompson, Denice Jaquez, Owen Murphree, Moreland Walthour
 * Instructor: David Burns
 * Course: SWE 4713 SWE Application Domain
 * 
 * This file is part of the OwlBooks project, a web application for managing book-related activities.
 * It sets up the main React component, App, which includes routing configuration for the application.
 */

// Importing React library, router components, and custom hooks from 'react-router-dom'.
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

// Importing custom header, footer, and page components for the application.
import Header from './components/Header';
import IntroHeader from './components/IntroHeader';
import Footer from './components/Footer';
import SplashScreen from './pages/SplashScreen';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';

// Importing global styling to ensure a consistent look and feel across the application.
import './css/global.css';

// Admin Dashboard related page imports.
import EditUser from './pages/AdminDashboard/EditUser';
import CreateUserPage from './pages/AdminDashboard/CreateUserPage';
import AllUsers from './pages/AdminDashboard/AllUsers';
import ExpiredPasswords from './pages/AdminDashboard/ExpiredPasswords';
import AddNewAccount from './pages/AdminDashboard/AddNewAccount';
import EditExistingAccounts from './pages/AdminDashboard/EditExistingAccounts';
import AllAccounts from './pages/AdminDashboard/AllAccounts';
import AccountEventLog from './pages/AdminDashboard/AccountEventLog';
import LedgerPage from './pages/AdminDashboard/LedgerPage';
import Journal from './pages/Journal';
import TrialBalance from './pages/TrialBalance';

// The Content component orchestrates the layout and routing of the application.
function Content() {
  // Using the useLocation hook to access the current URL path.
  const location = useLocation();
  const currentPath = location.pathname.slice(1);

  // Function to determine if the standard or introductory header should be displayed.
  const shouldDisplayHeader = () => {
    const noHeaderPaths = ["/", "/login", "/App", "/resetpassword"];
    return !noHeaderPaths.includes(location.pathname);
  };

  // Rendering layout with conditional headers, main application routes, and footer.
  return (
    <div>
      {shouldDisplayHeader() && <Header />}
      {!shouldDisplayHeader() && <IntroHeader />}
      <Routes>
        {/* Route configuration for each page in the OwlBooks application. */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edituser" element={<EditUser />} />
        <Route path="/createuser" element={<CreateUserPage />} />
        <Route path="/allusers" element={<AllUsers />} />
        <Route path="/expiredpasswords" element={<ExpiredPasswords />} />
        <Route path="/addaccount" element={<AddNewAccount />} />
        <Route path="/editexistingaccounts" element={<EditExistingAccounts />} />
        <Route path="/allaccounts" element={<AllAccounts />} />
        <Route path="/accounteventlog" element={<AccountEventLog />} />
        <Route path="/ledger/:accountId" element={<LedgerPage />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/trialbalance" element={<TrialBalance />} />
      </Routes>
      <Footer currentPath={currentPath} />
    </div>
  );
}

// The App component is the root component that uses Router to enable navigation.
function App() {
  return (
    <Router>
      <Content />
    </Router>
  );
}

// Exporting the App component for integration into the application.
export default App;
