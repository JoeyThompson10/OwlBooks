import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {CreateUser, getUserInfoFunction, setUserInfoFunction, GetAllUsers, sendEmail, GetAlmostExpiredUsers} from "./MongoDbClient";
import {MDBBtn, MDBInput, MDBCardTitle, MDBContainer, MDBTypography, MDBCard, MDBRow, MDBCol, MDBCardBody} from 'mdb-react-ui-kit';
import Header from "./Header";
import Footer from "./Footer";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newIsAdmin, setNewIsAdmin] = useState(false);
  const [newIsManager, setNewIsManager] = useState();
  const [newIsActive, setNewIsActive] = useState();
  const [newBadLogins, setNewBadLogins] = useState();

  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserFirstName, setNewUserFirstName] = useState('');
  const [newUserLastName, setNewUserLastName] = useState('');
  const [newUserAddress, setNewUserAddress] = useState('');
  const [newUserDOB, setNewUserDOB] = useState('');

  const [isUserInfoVisible, setUserInfoVisible] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [almostExpiredUsers, setAlmostExpiredUsers] = useState([]);

  const [isEmailModalVisible, setEmailModalVisible] = useState(false);
  const [customEmailSubject, setCustomEmailSubject] = useState('');
  const [customEmailBody, setCustomEmailBody] = useState('');
  const [currentEmailRecipient, setCurrentEmailRecipient] = useState('');

  async function handleGetAllUsers() {
    const usersReport = await GetAllUsers();
    setAllUsers(usersReport);
  }

  async function handleGetAlmostExpiredUsers() {
    const usersReport = await GetAlmostExpiredUsers(50);
    setAlmostExpiredUsers(usersReport);
  }
  

  function toggleUserInfoForm() {
    const userInfoForm = document.getElementById('userInfoForm');
    userInfoForm.style.display = "block";
    setUserInfoVisible(true);
  }

    async function getUserButton(e) {
    e.preventDefault();
    const response = await getUserInfoFunction(username);

    if (response.message === "User found!") {
      toggleUserInfoForm();
      setNewUsername(response._id || "");
    //   setNewPassword(response.password || "");
      setNewIsAdmin(response.isAdmin);
      setNewIsManager(response.isManager);
      setNewIsActive(response.isActive);
      setNewBadLogins(response.badLogins);
    }

    window.alert(response.message);
    }

    async function setUserButton(e) {
    e.preventDefault();
    const response = await setUserInfoFunction(
        newUsername,
      newIsAdmin,
      newIsManager,
      newIsActive,
      newBadLogins
    );
    window.alert(response.message);
    }

    async function handleCreateUser(e) {
    e.preventDefault();
    const response = await CreateUser(
        newPassword, 
        newUserEmail, 
        newUserFirstName, 
        newUserLastName, 
        newUserAddress, 
        newUserDOB
    );
    if (response.message) {
        window.alert(response.message);
    }
    // Clear form fields after submission for better UX
    setNewPassword('');
    setNewUserEmail('');
    setNewUserFirstName('');
    setNewUserLastName('');
    setNewUserAddress('');
    setNewUserDOB('');
    }

function openEmailModal(email) {
  setCurrentEmailRecipient(email);
  setEmailModalVisible(true);
}

