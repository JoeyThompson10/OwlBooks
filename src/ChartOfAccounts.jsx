import React, { useState } from 'react';
import { MDBContainer, MDBBtn, MDBInput, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';

const ChartOfAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({
    name: '',
    number: '',
    description: '',
    normalSide: '',
    category: '',
    subcategory: '',
    initialBalance: 0,
    debit: 0,
    credit: 0,
    balance: 0,
    dateAdded: new Date(),
    userId: '',
    order: '',
    statement: '',
    comment: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
  };

  const handleAddAccount = () => {
    setAccounts([...accounts, newAccount]);
    // TODO: Add logic to save the new account to the database
  };

  return (
    <MDBContainer>
      <MDBCard>
        <MDBCardBody>
          <MDBInput label="Account Name" name="name" onChange={handleInputChange} />
          <MDBInput label="Account Number" name="number" onChange={handleInputChange} />
          <MDBInput label="Account Description" name="description" onChange={handleInputChange} />
          <MDBInput label="Normal Side" name="normalSide" onChange={handleInputChange} />
          <MDBInput label="Account Category" name="category" onChange={handleInputChange} />
          <MDBInput label="Account Subcategory" name="subcategory" onChange={handleInputChange} />
          <MDBInput label="Initial Balance" name="initialBalance" onChange={handleInputChange} />
          <MDBInput label="Debit" name="debit" onChange={handleInputChange} />
          <MDBInput label="Credit" name="credit" onChange={handleInputChange} />
          <MDBInput label="Balance" name="balance" onChange={handleInputChange} />
          <MDBInput label="User ID" name="userId" onChange={handleInputChange} />
          <MDBInput label="Order" name="order" onChange={handleInputChange} />
          <MDBInput label="Statement" name="statement" onChange={handleInputChange} />
          <MDBInput label="Comment" name="comment" onChange={handleInputChange} />
          <MDBBtn onClick={handleAddAccount}>Add Account</MDBBtn>
        </MDBCardBody>
      </MDBCard>
      {/* Render the list of accounts */}
      {accounts.map(account => (
        <MDBCard key={account.number}>
          <MDBCardBody>
            {/* Render account details */}
            {account.name}
            {/* Add logic for editing and deactivating accounts */}
          </MDBCardBody>
        </MDBCard>
      ))}
    </MDBContainer>
  );
};

export default ChartOfAccounts;




