import { render } from '@testing-library/react';

import App from './App';
import { GetAllAccounts } from './MongoDbClient'; 
import Footer from './components/Footer';
import CalendarPopover from './components/CalendarPopover';
import UserOptions from './components/UserOptions';
import TrialBalance from './pages/TrialBalance';
import Profile from './pages/Profile';
import AccountEventLog from './pages/AdminDashboard/AccountEventLog';
import AllAccounts from './pages/AdminDashboard/AllAccounts';
import ExpiredPasswords from './pages/AdminDashboard/ExpiredPasswords';
import LedgerPage from './pages/AdminDashboard/LedgerPage';

test('renders App component', () => {
  render(<App />);
});

test('GetAllAccounts function returns an array of objects', async () => {
  const result = await GetAllAccounts();
  expect(result).toBeInstanceOf(Array);
});

test('renders Footer component', () => {
  render(<Footer />);
});

test('renders CalendarPopover component', () => {
  render(<CalendarPopover />);
});

test('renders UserOptions component', () => {
  render(<UserOptions />);
});

test('renders TrialBalance component', () => {
  render(<TrialBalance />);
});

test('renders Profile component', () => {
  render(<Profile />);
});

test('renders AccountEventLog component', () => {
  render(<AccountEventLog />);
});

test('renders AllAccounts component', () => {
  render(<AllAccounts />);
});

test('renders ExpiredPasswords component', () => {
  render(<ExpiredPasswords />);
});

test('renders LedgerPage component', () => {
  render(<LedgerPage />);
});