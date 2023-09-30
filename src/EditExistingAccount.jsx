import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from "./Footer";
import { CreateAccount, CreateUser, LoginFunction, sendEmail, getAccountInfo } from "./MongoDbClient";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCardText, MDBCardTitle } from 'mdb-react-ui-kit'; 
import CryptoJS from 'crypto-js';

const ChartOfAccounts = () => {
  const [accountName, setAccountName] = useState("");
  const [tempAccountID, setTempAccountID] = useState('');
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
  const [accountIsActive, setAccountIsActive] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  

  

  async function handleEditAccount (e) {
    setTempAccountID("test1");
    
    const response = await getAccountInfo(tempAccountID);
    

    if (response.message === "Account found!") {
      setIsFormVisible(true);
      
      setAccountName(response.accountName);
      setAccountNumber(response.accountNumber);
      setAccountDescription(response.accountDescription);
      setAccountNormalSide(response.accountNormalSide);
      setAccountCategory(response.accountCategory);
      setAccountSubcategory(response.accountSubcategory);
      setAccountInitialBalance(response.accountInitialBalance);
      setAccountDebit(response.accountDebit);
      setAccountCredit(response.accountCredit);
      setAccountBalance(response.accountBalance);
      setAccountTimeCreated(response.accountTimeCreated);
      setAccountOrder(response.accountOrder);
      setAccountStatement(response.accountStatement);
      setAccountComment(response.accountComment);
      setAccountIsActive(response.isActive);
    }

    window.alert(response.message);
  };

  return (
    <MDBContainer>
      <MDBCard>
        <MDBCardBody>
          <MDBInput label="Account Name or Number" name="searchname" onChange={e => setTempAccountID(e.target.value)} required />
          <MDBBtn onClick={handleEditAccount}>Edit Account Info</MDBBtn>
        </MDBCardBody>
      </MDBCard>


        {isFormVisible && (
        <MDBCard>
        <MDBCardBody>
          <MDBInput label="Account Name" name="name" onChange={e => setAccountName(e.target.value)} required />
          <MDBInput label="Account Description" name="description" onChange={e => setAccountDescription(e.target.value)} required />
          <MDBInput label="Normal Side" name="normalSide" onChange={e => setAccountNormalSide(e.target.value)} required />
          <MDBInput label="Account Category" name="category" onChange={e => setAccountCategory(e.target.value)} required />
          <MDBInput label="Account Subcategory" name="subcategory" onChange={e => setAccountSubcategory(e.target.value)} required />
          <MDBInput label="Initial Balance" name="initialBalance" onChange={e => setAccountInitialBalance(e.target.value)} required />
          <MDBInput label="Debit" name="debit" onChange={e => setAccountDebit(e.target.value)} required />
          <MDBInput label="Credit" name="credit" onChange={e => setAccountCredit(e.target.value)} required />
          <MDBInput label="Balance" name="balance" onChange={e => setAccountBalance(e.target.value)} required />
          <MDBInput label="Order" name="order" onChange={e => setAccountOrder(e.target.value)} required />
          <MDBInput label="Statement" name="statement" onChange={e => setAccountStatement(e.target.value)} required />
          <MDBInput label="Comment" name="comment" onChange={e => setAccountComment(e.target.value)} required />
          <div style = {{ display: 'flex', alignItems: 'center'}}>
          <input className="form-check-input" type="checkbox" id="accountActiveCheckbox" checked={accountIsActive} onChange={(e) => setAccountIsActive(e.target.checked)}/>
          <label className="form-check-label" htmlFor="accountActiveCheckbox"> Account Activated </label>
          </div>
          <div style={{ marginTop: '1rem' }}>
          <MDBBtn onClick={handleEditAccount}>Save Changes</MDBBtn>
          </div>
        </MDBCardBody>
        </MDBCard>
        )}
    </MDBContainer>
  );
};

export default ChartOfAccounts;




