import React, { useState } from "react";
import { getAccountInfo, setAccountInfo } from "../../MongoDbClient";
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';



const ChartOfAccounts = () => {
  const [accountName, setAccountName] = useState("");
  const [tempAccountID, setTempAccountID] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountDescription, setAccountDescription] = useState('');
  const [accountNormalSide, setAccountNormalSide] = useState('');
  const [accountCategory, setAccountCategory] = useState('');
  const [accountSubcategory, setAccountSubcategory] = useState('');
  const [accountInitialBalance, setAccountInitialBalance] = useState(0.00);
  const [accountDebit, setAccountDebit] = useState(0.00);
  const [accountCredit, setAccountCredit] = useState(0.00);
  const [accountBalance, setAccountBalance] = useState(0.00);
  const [accountTimeCreated, setAccountTimeCreated] = useState(Date);
  const [accountOrder, setAccountOrder] = useState('');
  const [accountStatement, setAccountStatement] = useState('');
  const [accountComment, setAccountComment] = useState('');
  const [accountIsActive, setAccountIsActive] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);





  async function handleEditAccount(e) {


    const response = await getAccountInfo(tempAccountID);


    if (response.message === "Account found!") {
      setIsFormVisible(true);

      setAccountName(response.accName);
      setAccountNumber(response.accNumber);
      setAccountDescription(response.accDescription);
      setAccountNormalSide(response.accNormalSide);
      setAccountCategory(response.accCategory);
      setAccountSubcategory(response.accSubcategory);
      setAccountInitialBalance(response.accInitialBalance);
      setAccountDebit(response.accDebit);
      setAccountCredit(response.accCredit);
      setAccountBalance(response.accBalance);
      setAccountTimeCreated(response.accTimeCreated);
      setAccountOrder(response.accOrder);
      setAccountStatement(response.accStatement);
      setAccountComment(response.accComment);
      setAccountIsActive(response.isActive);
    }
    window.alert(response.message);
  };

  async function handleSaveChanges(e){
    e.preventDefault();
    const response = await setAccountInfo(tempAccountID, accountName, accountDescription, accountNormalSide, accountCategory, accountSubcategory, accountInitialBalance, accountDebit, accountCredit, accountBalance, accountTimeCreated, accountOrder, accountStatement, accountComment, accountIsActive);

    window.alert(response.message);
  }

  return (
    <MDBContainer>
      <MDBCard>
        <MDBCardBody>
          <MDBInput label="Account Name or Number" name="searchname" onChange={e => setTempAccountID(e.target.value)} required />
          <div style={{ marginTop: '1rem' }}><MDBBtn onClick={handleEditAccount}>Edit Account Info</MDBBtn></div>
        </MDBCardBody>
      </MDBCard>


      {isFormVisible && (
        <div style={{ marginTop: '1rem' }}><MDBCard>
          <MDBCardBody>
            <div style={{ marginTop: '1rem' }}><MDBInput label="Account Name" name="name" value={accountName} onChange={e => setAccountName(e.target.value)} required /></div>
            <div style={{ marginTop: '1rem' }}><MDBInput label="Account Number" name="number" value={accountNumber} readOnly /></div>
            <div style={{ marginTop: '1rem' }}><MDBInput label="Account Description" name="description" value={accountDescription} onChange={e => setAccountDescription(e.target.value)} required /></div>
            <div style={{ marginTop: '1rem' }}><MDBInput label="Normal Side" name="normalSide" value={accountNormalSide} onChange={e => setAccountNormalSide(e.target.value)} required /></div>
            <div style={{ marginTop: '1rem' }}><MDBInput label="Account Category" name="category" value={accountCategory} onChange={e => setAccountCategory(e.target.value)} required /></div>
            <div style={{ marginTop: '1rem' }}><MDBInput label="Account Subcategory" name="subcategory" value={accountSubcategory} onChange={e => setAccountSubcategory(e.target.value)} required /></div>
            <div style={{ marginTop: '1rem' }}><MDBInput label="Initial Balance" name="initialBalance" value={accountInitialBalance.toLocaleString('en-US', {style: 'currency', currency: 'USD' })} onChange={e => setAccountInitialBalance(e.target.value)} required /></div>
            <div style={{ marginTop: '1rem' }}><MDBInput label="Debit" name="debit" value={accountDebit} onChange={e => setAccountDebit(e.target.value)} required /></div>
            <div style={{ marginTop: '1rem' }}><MDBInput label="Credit" name="credit" value={accountCredit} onChange={e => setAccountCredit(e.target.value)} required /></div>
            <div style={{ marginTop: '1rem' }}><MDBInput label="Balance" name="balance" value={accountBalance} onChange={e => setAccountBalance(e.target.value)} required /></div>
            <div style={{ marginTop: '1rem' }}><MDBInput label="Order" name="order" value={accountOrder} onChange={e => setAccountOrder(e.target.value)} required /></div>
            <div style={{ marginTop: '1rem' }}><MDBInput label="Statement" name="statement" value={accountStatement} onChange={e => setAccountStatement(e.target.value)} required /></div>
            <div style={{ marginTop: '1rem' }}><MDBInput label="Comment" name="comment" value={accountComment} onChange={e => setAccountComment(e.target.value)} required /></div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input className="form-check-input" type="checkbox" id="accountActiveCheckbox" checked={accountIsActive} onChange={(e) => setAccountIsActive(e.target.checked)} />
              <label className="form-check-label" htmlFor="accountActiveCheckbox"> Account Activated </label>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <MDBBtn onClick={handleSaveChanges}>Save Changes</MDBBtn>
            </div>
          </MDBCardBody>
        </MDBCard>
        </div>
      )}
    </MDBContainer>
  );
};

export default ChartOfAccounts;