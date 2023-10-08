import React, { useState } from "react";
import { ChangePassword, GetUserAuth } from "../MongoDbClient";
import CryptoJS from 'crypto-js';
import { MDBInput, MDBCard, MDBCardBody, MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import IntroHeader from "../headerfooter/IntroHeader";
import Tooltip from '@mui/material/Tooltip';

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    try {
      const authResponse = await GetUserAuth(email);

      if (!authResponse || authResponse.message) {
        setMessage(authResponse.message || "Error during authentication.");
        return;
      }

      if (authResponse.dob !== dob) {
        setMessage("DOB does not match our records.");
        return;
      }

      const hashedPassword = hashPassword(newPassword);
      const resetResponse = await ChangePassword(email, hashedPassword);

      if (resetResponse && resetResponse.message) {
        setMessage(resetResponse.message);
      }
    } catch (error) {
      setMessage("Error occurred while resetting the password.");
    }
  };

  function hashPassword(password) {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  }

  return (
  <MDBContainer fluid className="p-0 bg-warning bg-gradient text-dark">
    <IntroHeader currentPage="ResetPassword" />
      <h1 className="display-2 mx-3">Reset Password</h1>
      <h4 className="display-7 mx-3">This is the password reset page</h4>
    <MDBRow center className="mx-3">
    <MDBCol md="6" className="mb-11">
      
      <MDBCard  alignment='center' shadow='0'>
      <MDBCardBody>
      <Tooltip title="Enter the email associated with your account">
          <MDBInput
            type="email" className="mb-4 mt-3"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </Tooltip>

          <Tooltip title="Enter your date of birth for verification">
          <MDBInput
            type="date" className="mb-4"
            placeholder="Enter your DOB"
            validate value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          </Tooltip>

          <Tooltip title="Enter a strong new password">
          <MDBInput
            type="password" className="mb-4" 
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          </Tooltip>
        <div>
        <Tooltip title="Click to set the new password">
        <MDBBtn outline color="primary" onClick={handleResetPassword}>Reset Password</MDBBtn>
        </Tooltip>
        </div>

        <div>
        <p>{message}</p>
        </div>
      </MDBCardBody>
    </MDBCard>
    </MDBCol>
    </MDBRow>
  </MDBContainer>
  );
};

export default ResetPassword;
