import React, { useEffect, useState} from 'react';
import { GetAllAccounts, sendEmail, GetAllUsers, displayEventsForOneAccount } from '../../MongoDbClient'; // Adjust the import path as needed
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const AllAccounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({ name: "", accNumber: "", balance: "" });
    const [isEmailModalVisible, setEmailModalVisible] = useState(false);
    const [customEmailSubject, setCustomEmailSubject] = useState("");
    const [customEmailBody, setCustomEmailBody] = useState("");
    const [currentEmailRecipient, setCurrentEmailRecipient] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    
    const [selectedUserId, setSelectedUserId] = useState("");
    const selectedUserEmail = allUsers.find(user => user._id === selectedUserId)?.email;

    const [events, setEvents] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [showEventsModal, setShowEventsModal] = useState(false);

    const fetchEventsForAccount = async (accountName) => {
        try {
          const accountEvents = await displayEventsForOneAccount(accountName);
          setEvents(accountEvents);
          setShowEventsModal(true);
        } catch (error) {
          console.error('Error fetching account events:', error);
          
        }
      };

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

    async function handleSendCustomEmail() {
        const response = await sendEmail(
            currentEmailRecipient,
            customEmailSubject,
            customEmailBody
        );
        if (response.success) {
            window.alert("Email sent successfully.");
        } else {
            window.alert("Failed to send email.");
        }
        setEmailModalVisible(false);
    }

    function openEmailModal() {
        const emailOfSelectedUser = allUsers.find(user => user._id === selectedUserId)?.email;
        setCurrentEmailRecipient(emailOfSelectedUser);
        setEmailModalVisible(true);
    }
    

    function handleSelectChange(event) {
        setSelectedUserId(event.target.value);
    }

    if (loading) return <p>Loading accounts...</p>;
    if (error) return <p>Error loading accounts: {error}</p>;

    return (
        <div className='p-3'>
            <h2>All Accounts</h2>
            <div className='d-flex justify-content-between my-3 p-2'>
            <input
                type="text"
                placeholder="Filter by Name"
                value={filter.name}
                onChange={e => setFilter(prev => ({ ...prev, name: e.target.value }))}
            />
            <input
                type="text"
                placeholder="Filter by Account Number"
                value={filter.accNumber}
                onChange={e => setFilter(prev => ({ ...prev, accNumber: e.target.value }))}
            />
            <input
                type="text"
                placeholder="Filter by Balance"
                value={filter.balance}
                onChange={e => setFilter(prev => ({ ...prev, balance: e.target.value }))}
            />
            </div>
            <div className='d-flex justify-content-center'>
            <MDBBtn center className="p-2" size="sm"
                                    onClick={() => openEmailModal()}
                                >
                                    Send Email
                                </MDBBtn></div>
            <MDBTable hover>
                <MDBTableHead>
                    <tr>
                        <th>Account Name</th>
                        <th>Account Number</th>
                        <th>Balance</th>
                        <th>Debit</th>
                        <th>Credit</th>
                        <th>Category</th>
                        <th>Subcategory</th>
                        <th>Description</th>
                        <th>Comment</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {accounts.filter(account =>
                        (!filter.name || (account.accName && typeof account.accName === 'string' && account.accName.includes(filter.name))) &&
                        (!filter.accNumber || (account.accNumber && typeof account.accNumber === 'string' && account.accNumber.includes(filter.accNumber))) &&
                        (!filter.balance || (account.accBalance && account.accBalance.toString().includes(filter.balance)))
                    ).map(account => (
                        <tr key={account._id}>
                            <td><Link to={`/ledger/${account.accName}`}>{account.accName}</Link></td>
                            <td><Link to={`/ledger/${account.accName}`}>{account.accNumber}</Link></td>
                            <td>{account.accBalance}</td>
                            <td>{account.accDebit}</td>
                            <td>{account.accCredit}</td>
                            <td>{account.accCategory}</td>
                            <td>{account.accSubcategory}</td>
                            <td>{account.accDescription}</td>
                            <td>{account.accComment}</td>
                            <td> 
                                <MDBBtn
                                center
                                className="p-2"
                                size="sm"
                                onClick={() => {
                                    setSelectedAccount(account.accName);
                                    fetchEventsForAccount(account.accName);
                                }}
                                >
                                Account Events
                                </MDBBtn>
                            </td>
                        </tr>
                    ))}
                </MDBTableBody>
            </MDBTable>

            {isEmailModalVisible && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            width: "600px",
                            margin: "200px auto",
                            padding: "10px",
                            background: "white",
                            borderRadius: "5px",
                        }}
                    >
                        <h3>Customize Email</h3>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="user-email-select-label">Select User Email</InputLabel>
                            <Select
                                labelId="user-id-select-label"
                                value={selectedUserId}
                                onChange={handleSelectChange}
                                label="User ID"
                            >
                                {allUsers.map((user) => (
                                    <MenuItem key={user._id} value={user._id}>
                                        {user._id}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <br />
                        <label className='my-4'>Subject:</label>
                        <input
                            type="text"
                            value={customEmailSubject}
                            onChange={(e) => setCustomEmailSubject(e.target.value)}
                        />
                        <br />
                        <label className='my-4'>Body:</label>
                        <textarea
                            value={customEmailBody}
                            onChange={(e) => setCustomEmailBody(e.target.value)}
                        />
                        <br />
                        <button onClick={handleSendCustomEmail}>Send</button>
                        <button onClick={() => setEmailModalVisible(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AllAccounts;