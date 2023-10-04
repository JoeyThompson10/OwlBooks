import React, { useEffect, useState } from 'react';
import { GetAllAccounts } from '../../MongoDbClient'; // Adjust the import path as needed
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';

const AllAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          {accounts.map(account => (
            <tr key={account._id}>
              <td>{account.accName}</td>
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




