import React, { useEffect, useState } from 'react';
import { GetAllAccounts } from '../../MongoDbClient'; // Adjust the import path as needed
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';

const AccountEventLog = () => {
  const [accountEvents, setAccountEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccountEvents = async () => {
      try {
        setLoading(true);
        // Replace this with a function that fetches account events from your backend
        const accountEventsData = await fetchAccountEventsFromBackend();
        setAccountEvents(accountEventsData);
      } catch (error) {
        console.error('Error fetching account events:', error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchAccountEvents();
  }, []);

  if (loading) return <p>Loading account events...</p>;
  if (error) return <p>Error loading account events: {error}</p>;

  return (
    <div>
      <h2>Account Event Log</h2>
      <MDBTable hover>
        <MDBTableHead>
          <tr>
            <th>Event Number</th>
            <th>Account Name</th>
            <th>Account Number</th>
            <th>Balance Before</th>
            <th>Balance After</th>
            {/* Add additional columns for before and after values */}
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {accountEvents.map(event => (
            <tr key={event.eventNumber}>
              <td>{event.eventNumber}</td>
              <td>{event.aftAccName}</td>
              <td>{event.aftAccNumber}</td>
              <td>{event.befAccBalance}</td>
              <td>{event.aftAccBalance}</td>
              {/* Add additional columns for before and after values */}
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default AccountEventLog;