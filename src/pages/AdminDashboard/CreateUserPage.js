import React, { useState } from "react";
import { MDBBtn, MDBInput, MDBCard, MDBCardBody, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { CreateUser } from "../../MongoDbClient";

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

              <MDBInput
                label="Email"
                type="email"
                className="mb-3"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                required
              />
              <MDBInput
                label="First Name"
                type="text"
                className="mb-3"
                value={newUserFirstName}
                onChange={(e) => setNewUserFirstName(e.target.value)}
                required
              />
              <MDBInput
                label="Last Name"
                type="text"
                className="mb-3"
                value={newUserLastName}
                onChange={(e) => setNewUserLastName(e.target.value)}
                required
              />
              <MDBInput
                label="Address"
                type="text"
                className="mb-3"
                value={newUserAddress}
                onChange={(e) => setNewUserAddress(e.target.value)}
                required
              />
              <MDBInput
                label="Date of Birth"
                type="date"
                className="mb-3"
                value={newUserDOB}
                onChange={(e) => setNewUserDOB(e.target.value)}
                required
              />
              <MDBInput
                label="Password"
                type="password"
                className="mb-4"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <MDBBtn type="submit">Create User</MDBBtn>
            </form>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>
  );
}

export default CreateUserPage;