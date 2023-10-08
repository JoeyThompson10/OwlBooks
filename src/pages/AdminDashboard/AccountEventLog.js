import React, { useEffect, useState } from 'react';
import { GetAllAccountEvents } from '../../MongoDbClient';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import styled from 'styled-components';

const StyledTable = styled(MDBTable)`
  th {
    background-color: #f0f0f0;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  th, td {
    text-align: center;
    vertical-align: middle;
  }
`;

const formatDate = (date) => {
    const formattedDate = date instanceof Date ? date.toLocaleString() : 'N/A';
    return formattedDate;
  };

const EventRow = styled.tr`
  &:hover {
    border: 2px solid #007bff; /* Add your desired border color here */
  }
`;

const AllAccountEvents = () => {
  const [accountEvents, setAccountEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
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

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleBackClick = () => {
    setSelectedEvent(null);
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p style={{ color: 'red' }}>Error loading account events: {error}</p>;

  return (
    <div>
      <h2>All Account Events</h2>
      {selectedEvent ? (
        <div>
          <button onClick={handleBackClick}>Back</button>
          <h3>Event Details</h3>
          <p>Event Number: {selectedEvent.eventNumber}</p>
          <p>Account Name: {selectedEvent.aftAccName}</p>
          <p>Time of Event: {formatDate(selectedEvent.accTimeEdited)}</p>
          <p>Edited By: {selectedEvent.editedBy}</p>
          <h4>Before</h4>
          <StyledTable>
            <MDBTableHead>
              
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <td>Account Number</td>
                <td>{selectedEvent.befAccNumber}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{selectedEvent.befAccDescription}</td>
              </tr>
              <tr>
                <td>Normal Side</td>
                <td>{selectedEvent.befAccNormalSide}</td>
              </tr>
              <tr>
                <td>Category</td>
                <td>{selectedEvent.befAccCategory}</td>
              </tr>
              <tr>
                <td>Subcategory</td>
                <td>{selectedEvent.befAccSubcategory}</td>
              </tr>
              <tr>
                <td>Initial Balance</td>
                <td>{selectedEvent.befAccInitialBalance}</td>
              </tr>
              <tr>
                <td>Debit</td>
                <td>{selectedEvent.befAccDebit}</td>
              </tr>
              <tr>
                <td>Credit</td>
                <td>{selectedEvent.befAccCredit}</td>
              </tr>
              <tr>
                <td>Balance</td>
                <td>{selectedEvent.befAccBalance}</td>
              </tr>
              <tr>
                <td>Order</td>
                <td>{selectedEvent.befAccOrder}</td>
              </tr>
              <tr>
                <td>Statement</td>
                <td>{selectedEvent.befAccStatement}</td>
              </tr>
              <tr>
                <td>Comment</td>
                <td>{selectedEvent.befAccComment}</td>
              </tr>
              <tr>
                <td>Is Active</td>
                <td>{selectedEvent.befIsActive.toString()}</td>
              </tr>
            </MDBTableBody>
          </StyledTable>
          <h4>After</h4>
          <StyledTable>
            <MDBTableHead>
              
            </MDBTableHead>
            <MDBTableBody>
            <tr>
                <td>Account Number</td>
                <td>{selectedEvent.aftAccNumber}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{selectedEvent.aftAccDescription}</td>
              </tr>
              <tr>
                <td>Normal Side</td>
                <td>{selectedEvent.aftAccNormalSide}</td>
              </tr>
              <tr>
                <td>Category</td>
                <td>{selectedEvent.aftAccCategory}</td>
              </tr>
              <tr>
                <td>Subcategory</td>
                <td>{selectedEvent.aftAccSubcategory}</td>
              </tr>
              <tr>
                <td>Initial Balance</td>
                <td>{selectedEvent.aftAccInitialBalance}</td>
              </tr>
              <tr>
                <td>Debit</td>
                <td>{selectedEvent.aftAccDebit}</td>
              </tr>
              <tr>
                <td>Credit</td>
                <td>{selectedEvent.aftAccCredit}</td>
              </tr>
              <tr>
                <td>Balance</td>
                <td>{selectedEvent.aftAccBalance}</td>
              </tr>
              <tr>
                <td>Order</td>
                <td>{selectedEvent.aftAccOrder}</td>
              </tr>
              <tr>
                <td>Statement</td>
                <td>{selectedEvent.aftAccStatement}</td>
              </tr>
              <tr>
                <td>Comment</td>
                <td>{selectedEvent.aftAccComment}</td>
              </tr>
              <tr>
                <td>Is Active</td>
                <td>{selectedEvent.aftIsActive.toString()}</td>
              </tr>
              {/* Add more rows for other variables */}
            </MDBTableBody>
          </StyledTable>
        </div>
      ) : (
        <StyledTable>
          <MDBTableHead>
            <tr>
              <th>Event Number</th>
              <th>Account Name</th>
              <th>Date of Event</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {accountEvents.map(event => (
            <EventRow key={event._id} onClick={() => handleEventClick(event)}>
              
                <td>{event.eventNumber}</td>
                <td>{event.aftAccName}</td>
                <td>{formatDate(event.accTimeEdited)}</td>
              
            </EventRow>
            ))}
          </MDBTableBody>
        </StyledTable>
      )}
    </div>
  );
};

export default AllAccountEvents;