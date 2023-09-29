import React, { useState } from 'react';
import { CreateUser, LoginFunction, sendEmail, CreateAccount } from "./MongoDbClient";
import { MDBContainer, MDBBtn, MDBInput, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';

const ChartOfAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({
    accountName: '',
    accountNumber: '',
    accountDescription: '',
    accountNormalSide: '',
    accountCategory: '',
    accountSubcategory: '',
    accountInitialBalance: 0,
    accountDebit: 0,
    accountCredit: 0,
    accountBalance: 0,
    accountTimeCreated: new Date(),
    accountUserId: '',
    accountOrder: '',
    accountStatement: '',
    accountComment: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
  };

  async function handleAddAccount (e) {
    setAccounts([...accounts, newAccount]);
    // TODO: Add logic to save the new account to the database
    e.preventDefault();

    {/*const response = await CreateAccount(accountName, accountNumber, accountDescription, accountNormalSide, accountCategory, accountSubcategory, accountInitialBalance, accountDebit, accountCredit, accountBalance, accountTimeCreated, accountUserID, accountOrder, accountStatement, accountComment);
  */}

    const response = await CreateAccount(newAccount);
    window.alert(response.message);
  };

  return (
    <MDBContainer>
      <MDBCard>
        <MDBCardBody>
          <MDBInput label="Account Name" name="name" onChange={handleInputChange} />
          <MDBInput label="Account Description" name="description" onChange={handleInputChange} />
          <MDBInput label="Normal Side" name="normalSide" onChange={handleInputChange} />
          <MDBInput label="Account Category" name="category" onChange={handleInputChange} />
          <MDBInput label="Account Subcategory" name="subcategory" onChange={handleInputChange} />
          <MDBInput label="Initial Balance" name="initialBalance" onChange={handleInputChange} />
          <MDBInput label="Debit" name="debit" onChange={handleInputChange} />
          <MDBInput label="Credit" name="credit" onChange={handleInputChange} />
          <MDBInput label="Balance" name="balance" onChange={handleInputChange} />
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




