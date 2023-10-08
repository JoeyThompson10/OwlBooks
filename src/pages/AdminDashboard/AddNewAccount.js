import React, { useState } from "react";
import { CreateAccount } from "../../MongoDbClient";
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import Tooltip from '@mui/material/Tooltip';

const AddNewAccount = () => {
  const [accountName, setAccountName] = useState('');
  const [accountNumber] = useState('');
  const [accountDescription, setAccountDescription] = useState('');
  const [accountNormalSide, setAccountNormalSide] = useState('');
  const [accountCategory, setAccountCategory] = useState('');
  const [accountSubcategory, setAccountSubcategory] = useState('');
  const [accountInitialBalance, setAccountInitialBalance] = useState(0.00);
  const [accountDebit, setAccountDebit] = useState(0.00);
  const [accountCredit, setAccountCredit] = useState(0.00);
  const [accountBalance, setAccountBalance] = useState(0.00);
  const [accountTimeCreated] = useState(Date);
  const [accountUserId] = useState('');
  const [accountOrder, setAccountOrder] = useState('');
  const [accountStatement, setAccountStatement] = useState('');
  const [accountComment, setAccountComment] = useState('');


  
  async function handleAddAccount(e) {


    
    e.preventDefault();

    const response = await CreateAccount(accountName, accountNumber, accountDescription, accountNormalSide, accountCategory, accountSubcategory, accountInitialBalance, accountDebit, accountCredit, accountBalance, accountTimeCreated, accountUserId, accountOrder, accountStatement, accountComment);
    window.alert(response.message);
  };

  return (
    <MDBContainer>
      <MDBCard>
        <MDBCardBody>
          <Tooltip title="Enter the name for the account">
        <div style={{ marginTop: '1rem' }}><MDBInput label="Account Name" name="name" onChange={e => setAccountName(e.target.value)} /></div></Tooltip>
          <Tooltip title="Briefly describe the account's purpose">
        <div style={{ marginTop: '1rem' }}><MDBInput label="Account Description" name="description" onChange={e => setAccountDescription(e.target.value)} /></div></Tooltip>
          <Tooltip title="Enter either 'Debit' or 'Credit' for the account's normal side">
        <div style={{ marginTop: '1rem' }}><MDBInput label="Normal Side" name="normalSide" onChange={e => setAccountNormalSide(e.target.value)} /></div></Tooltip>
          <Tooltip title="Specify the account's primary category">
        <div style={{ marginTop: '1rem' }}><MDBInput label="Account Category" name="category" onChange={e => setAccountCategory(e.target.value)} /></div></Tooltip>
          <Tooltip title="Specify the account's subcategory, if any">
        <div style={{ marginTop: '1rem' }}><MDBInput label="Account Subcategory" name="subcategory" onChange={e => setAccountSubcategory(e.target.value)} /></div></Tooltip>
          <Tooltip title="Enter the initial balance for the account">
        <div style={{ marginTop: '1rem' }}><MDBInput label="Initial Balance" name="initialBalance" value={accountInitialBalance} onChange={e => setAccountInitialBalance(e.target.value)} /></div></Tooltip>
          <Tooltip title="Enter the debit amount for the account">
        <div style={{ marginTop: '1rem' }}><MDBInput label="Debit" name="debit" value={accountDebit} onChange={e => setAccountDebit(e.target.value)} /></div></Tooltip>
          <Tooltip title="Enter the credit amount for the account">
        <div style={{ marginTop: '1rem' }}><MDBInput label="Credit" name="credit" value={accountCredit} onChange={e => setAccountCredit(e.target.value)} /></div></Tooltip>
          <Tooltip title="Enter the current balance of the account">
        <div style={{ marginTop: '1rem' }}><MDBInput label="Balance" name="balance" value={accountBalance} onChange={e => setAccountBalance(e.target.value)} /></div></Tooltip>
          <Tooltip title="Specify the order of the account">
        <div style={{ marginTop: '1rem' }}><MDBInput label="Order" name="order" onChange={e => setAccountOrder(e.target.value)} /></div></Tooltip>
          <Tooltip title="Provide any statements related to the account">
        <div style={{ marginTop: '1rem' }}><MDBInput label="Statement" name="statement" onChange={e => setAccountStatement(e.target.value)} /></div></Tooltip>
          <Tooltip title="Add any comments or notes related to the account">
        <div style={{ marginTop: '1rem' }}><MDBInput label="Comment" name="comment" onChange={e => setAccountComment(e.target.value)} /></div></Tooltip>
          <Tooltip title="Click to add the new account">
        <div style={{ marginTop: '1rem' }}><MDBBtn onClick={handleAddAccount}>Add Account</MDBBtn></div></Tooltip>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default AddNewAccount;