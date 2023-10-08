import React, { useState } from "react";
import { MDBBtn, MDBInput, MDBCard, MDBCardBody, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { CreateUser } from "../../MongoDbClient";
import Tooltip from '@mui/material/Tooltip';

const CreateUserPage = () => {
  const [newPassword, setNewPassword] = useState("");


  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserFirstName, setNewUserFirstName] = useState("");
  const [newUserLastName, setNewUserLastName] = useState("");
  const [newUserAddress, setNewUserAddress] = useState("");
  const [newUserDOB, setNewUserDOB] = useState("");

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
    setNewPassword("");
    setNewUserEmail("");
    setNewUserFirstName("");
    setNewUserLastName("");
    setNewUserAddress("");
    setNewUserDOB("");
  }

  return (
    <MDBCard className="mb-4">
      <MDBRow right className="p-4">
        <MDBCol md="8">
          <MDBCardBody className="text-primary">
            <form onSubmit={handleCreateUser}>
              <h2>Create New User</h2>

              <Tooltip title="Enter the email for the new user">
              <MDBInput
                label="Email"
                type="email"
                className="mb-3"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                required
              /> </Tooltip>
              <Tooltip title="Enter the first name of the new user">
              <MDBInput
                label="First Name"
                type="text"
                className="mb-3"
                value={newUserFirstName}
                onChange={(e) => setNewUserFirstName(e.target.value)}
                required
              /></Tooltip>
              <Tooltip title="Enter the last name of the new user">
              <MDBInput
                label="Last Name"
                type="text"
                className="mb-3"
                value={newUserLastName}
                onChange={(e) => setNewUserLastName(e.target.value)}
                required
              /></Tooltip>
              <Tooltip title="Enter the address of the new user">
              <MDBInput
                label="Address"
                type="text"
                className="mb-3"
                value={newUserAddress}
                onChange={(e) => setNewUserAddress(e.target.value)}
                required
              /></Tooltip>
              <Tooltip title="Enter the birth date of the new user">
              <MDBInput
                label="Date of Birth"
                type="date"
                className="mb-3"
                value={newUserDOB}
                onChange={(e) => setNewUserDOB(e.target.value)}
                required
              /></Tooltip>
              <Tooltip title="Enter a secure password for the new user">
              <MDBInput
                label="Password"
                type="password"
                className="mb-4"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              /></Tooltip>
              <MDBBtn type="submit">Create User</MDBBtn>
            </form>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>
  );
}

export default CreateUserPage;