import React from 'react';
import '../css/headerFooterStyles.css';

const Footer = ({ currentPath }) => {
  function HelpButton({ message }) {
    return (
      <button onClick={() => alert(message)}>
          Help
      </button>
    );
  } 

  return (
    <footer>
    <p>&copy; 2023 Owl Books. All rights reserved.</p>
    <div>
      {/* Conditional rendering for HelpButton */}
      {currentPath === '' && <HelpButton message="This is the splash screen. Click Login to start." />}
      {currentPath === 'login' && <HelpButton message="Enter your credentials to login. If you do not have a user, create one. 
                          After you create a user your new username will be sent to your email you used to register. 
                          If you forgot your password, select the forgot password button to continue. " />}
      {currentPath === 'app' && <HelpButton message="This is the main app. Click the Owl in the taskbar to go back to the Home Page" />}
      {currentPath === 'resetpassword' && <HelpButton message="After you reset your password go to the login page to login in with the new password. 
                          If you do not want to reset your password anymore, click on the owl in the taskbar to go back to Home Page." />}
      {currentPath === 'profile' && <HelpButton message="This is your profile page. You can view and edit your personal information here." />}
      {currentPath === 'managerdashboard' && <HelpButton message="Welcome to the Manager's Dashboard. You can oversee various activities and metrics here." />}
      {currentPath === 'dashboard' && <HelpButton message="This is your main dashboard, where you can quickly see an overview of your activities and tasks." />}
      {currentPath === 'expiredpasswords' && <HelpButton message="Here, you can view accounts with expired passwords and reset them." />}
      {currentPath === 'edituser' && <HelpButton message="Edit user details on this page. Ensure all changes are saved before leaving the page." />}
      {currentPath === 'editexistingaccounts' && <HelpButton message="Choose an account from the list to modify its details. Use search to narrow down the list." />}
      {currentPath === 'createuser' && <HelpButton message="Fill in the user details to create a new user account." />}
      {currentPath === 'allusers' && <HelpButton message="View a list of all registered users. Click on a user to see more details or edit their information." />}
      {currentPath === 'allaccounts' && <HelpButton message="See an overview of all existing accounts. Only administrators can make chnages to the accounts." />}
      {currentPath === 'admindashboard' && <HelpButton message="Welcome to the Admin Dashboard. Here you have an overview of the system and can manage users and settings." />}
      {currentPath === 'addaccount' && <HelpButton message="Provide necessary details to add a new account. Make sure to fill out all required fields." />}
      {currentPath === 'journal' && <HelpButton message="This page provides you with a comprehensive view of all your accounting transactions recorded as journal entries.
                          When selecting the account name it will take you to the ledger page for that account. 
                          When adding a new journal entry use the plus sign on the tabel. Make sure to be in the right tab for type of entry, for a regular entry stay in 'journal entry' and consecutively."/>}
      {currentPath === 'trialbalance' && <HelpButton message="This page displays the Trial Balance report, a key financial statement that lists the balances of all ledger accounts at a point in time. 
                          The report is structured to show account numbers, account names, and their corresponding debit and credit balances, ensuring that total debits equal total credits, which is a fundamental principle of double-entry bookkeeping." />}
      {currentPath === 'accounteventlog' && <HelpButton message="This page provides a detailed log of all events related to the various accounts within our financial management system. 
                          It serves as a chronological record, offering insights into every action taken, which can be vital for auditing and tracking purposes.
                          When selecting the account name it will takeyou to the ledger page for that account." />}
      </div>
    </footer>
  );
  

}

export default Footer;
