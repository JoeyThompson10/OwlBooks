import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {CreateUser, getUserInfoFunction, setUserInfoFunction, GetAllUsers} from "./MongoDbClient";
import {MDBBtn, MDBInput, MDBCardTitle} from 'mdb-react-ui-kit';
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

  async function handleGetAllUsers() {
    const usersReport = await GetAllUsers();
    setAllUsers(usersReport);
  }

  async function getUserInfoFromServer(username) {
    const response = await getUserInfoFunction(username);
    // Handle the response here
  }

  async function setUserInfo(username, newPassword) {
    // Handle setting user info here
  }

  {/*
  function clearUserInput() {
    setUsername('');
    setPassword('');
    setNewUsername('');
    setNewPassword('');
    setIsAdmin(false);
    setIsManager(false);
    setIsActive(true);
    setBadLogins(0);
  }
*/}
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
      //setNewPassword(response.password || "");
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
      newPassword,
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


  return (
    <div>
      <Header />
      <button type="button" onClick={() => navigate("/")}>Home Page</button>

      <h1>Admin Dashboard</h1>

      <p>
        This is the admin dashboard page. System admins can complete admin-specific tasks and abilities from here.
      </p>

      <p>Insert username below to make changes.</p>

      <form onSubmit={getUserButton}>
        <div className="py-4 mt-3">
          <label>Username</label>
          <input
            className="mb-2"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <MDBCardTitle>
            <MDBBtn outline color="info" className="mx-3 mb-2" type="submit">
              Edit User Info
            </MDBBtn>
          </MDBCardTitle>
        </div>
      </form>

      <form id="userInfoForm" onSubmit={setUserButton} style={{ display: isUserInfoVisible ? "block" : "none" }}>
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

      <form onSubmit={handleCreateUser}>
        <h2>Create New User</h2>
        <MDBInput
            label="Email"
            type="email"
            value={newUserEmail}
            onChange={e => setNewUserEmail(e.target.value)}
            required
        />
        <MDBInput
            label="First Name"
            type="text"
            value={newUserFirstName}
            onChange={e => setNewUserFirstName(e.target.value)}
            required
        />
        <MDBInput
            label="Last Name"
            type="text"
            value={newUserLastName}
            onChange={e => setNewUserLastName(e.target.value)}
            required
        />
        <MDBInput
            label="Address"
            type="text"
            value={newUserAddress}
            onChange={e => setNewUserAddress(e.target.value)}
            required
        />
        <MDBInput
            label="Date of Birth"
            type="date"
            value={newUserDOB}
            onChange={e => setNewUserDOB(e.target.value)}
            required
        />
        <MDBInput
            label="Password"
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
        />
        <MDBBtn type="submit">Create User</MDBBtn>
      </form>
      <MDBBtn onClick={handleGetAllUsers}>Display All Users</MDBBtn>

      {allUsers.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Admin</th>
              <th>Manager</th>
              <th>Active</th>
              <th>Incorrect Logins</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                <td>{user.isManager ? 'Yes' : 'No'}</td>
                <td>{user.isActive ? 'Yes' : 'No'}</td>
                <td>{user.badLogins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Footer />
    </div>
  );
}

export default AdminDashboard;
