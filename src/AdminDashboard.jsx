import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfoFunction, setUserInfoFunction } from "./MongoDbClient";
import {
  MDBBtn,
  MDBCardTitle,
  MDBContainer,
  MDBInput,
} from "mdb-react-ui-kit";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newIsAdmin, setNewIsAdmin] = useState(false);
  const [newIsManager, setNewIsManager] = useState(false);
  const [newIsActive, setNewIsActive] = useState(true);
  const [newBadLogins, setNewBadLogins] = useState(0);

  const [isUserInfoVisible, setUserInfoVisible] = useState(false);

  async function getUserButton(e) {
    e.preventDefault();
    const response = await getUserInfoFunction(username);

    if (response.message === "User found!") {
      setNewPassword(response.password || "");
      setNewIsAdmin(response.isAdmin || false);
      setNewIsManager(response.isManager || false);
      setNewIsActive(response.isActive || true);
      setNewBadLogins(response.badLogins || 0);
      setUserInfoVisible(true);
    } else {
      window.alert(response.message);
    }
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
      <button type="button" onClick={() => navigate("/")}>
        Home Page
      </button>

      <h1>Admin Dashboard</h1>

      <p>
        This is the admin dashboard page. System admins can complete
        admin-specific tasks and abilities from here.
      </p>

      <p>Insert username below to make changes.</p>

      <form onSubmit={getUserButton}>
        <div className="py-4 mt-3">
          <label>Username</label>
          <input
            className="mb-2"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <MDBCardTitle>
            <MDBBtn
              outline
              color="info"
              className="mx-3 mb-2"
              type="submit"
            >
              Edit User Info
            </MDBBtn>
          </MDBCardTitle>
        </div>
      </form>

      <form
        id="userInfoForm"
        onSubmit={setUserButton}
        style={{ display: isUserInfoVisible ? "block" : "none" }}
      >
        <MDBInput
          label="Password"
          className="mb-2"
          group
          type="text"
          validate
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <div className="mb-2">
          <label>
            Admin Privilege
            <input
              type="checkbox"
              checked={newIsAdmin}
              onChange={(e) => setNewIsAdmin(e.target.checked)}
            />
          </label>
        </div>
        <div className="mb-2">
          <label>
            Manager Privilege
            <input
              type="checkbox"
              checked={newIsManager}
              onChange={(e) => setNewIsManager(e.target.checked)}
            />
          </label>
        </div>
        <div className="mb-3">
          <label>
            Account Activated
            <input
              type="checkbox"
              checked={newIsActive}
              onChange={(e) => setNewIsActive(e.target.checked)}
            />
          </label>
        </div>
        <MDBInput
          label="Incorrect Logins"
          className="mb-4"
          group
          type="number"
          validate
          value={newBadLogins}
          onChange={(e) => setNewBadLogins(parseInt(e.target.value))}
          required
        />
        <MDBBtn outline color="success" type="submit">
          Save Changes
        </MDBBtn>
      </form>
    </div>
  );
};

export default AdminDashboard;