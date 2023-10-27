import React from 'react';
import { MDBContainer, MDBTypography, MDBBtn } from 'mdb-react-ui-kit';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const isAdmin = localStorage.getItem("privilages") === "admin";
    const isManager = localStorage.getItem("privilages") === "manager";
    const hasAccount = localStorage.getItem("privilages");

    const manageUserItems = [
        { text: 'r', icon: <EditIcon />, path: '/edituser' },
        { text: 'Create User', icon: <AddBoxIcon />, path: '/createuser' },
        { text: 'All Users', icon: <PeopleAltIcon />, path: '/allusers' },
        { text: 'Expired Password', icon: <KeyOffIcon />, path: '/expiredpasswords' },
    ];

    const manageAccountItems = [
        { text: 'Add New Account', icon: <AccountBalanceIcon />, path: '/addaccount' },
        { text: 'Edit Existing Account', icon: <EditNoteIcon />, path: '/editexistingaccounts' },
        
    ];

    const everyoneItems = [
        { text: 'All Accounts', icon: <AccountBalanceIcon />, path: '/allaccounts' },
        { text: 'Account Event Log', icon: <ReceiptLongIcon />, path: '/accounteventlog' },
        { text: 'Journal', icon: <AccountBalanceIcon />, path: "/journal" },
    ];

    return (
        <MDBContainer fluid className="p-0 bg-warning text-dark">

            {(!(isManager || isAdmin) && hasAccount) && (
                <h1>
                    <MDBTypography tag="div" className="display-1 mb-3 mx-4 text-light">
                        User Dashboard
                    </MDBTypography>
                    <MDBTypography className="lead mb-3 mx-4">
                        This is the user dashboard page. Users can complete user-specific tasks and abilities from here.
                    </MDBTypography>
                </h1>
            )}

            {isManager && (
                <h1>
                    <MDBTypography tag="div" className="display-1 mb-3 mx-4 text-light">
                        Manager Dashboard
                    </MDBTypography>
                    <MDBTypography className="lead mb-3 mx-4">
                        This is the manager dashboard page. System managers can complete manager-specific tasks and abilities from here.
                    </MDBTypography>
                </h1>
            )}

            {isAdmin && (
                <h1>
                    <MDBTypography tag="div" className="display-1 mb-3 mx-4 text-light">
                        Admin Dashboard
                    </MDBTypography>
                    <MDBTypography className="lead mb-3 mx-4">
                        This is the admin dashboard page. System admins can complete admin-specific tasks and abilities from here.
                    </MDBTypography>
                </h1>
            )}

            <div className="mx-4">
                {everyoneItems.map((item) => (
                    <MDBBtn color="primary" className="m-2" onClick={() => navigate(item.path)}>
                        {item.icon} {item.text}
                    </MDBBtn>
                ))}
                {(isManager || isAdmin) && manageAccountItems.map((item) => (
                    <MDBBtn color="secondary" className="m-2" onClick={() => navigate(item.path)}>
                        {item.icon} {item.text}
                    </MDBBtn>
                ))}
                {(isAdmin) && manageUserItems.map((item) => (
                    <MDBBtn color="info" className="m-2" onClick={() => navigate(item.path)}>
                        {item.icon} {item.text}
                    </MDBBtn>
                ))}
            </div>
        </MDBContainer>
    );
};

export default Dashboard;
