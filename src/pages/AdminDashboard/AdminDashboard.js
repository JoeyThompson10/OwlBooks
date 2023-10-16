import React from 'react';
import { MDBContainer, MDBTypography, MDBBtn } from 'mdb-react-ui-kit';
import 'react-tabs/style/react-tabs.css';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const manageUserItems = [
    { text: 'Edit User', icon: <EditIcon />, path: '/edituser' },
    { text: 'Create User', icon: <AddBoxIcon />, path: '/createuser' },
    { text: 'All Users', icon: <PeopleAltIcon />, path: '/allusers' },
    { text: 'Expired Password', icon: <KeyOffIcon />, path: '/expiredpasswords' },
  ];

  const manageAccountItems = [
    { text: 'Add New Account', icon: <AccountBalanceIcon />, path: '/addaccount' },
    { text: 'Edit Existing Account', icon: <EditNoteIcon />, path: '/editexistingaccounts' },
    { text: 'Account Event Log', icon: <ReceiptLongIcon />, path: '/accounteventlog' },
  ];

  const everyoneItems = [
    { text: 'All Accounts', icon: <AccountBalanceIcon />, path: '/allaccounts' },
  ];

  return (
    <MDBContainer fluid className="p-0 bg-warning text-dark">
      <h1>
        <MDBTypography tag="div" className="display-1 mb-3 mx-4 text-light">
          Admin Dashboard
        </MDBTypography>
      </h1>
      <MDBTypography className="lead mb-3 mx-4">
        This is the admin dashboard page. System admins can complete admin-specific tasks and abilities from here.
      </MDBTypography>
      <div className="mx-4">
        {everyoneItems.map((item) => (
          <MDBBtn color="primary" className="m-2" onClick={() => navigate(item.path)}>
            {item.text}
          </MDBBtn>
        ))}
        {manageAccountItems.map((item) => (
          <MDBBtn color="secondary" className="m-2" onClick={() => navigate(item.path)}>
            {item.text}
          </MDBBtn>
        ))}
        {manageUserItems.map((item) => (
          <MDBBtn color="info" className="m-2" onClick={() => navigate(item.path)}>
            {item.text}
          </MDBBtn>
        ))}
      </div>
    </MDBContainer>
  );
};

export default AdminDashboard;
