import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {CreateUser,LoginFunction,DisplayUsers,getUserInfoFunction,setUserInfoFunction,} from "./MongoDbClient";
import {MDBBtn,MDBContainer,MDBRow,MDBCol,MDBCard,MDBCardBody,MDBInput,MDBCardText,MDBCardTitle,} from 'mdb-react-ui-kit';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newIsAdmin, setIsAdmin] = useState(false);
  const [newIsManager, setIsManager] = useState(false);
  const [newIsActive, setIsActive] = useState(true);
  const [newBadLogins, setBadLogins] = useState(0);

  const [isUserInfoVisible, setUserInfoVisible] = useState(false);

  async function getUserInfoFromServer(username) {
    const response = await getUserInfoFunction(username);
    // Handle the response here
  }

  async function setUserInfo(username, newPassword) {
    // Handle setting user info here
  }

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
      setNewPassword(response.password || "");
      setIsAdmin(response.isAdmin || false);
      setIsManager(response.isManager || false);
      setIsActive(response.isActive || true);
      setBadLogins(response.badLogins || 0);
    }

    window.alert(response.message);
  }

  async function setUserButton(e) {
    e.preventDefault();
    const response = await setUserInfoFunction(
      username,
      newPassword,
      newIsAdmin,
      newIsManager,
      newIsActive,
      newBadLogins
    );
    window.alert(response.message);
  }

  return (
    <div>
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
        <MDBInput label="Password" className="mb-2" group type="text" validate value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
        <MDBInput label="Admin Privilege" className="mb-2" group type="text" validate value={newIsAdmin} onChange={e => setIsAdmin(e.target.value)} />
        <MDBInput label="Manager Privilege" className="mb-2" group type="text" validate value={newIsManager} onChange={e => setIsManager(e.target.value)} />
        <MDBInput label="Account Activated" className="mb-3" group type="text" validate value={newIsActive} onChange={e => setIsActive(e.target.value)} />
        <MDBInput label="Incorrect Logins" className="mb-4" group type="number" validate value={newBadLogins} onChange={e => setBadLogins(e.target.value)} />
        <MDBBtn outline color="success" type="submit">
          Save Changes
        </MDBBtn>
      </form>
    </div>
  );
}

export default AdminDashboard;