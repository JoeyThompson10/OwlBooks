import React, { useEffect, useState } from 'react';
import { GetAllAccountEvents } from '../../MongoDbClient'; // Adjust the import path as needed
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';

const AllAccountEvents = () => {
  const [accountEvents, setAccountEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccountEvents = async () => {
      try {
        setLoading(true);
        const eventsData = await GetAllAccountEvents();
        setAccountEvents(eventsData);
      } catch (error) {
        console.error('Error fetching account events:', error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchAccountEvents();
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error loading account events: {error}</p>;

  return (
    <div>
      <h2>All Account Events</h2>
      <MDBTable hover>
        <MDBTableHead>
          <tr>
            <th>Event Number</th>
            <th>Account Name</th>
            <th>Field</th>
            <th>Before</th>
            <th>After</th>
            <th>Edited Time</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {accountEvents.map(event => (
            event.changes.map(change => (
              <tr key={event._id}>
                <td>{event.eventNumber}</td>
                <td>{event.accName}</td>
                <td>{change.field}</td>
                <td>{change.before}</td>
                <td>{change.after}</td>
                <td>{event.accTimeEdited}</td>
              </tr>
            ))
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default AllAccountEvents;