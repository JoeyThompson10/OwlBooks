import React, { useEffect, useState } from 'react';
import { GetAllAccounts, sendEmail, GetAllUsers, displayEventsForOneAccount } from './/../MongoDbClient'; // Adjust the import path as needed
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const TrialBalance = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({ name: "", accNumber: "", balance: "" });
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                setLoading(true);
                const accountsData = await GetAllAccounts();
                setAccounts(accountsData);
            } catch (error) {
                console.error('Error fetching accounts:', error);
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        };
        async function fetchUsers() {
            const users = await GetAllUsers();
            setAllUsers(users);
        }
        fetchUsers();
        fetchAccounts();
    }, []);

    function handleSelectChange(event) {
        setSelectedUserId(event.target.value);
    }

    if (loading) return <p>Loading accounts...</p>;
    if (error) return <p>Error loading accounts: {error}</p>;

    
    const totalDebit = accounts.reduce((sum, account) => sum + (isNaN(account.accDebit) ? 0 : account.accDebit), 0);
    const totalCredit = accounts.reduce((sum, account) => sum + (isNaN(account.accCredit) ? 0 : account.accCredit), 0);

    return (
        <div className='p-3'>
            <h2 className="text-center">Trial Balance</h2>
            <div className='d-flex justify-content-between my-3 p-2'></div>

            <div style={{ border: '2px solid gray', borderRadius: '10px' }}>
                <MDBTable hover>
                    <MDBTableHead>
                        <tr>
                            <th>Account Number</th>
                            <th>Account Name</th>
                            <th>Debit</th>
                            <th>Credit</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {accounts
                            .filter(
                                (account) =>
                                    (!filter.name ||
                                        (account.accName &&
                                            typeof account.accName === 'string' &&
                                            account.accName.includes(filter.name))) &&
                                    (!filter.accNumber ||
                                        (account.accNumber &&
                                            typeof account.accNumber === 'string' &&
                                            account.accNumber.includes(filter.accNumber))) &&
                                    (!filter.balance ||
                                        (account.accBalance &&
                                            account.accBalance.toString().includes(filter.balance)))
                            )
                            .map((account) => (
                                <tr key={account._id}>
                                    <td>{account.accNumber}</td>
                                    <td>{account.accName}</td>
                                    <td>{account.accDebit !== 0 ? account.accDebit : ''}</td>
                                    <td>{account.accCredit !== 0 ? account.accCredit : ''}</td>
                                </tr>
                            ))}
                        
                    
                        <tr>
                            <td colSpan="2" style={{ textAlign: 'right', paddingRight: '80px', fontWeight: 'bold', fontSize: 'larger'}}>Total</td>
                            <td><strong>{totalDebit !== 0 ? totalDebit : ''}</strong></td>
                            <td><strong>{totalCredit !== 0 ? totalCredit : ''}</strong></td>
                        </tr>
                    </MDBTableBody>
                </MDBTable>
            </div>
        </div>
    );
};

export default TrialBalance;
