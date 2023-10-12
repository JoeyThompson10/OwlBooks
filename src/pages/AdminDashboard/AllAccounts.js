import React, { useEffect, useState } from 'react';
import { GetAllAccounts } from '../../MongoDbClient'; // Adjust the import path as needed
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const AllAccounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({ name: "", accNumber: "", balance: "" });

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

        fetchAccounts();
    }, []);

    if (loading) return <p>Loading accounts...</p>;
    if (error) return <p>Error loading accounts: {error}</p>;

    return (
        <div>
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

            <h2>All Accounts</h2>
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
                            <td><Link to={`/ledger/${account._id}`}>{account.accName}</Link></td>
                            <td>{account.accNumber}</td>
                            <td>{account.accBalance}</td>
                            <td>{account.accDebit}</td>
                            <td>{account.accCredit}</td>
                            <td>{account.accCategory}</td>
                            <td>{account.accSubcategory}</td>
                            <td>{account.accDescription}</td>
                            <td>{account.accComment}</td>
                        </tr>
                    ))}
                </MDBTableBody>
            </MDBTable>
        </div>
    );
};

export default AllAccounts;






