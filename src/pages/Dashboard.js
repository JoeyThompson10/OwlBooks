import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBTypography, MDBBtn } from 'mdb-react-ui-kit';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useNavigate } from 'react-router-dom';
import { green, yellow, red } from '@mui/material/colors';
import { getPendingJournalEntries, GetAllAccounts, getJournalEntry } from '../MongoDbClient';

const Dashboard = () => {
    const navigate = useNavigate();
    const [pendingEntriesCount, setPendingEntriesCount] = useState(0);
    const [currentRatioValue, setCurrentRatioValue] = useState(0);

    useEffect(() => {
        const fetchPendingEntries = async () => {
            try {
                const entries = await getPendingJournalEntries();
                setPendingEntriesCount(entries.length);
            } catch (error) {
                console.error("Error fetching pending journal entries:", error);
            }
        };

        const calculateCurrentRatio = async () => {
            const accounts = await GetAllAccounts();
            const journalEntries = await getJournalEntry();

            let totalCurrentAssets = 0;
            let totalCurrentLiabilities = 0;

            accounts.forEach(account => {
                if (account.accCategory === "Assets") {
                    totalCurrentAssets += account.accBalance;
                }
                if (account.accCategory === "Liabilities") {
                    totalCurrentLiabilities += account.accBalance;
                }
            });

            const currentRatio = totalCurrentLiabilities === 0 ? 0 : totalCurrentAssets / totalCurrentLiabilities;
            setCurrentRatioValue(currentRatio);
        };

        fetchPendingEntries();
        calculateCurrentRatio();
    }, []);

    const sumJournalEntries = (journalEntries, accountName, type) => {
        return journalEntries.reduce((total, entry) => {
            if (type === 'debit' && entry.debitAccount === accountName) {
                return total + parseFloat(entry.debits['$numberDouble'] || 0);
            }
            if (type === 'credit' && entry.creditAccount === accountName) {
                return total + parseFloat(entry.credits['$numberDouble'] || 0);
            }
            return total;
        }, 0);
    };

    const getRatioColor = (value) => {
        const goodThreshold = 2;
        const warningThreshold = 1.5;
        if (value >= goodThreshold) return green[500];
        if (value < goodThreshold && value >= warningThreshold) return yellow[600];
        return red[500];
    };

    const FinancialRatio = ({ name, value, color }) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f8f8f8' }}>
            <h2 style={{ marginRight: '10px' }}>{name}:</h2>
            <h1 style={{ color, fontSize: '2rem', margin: 0 }}>{value.toFixed(2)}</h1>
        </div>
    );

    useEffect(() => {
        const fetchPendingEntries = async () => {
            try {
                const entries = await getPendingJournalEntries();
                setPendingEntriesCount(entries.length);
            } catch (error) {
                console.error("Error fetching pending journal entries:", error);
            }
        };

        fetchPendingEntries();
    }, []);

    const isAdmin = localStorage.getItem("privilages") === "admin";
    const isManager = localStorage.getItem("privilages") === "manager";
    const hasAccount = localStorage.getItem("privilages");

    const manageUserItems = [
        { text: 'Edit User', icon: <EditIcon />, path: '/edituser' },
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
        { text: 'Trial Balance', icon: <AccountBalanceIcon />, path: "/trialbalance"}
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

            <MDBTypography tag='div' className='important-messages'>
    <span className='underline-text'>Pending Journal Entries:</span>
    <p>There are {pendingEntriesCount} pending journal entries.</p>
</MDBTypography>        

<div>
                <MDBTypography tag="div" className="display-4 mb-3 mx-4 text-light">
                    Financial Ratios
                </MDBTypography>
                <FinancialRatio
                    name="Current Ratio"
                    value={currentRatioValue}
                    color={getRatioColor(currentRatioValue)}
                />
                {/* Additional financial ratios can be added here */}
            </div>
        </MDBContainer>
    );
};

export default Dashboard;