async function handleSendCustomEmail() {
  const response = await sendEmail(currentEmailRecipient, customEmailSubject, customEmailBody);
  if(response.success) {
    window.alert('Email sent successfully.');
  } else {
    window.alert('Failed to send email.');
  }

  // Close the modal after sending the email
  setEmailModalVisible(false);
}

  return (
    <MDBContainer fluid className="p-0 bg-light text-dark">
        <Header />
        <h1><MDBTypography tag='div' className='display-1 mb-3 mx-4 text-warning'>
        Admin Dashboard
        </MDBTypography></h1>
        <MDBTypography className='lead mb-3 mx-4'>
        This is the admin dashboard page. System admins can complete admin-specific tasks and abilities from here.
        </MDBTypography>
        

        <MDBCard className="mb-3 pt-4">
        <MDBRow right className="p-3">
        <MDBCol md="4">
            <form className= "mx-4" onSubmit={getUserButton}>
            <div>
                <label >Username</label>
                <input
                type="text" className= "mx-3"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                />
                <MDBCardTitle>
                <MDBBtn outline color="info" className="py-2 my-3" type="submit">
                    Edit User Info
                </MDBBtn>
                </MDBCardTitle>
            </div>
            </form>

      <form id="userInfoForm" onSubmit={setUserButton} style={{ display: isUserInfoVisible ? "block" : "none" }}>
        <h6>Insert username below to make changes.</h6><br></br>
        <MDBInput label="Username" className="mb-2" group type="text" validate error="wrong" success="right" value={newUsername} onChange={e => setNewUsername(e.target.value)} required />

        {/* <MDBInput label="Password" className="mb-2" group type="text" validate value={newPassword} onChange={e => setNewPassword(e.target.value)} required /> */}

        {/*<MDBInput label="Admin Privilege" className="mb-2" group type="text" validate value={newIsAdmin} onChange={e => setIsAdmin(e.target.value === "true")} required/>*/}
        <div className="form-check mb-2"> <input className="form-check-input" type="checkbox" id="adminPrivilege" checked={newIsAdmin} onChange={e => setNewIsAdmin(e.target.checked)} /> <label className="form-check-label" htmlFor="adminPrivilege">Admin Privilege</label></div>

        {/*<MDBInput label="Manager Privilege" className="mb-2" group type="text" validate value={newIsManager} onChange={e => setIsManager(e.target.value === "true")} required />*/}
        <div className="form-check mb-2"> <input className="form-check-input" type="checkbox" id="managerPrivilege" checked={newIsManager} onChange={e => setNewIsManager(e.target.checked)} /> <label className="form-check-label" htmlFor="managerPrivilege">Manager Privilege</label></div>
        
        {/*<MDBInput label="Account Activated" className="mb-3" group type="text" validate value={newIsActive} onChange={e => setIsActive(e.target.value === "true")} required />*/}
        <div className="form-check mb-2"> <input className="form-check-input" type="checkbox" id="accountActivated" checked={newIsActive} onChange={e => setNewIsActive(e.target.checked)} /> <label className="form-check-label" htmlFor="accountActivated">Account Activated</label></div>
        
        <MDBInput label="Incorrect Logins" className="mb-4" group type="number" validate value={newBadLogins} onChange={e => setNewBadLogins(parseInt(e.target.value))} required />
        
        <MDBBtn outline color="success" type="submit">
          Save Changes
        </MDBBtn>
      </form>
      </MDBCol>
        </MDBRow>
        </MDBCard> 

    <MDBCard>
        <MDBRow right className="p-4">
        <MDBCol md="8">
        <MDBCardBody className='text-primary'>
            <form onSubmit={handleCreateUser}>
                <h2>Create New User</h2>
            
                <MDBInput
                    label="Email"
                    type="email" className="mb-3"
                    value={newUserEmail}
                    onChange={e => setNewUserEmail(e.target.value)}
                    required
                />
                <MDBInput
                    label="First Name"
                    type="text" className="mb-3"
                    value={newUserFirstName}
                    onChange={e => setNewUserFirstName(e.target.value)}
                    required
                />
                <MDBInput
                    label="Last Name"
                    type="text" className="mb-3"
                    value={newUserLastName}
                    onChange={e => setNewUserLastName(e.target.value)}
                    required
                />
                <MDBInput
                    label="Address"
                    type="text" className="mb-3"
                    value={newUserAddress}
                    onChange={e => setNewUserAddress(e.target.value)}
                    required
                />
                <MDBInput
                    label="Date of Birth"
                    type="date" className="mb-3"
                    value={newUserDOB}
                    onChange={e => setNewUserDOB(e.target.value)}
                    required
                />
                <MDBInput
                    label="Password"
                    type="password" className="mb-4"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                />
                <MDBBtn type="submit">Create User</MDBBtn>
            </form>
      <MDBBtn onClick={handleGetAllUsers}>Display All Users</MDBBtn>
      <MDBBtn onClick={handleGetAlmostExpiredUsers}>Display Expired Users</MDBBtn>


      {allUsers.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Manager</th>
              <th>Active</th>
              <th>Incorrect Logins</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                <td>{user.isManager ? 'Yes' : 'No'}</td>
                <td>{user.isActive ? 'Yes' : 'No'}</td>
                <td>{user.badLogins}</td>
                <td><MDBBtn size="sm" onClick={() => openEmailModal(user.email)}>Send Email</MDBBtn></td> 
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {almostExpiredUsers.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Manager</th>
              <th>Active</th>
              <th>Password Timeout</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {almostExpiredUsers.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                <td>{user.isManager ? 'Yes' : 'No'}</td>
                <td>{user.isActive ? 'Yes' : 'No'}</td>
                <td>{user.passwordTimeout}</td>
                <td><MDBBtn size="sm" onClick={() => openEmailModal(user.email)}>Send Email</MDBBtn></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
          <p>No users have expired passwords.</p>
        )}

      {/* Email Customization Modal */}
      {
        isEmailModalVisible && (
          <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000}}>
            <div style={{width: '400px', margin: '100px auto', padding: '20px', background: 'white', borderRadius: '10px'}}>
              <h3>Customize Email</h3>
              <label>Subject:</label>
              <input type="text" value={customEmailSubject} onChange={e => setCustomEmailSubject(e.target.value)} />
              <label>Body:</label>
              <textarea value={customEmailBody} onChange={e => setCustomEmailBody(e.target.value)} />
              <button onClick={handleSendCustomEmail}>Send</button>
              <button onClick={() => setEmailModalVisible(false)}>Cancel</button>
            </div>
          </div>
        )
      }

        </MDBCardBody>
        </MDBCol>
        </MDBRow>
    </MDBCard> 
    <Footer/>
    </MDBContainer>
  );
}

export default AdminDashboard;
