import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

function LedgerPage() {
  const { accountId } = useParams();
  const [ledgerDetails, setLedgerDetails] = useState([]);

  useEffect(() => {
    // Fetch the ledger details using the accountId
    fetch(`/api/ledger/${accountId}`)
      .then(response => response.json())
      .then(data => setLedgerDetails(data))
      .catch(error => console.error('Error fetching ledger details:', error));
  }, [accountId]);

  return (
    <div>
      <h2>Ledger Details for Account: {accountId}</h2>
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {ledgerDetails.map(detail => (
            <tr key={detail._id}>
              <td>{detail.date}</td>
              <td>{detail.description}</td>
              <td>{detail.amount}</td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}

export default LedgerPage;
