import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { getJournalEntry } from '../../MongoDbClient';

function LedgerPage() {
  const { accountId } = useParams();
  const [ledgerDetails, setLedgerDetails] = useState([]);

  useEffect(() => {
    // Fetch the journal entries based on the account name
    const fetchJournalEntries = async () => {
      try {
        const journalEntries = await getJournalEntry();
        // Filter the journal entries for the specified account
        const filteredEntries = journalEntries.filter(entry => entry.accountName === accountId);
        setLedgerDetails(filteredEntries);
      } catch (error) {
        console.error('Error fetching ledger details:', error);
      }
    };

    fetchJournalEntries();
  }, [accountId]);

  // Function to format a date to display only the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  // Function to calculate the running balance
  const calculateRunningBalance = (entries) => {
    let balance = 0;
    return entries.map(entry => {
      const debit = parseFloat(entry.debits || 0);
      const credit = parseFloat(entry.credits || 0);
      balance += credit - debit;
      return { ...entry, balance };
    });
  };

  const ledgerDataWithBalance = calculateRunningBalance(ledgerDetails);

  return (
    <div>
      <h2>Ledger Details for Account: {accountId}</h2>
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th>Date Created</th>
            <th>Debit</th>
            <th>Credit</th>
            <th>Balance</th>
            <th>Status</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {ledgerDataWithBalance.map(entry => (
            <tr key={entry._id}>
              <td>{formatDate(entry.datecreated)}</td>
              <td>{entry.debits}</td>
              <td>{entry.credits}</td>
              <td>{entry.balance}</td>
              <td>{entry.status}</td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}

export default LedgerPage;
