import React, { useState } from "react";
import { ChangePassword, GetUserAuth } from "./MongoDbClient";
import CryptoJS from 'crypto-js';
import Header from './Header';


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
    <div>
        <Header />
      <h1>Reset Password</h1>
      <p>This is the password reset page.</p>

      <div>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="date"
          placeholder="Enter your DOB"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleResetPassword}>Reset Password</button>
      </div>
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ResetPassword;
