import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MDBTable, MDBTableBody, MDBTableHead, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from 'mdbreact';
import { getJournalEntry } from '../../MongoDbClient';

function LedgerPage() {
  const { accountId } = useParams();
  const [ledgerDetails, setLedgerDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [modal, setModal] = useState(false);
  



  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const journalEntries = await getJournalEntry();
        const filteredEntries = journalEntries.filter(
          (entry) =>
            entry.debitAccount === accountId || entry.creditAccount === accountId
        );
        setLedgerDetails(filteredEntries);
      } catch (error) {
        console.error('Error fetching ledger details:', error);
      }
    };

    fetchJournalEntries();
  }, [accountId]);

  const formatDate = (dateString) => {
    const options = { month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const toggleModal = (entry) => {
    setSelectedEntry(entry);
    setModal(!modal);
  };

  const filterByDate = (entry) => {
    if (startDate && endDate) {
      const entryDate = new Date(entry.datecreated);
      return entryDate >= new Date(startDate) && entryDate <= new Date(endDate);
    } else if (startDate) {
      return new Date(entry.datecreated) >= new Date(startDate);
    } else if (endDate) {
      return new Date(entry.datecreated) <= new Date(endDate);
    }
    return true;
  };

  const filterBySearchTerm = (entry) => {
    return (
      entry.debitAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.creditAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.debits.toString().includes(searchTerm) ||
      entry.credits.toString().includes(searchTerm)
    );
  };

  const filteredLedgerEntries = ledgerDetails
    .filter(filterByDate)
    .filter(filterBySearchTerm);

  return (
    <div>
      <h2>Ledger Details for Account: {accountId}</h2>
      <h3 style={{ fontSize: '16px' }}>Search by Date Range or Account Name/Amount</h3>

      <input
        style={{ marginRight: '30px' }}
        type="text"
        placeholder="Account Name / Amount"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        style={{ marginRight: '10px' }}
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <MDBModal isOpen={modal} toggle={() => toggleModal(selectedEntry)} centered>
        <MDBModalHeader toggle={() => toggleModal(selectedEntry)}>
          Journal Entry Details
        </MDBModalHeader>
        <MDBModalBody>
          {selectedEntry && (
            <div>
              <p>Date Created: {formatDate(selectedEntry.datecreated)}</p>
              <p>Debit Account: {selectedEntry.debitAccount}</p>
              <p>Debit: {selectedEntry.debits}</p>
              <p>Credit Account: {selectedEntry.creditAccount}</p>
              <p>Credit: {selectedEntry.credits}</p>
              <p>Entry Type: {selectedEntry.typeEntry}</p>

              
            </div>
          )}
        </MDBModalBody>
        <MDBModalFooter>
          {/* You can add buttons or controls here */}
        </MDBModalFooter>
      </MDBModal>

      <MDBTable>
        <MDBTableHead>
          <tr>
          <th>Date Created</th>
            <th>Debit Account</th>
            <th>Debit</th>
            <th>Credit Account</th>
            <th>Credit</th>
            <th>Balance</th>
            <th>Entry Type</th>
            <th>Comments</th>
            <th>Description</th>
            <th>Post Reference</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {filteredLedgerEntries.map((entry) => (
            <tr key={entry._id}>
              <td>{formatDate(entry.datecreated)}</td>
              <td>{entry.debitAccount}</td>
              <td>{entry.debits}</td>
              <td>{entry.creditAccount}</td>
              <td>{entry.credits}</td>
              <td>{entry.balance}</td>
              <td>{entry.typeEntry}</td>
              <td>{entry.comment}</td>
              <td>{entry.details}</td>

              <td>
                {entry.typeEntry === 'Adjusted' ? (
                  <a href="#" onClick={() => toggleModal(entry)}>
                  Adjusted Journal Entry
                </a>
                ) : (
                  <a href="#" onClick={() => toggleModal(entry)}>
                    Journal Entry
                  </a>
                )}
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}

export default LedgerPage;
