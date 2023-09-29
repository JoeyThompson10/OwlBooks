import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from "./Footer";
import { CreateAccount, CreateUser, LoginFunction, sendEmail } from "./MongoDbClient";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCardText, MDBCardTitle } from 'mdb-react-ui-kit'; 
import CryptoJS from 'crypto-js';

const ChartOfAccounts = () => {
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountDescription, setAccountDescription] = useState('');
  const [accountNormalSide, setAccountNormalSide] = useState('');
  const [accountCategory, setAccountCategory] = useState('');
  const [accountSubcategory, setAccountSubcategory] = useState('');
  const [accountInitialBalance, setAccountInitialBalance] = useState(0.0);
  const [accountDebit, setAccountDebit] = useState(0.0);
  const [accountCredit, setAccountCredit] = useState(0.0);
  const [accountBalance, setAccountBalance] = useState(0.0);
  const [accountTimeCreated, setAccountTimeCreated] = useState(Date);
  const [accountUserId, setAccountUserId] = useState('');
  const [accountOrder, setAccountOrder] = useState('');
  const [accountStatement, setAccountStatement] = useState('');
  const [accountComment, setAccountComment] = useState('');
  
  

  

  async function handleAddAccount (e) {
    // TODO: Add logic to save the new account to the database
    e.preventDefault();

    {/*const response = await CreateAccount(accountName, accountNumber, accountDescription, accountNormalSide, accountCategory, accountSubcategory, accountInitialBalance, accountDebit, accountCredit, accountBalance, accountTimeCreated, accountUserID, accountOrder, accountStatement, accountComment);
  */}

    const response = await CreateAccount(accountName, accountNumber, accountDescription, accountNormalSide, accountCategory, accountSubcategory, accountInitialBalance, accountDebit, accountCredit, accountBalance, accountTimeCreated, accountUserId, accountOrder, accountStatement, accountComment);
    window.alert(response.message);
  };

  return (
    <MDBContainer>
      <MDBCard>
        <MDBCardBody>
          <MDBInput label="Account Name" name="name" onChange={e => setAccountName(e.target.value)} />
          <MDBInput label="Account Description" name="description" onChange={e => setAccountDescription(e.target.value)} />
          <MDBInput label="Normal Side" name="normalSide" onChange={e => setAccountNormalSide(e.target.value)} />
          <MDBInput label="Account Category" name="category" onChange={e => setAccountCategory(e.target.value)} />
          <MDBInput label="Account Subcategory" name="subcategory" onChange={e => setAccountSubcategory(e.target.value)} />
          <MDBInput label="Initial Balance" name="initialBalance" onChange={e => setAccountInitialBalance(e.target.value)} />
          <MDBInput label="Debit" name="debit" onChange={e => setAccountDebit(e.target.value)} />
          <MDBInput label="Credit" name="credit" onChange={e => setAccountCredit(e.target.value)} />
          <MDBInput label="Balance" name="balance" onChange={e => setAccountBalance(e.target.value)} />
          <MDBInput label="Order" name="order" onChange={e => setAccountOrder(e.target.value)} />
          <MDBInput label="Statement" name="statement" onChange={e => setAccountStatement(e.target.value)} />
          <MDBInput label="Comment" name="comment" onChange={e => setAccountComment(e.target.value)} />
          <MDBBtn onClick={handleAddAccount}>Add Account</MDBBtn>
        </MDBCardBody>
      </MDBCard>
      
    </MDBContainer>
  );
};

export default ChartOfAccounts;




